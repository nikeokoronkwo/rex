import { Command, EnumType, SEPARATOR, existsSync, bold,  } from "../../deps.ts";
import { runProcess } from "../lib/run/runProcess.ts";
import { envType } from "../shared/env.ts";
import { execOnRexPackages } from "../shared/execFunc.ts";
import { runonpkgs } from "../shared/runonpkgs.ts";
import { RexPkgPubActions } from "../../../rex/lib/cmds/RexPkgPubActions.ts";

const publishType = new EnumType(["children", "main"]);

const publish = new Command()
  .type("pub-type", publishType)
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
    "-i --ignore <env...:env-type>",
    "Ignore publishing packages to the given <env>(s)",
  )
  .option(
    "-b --bundle [args...:string]",
    "Bundle Packages before publishing and pass ",
  )
  .option(
    "--tsc-compile",
    "Compile to TypeScript with given args before publishing",
  )
  .option(
    "--no-config",
    "Do not use 'rex_pkg.json' when configuring publishing pipeline",
  )
  .option("-c --custom <platform:string>", "Use custom command <platform> to publish package (e.g yarn)")
  .arguments("<type:pub-type>")
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
  },
  args: "children" | "main",
) {
  if (args === "children") {
    await execOnRexPackages((name, path) => {
      let envs = (options.ignore ?? []).includes("all")
        ? []
        : getRexPkgEnvs(path, options.ignore);
      let actions: Actions[] =
        JSON.parse(Deno.readTextFileSync(`${path}/rex_pkg.json`)).publish
          .actions ?? [];
      let fails = 0;
      let passes = 0;
      envs.forEach(async (env) => {
        let pkgActions = actions.filter(
          (e: Actions) =>
            (e.performFor ?? ["all"]).includes(env.name) ||
            (e.performFor ?? ["all"]).includes("all"),
        );
        pkgActions.forEach(async (a) => {
          await runProcess(name, path, [a.run], true);
        });
        let { failures, successes } = await runonpkgs(
          env.name,
          path,
          name,
          fails,
          [deduceCmd(env, options.custom), "publish"],
          passes,
        );
        fails = failures;
        passes = successes;
      });
      
    });
  } else {
    console.log("Publishing the main monorepo is not supported yet");
  }
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
