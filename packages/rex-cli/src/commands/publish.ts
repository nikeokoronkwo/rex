import {
  Command,
  EnumType,
  SEPARATOR,
  existsSync,
  bold,
  RexPkgPubActions,
} from "../../deps.ts";
import { runProcess } from "../lib/run/runProcess.ts";
import { envType } from "../shared/env.ts";
import { execOnRexPackages } from "../shared/execFunc.ts";
import { runonpkgs } from "../shared/runonpkgs.ts";

const publish = new Command()
  .type("env-type", envType)
  .description(
    `
Publish your packages in the monorepository (${bold("children")} or ${bold("main")}).

This command publishes the given packages inferred from the argument, using the "rex_pkg.json" or "rex.json" file to get the configuration for the publishing pipeline.
By default cli arguments override.
`,
  )
  .option("-n --dry-run", "Perform a dry run, do not publish yet")
  .option(
    "-i --ignore <env:env-type>",
    "Ignore publishing packages to the given <env>(s)",
    {
      collect: true,
    },
  )
  .option("-b --bundle", "Bundle Packages before publishing and pass ")
  .option(
    "--tsc-compile",
    "Compile to TypeScript with given args before publishing",
  )
  .option(
    "--no-config",
    "Do not use 'rex_pkg.json' when configuring publishing pipeline",
  )
  .option(
    "-c --custom <platform:string>",
    "Use custom command <platform> to publish package (e.g yarn)",
  )
  .option(
    "--npm-args <...args:string>",
    "Flags to pass to npm, if applicable (in the form 'name=value' (use full name))",
  )
  .option(
    "--deno-args <...args:string>",
    "Flags to pass to deno, if applicable (in the form 'name=value' (use full name))",
  )
  .arguments("[packages...]")
  .action(async (options, args) => {
    await publishCommand(options, args);
  });
export default publish;

async function publishCommand(
  options: {
    dryRun?: true | undefined;
    ignore?: ("npm" | "deno" | "jsr" | "all" | "none")[] | undefined;
    bundle?: true | string[] | undefined;
    tscCompile?: true | undefined;
    config: boolean;
    custom?: string | undefined;
    denoArgs?: string[] | undefined;
    npmArgs?: string[] | undefined;
  },
  args: string,
) {
  await execOnRexPackages(async (name, path) => {
    const rexPkgFile = JSON.parse(
      Deno.readTextFileSync(`${path}/rex_pkg.json`),
    );
    // Get Actions to run
    let actions: Actions[] = rexPkgFile.publish.actions ?? [];
    let pwd = rexPkgFile.publish.dir ?? ".";

    // Filter actions to obtain those not ignored
    let pkgActions = actions.filter(
      (e: Actions) =>
        (e.performFor ?? ["all"]).filter(
          (a: "npm" | "deno" | "jsr" | "all" | "none") =>
            options.ignore?.includes(a) ?? false,
        ).length === 0 || (e.performFor ?? ["all"]).includes("all"),
    );

    for (const a of pkgActions) {
      await runProcess(name, path, [a.run], true);
    }

    let envs = (options.ignore ?? []).includes("all")
      ? []
      : getRexPkgEnvs(path, options.ignore);

    let fails = 0;
    let passes = 0;
    envs.forEach(async (env) => {
      const cmd = deduceCmd(env, options.custom);

      let npmArgs = options.npmArgs ?? [];
      let denoArgs = options.denoArgs ?? [];

      let { failures, successes } = await Promise.resolve(
        runonpkgs(
          env.name,
          `${path}${pwd == "." ? "" : `${SEPARATOR}${pwd}`}`,
          name,
          fails,
          [cmd, "publish"].concat(
            cmd === "npm"
              ? npmArgs.map((e) => `--${e}`)
              : cmd === "deno"
                ? denoArgs.map((e) => `--${e}`)
                : [],
          ),
          passes,
        ),
      );
      fails = failures;
      passes = successes;
    });
  });
}

type Actions = RexPkgPubActions;

type envFile = {
  name: string;
  pkgName?: string;
  configPath: string;
};

function deduceCmd(env: envFile, custom?: string): string {
  if (custom) return custom;
  return env.name == "npm" ? "npm" : "deno";
}

function getRexPkgEnvs(path: string, ignore?: string[]): envFile[] {
  let names: envFile[] = [];
  let envExists = false;
  if (existsSync(`${path}${SEPARATOR}deno.json`) && !ignore?.includes("deno")) {
    names.push({
      name: "deno",
      configPath: `${path}${SEPARATOR}deno.json`,
    });
    envExists = true;
  }
  if (existsSync(`${path}${SEPARATOR}jsr.json`) && !ignore?.includes("npm")) {
    names.push({
      name: "jsr",
      configPath: `${path}${SEPARATOR}jsr.json`,
    });
    envExists = true;
  }
  if (
    existsSync(`${path}${SEPARATOR}package.json`) &&
    !ignore?.includes("npm")
  ) {
    names.push({
      name: "npm",
      configPath: `${path}${SEPARATOR}package.json`,
    });
    envExists = true;
  }
  if (!envExists) {
    names.push({
      name: "unknown",
      configPath: `${path}${SEPARATOR}rex_pkg.json`,
    });
  }
  return names;
}
