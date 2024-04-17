import { RexConfigFile, RexFile } from "rex/mod.ts";
import { Command, EnumType, existsSync, blue } from "../../../deps.ts";

const hookType = new EnumType([
  "pre-commit",
  "post-commit",
  "pre-rebase",
  "post-rewrite",
]);

// TODO: Hooks for Git via Rex
const hooks = new Command()
  .type("hook-type", hookType)
  .description("Git Hooks for Rex")
  .option("-e --exec", "Execute the given script. Defaults to false")
  .option(
    "-i --integrate",
    "Add support for the specified hook in current project",
  )
  .arguments("<hook:hook-type>")
  .hidden()
  .action(async (options, ...args) => {
    await hookCommand(options, args[0]);
  });

export default hooks;

async function hookCommand(options: any, arg: string) {
  if (options.integrate) {
    await integrateHook(arg);
    console.log(`The given git hook ${blue(arg)} has been integrated.`);
    return;
  }

  const rexFile = RexConfigFile.parse(Deno.readTextFileSync("rex.json"));
  const hooks = rexFile.rexActions?.gitHooks ?? {};
  const action = hooks[arg];

  const externAction = existsSync(`.rex/${arg}`)
    ? Deno.readTextFileSync(`.rex/${arg}`)
    : undefined;
  let script: string | undefined = undefined;
  if (typeof action === "string") {
    script = externAction ?? action;
  } else if (typeof action === "object") {
    script = externAction ?? action.script;
  } else {
    script = externAction;
  }

  if (options.exec) execScript(script);
  else console.log(script);
}

function execScript(script?: string) {}

async function integrateHook(
  arg: string,
  preamble: string = "",
  cmdName: string = "rex",
) {
  await Deno.create(`.git/hooks/${arg}`).then((f) =>
    f.writeSync(
      new TextEncoder().encode(`${preamble} ${cmdName} hooks ${arg} | bash`),
    ),
  );
}
