import { Command } from "../../deps.ts";
import {
  execOnRexPackages,
  execOnRexPackagesAndReturn,
} from "../shared/execFunc.ts";
import { runonpkgs } from "../shared/runonpkgs.ts";

const run = new Command()
  .description("Run actions on all or some packages in your monorepo")
  .option(
    "-n --npm",
    "Run this command on 'npm' for all 'npm' compatible packages in this monorepo.",
  )
  .option(
    "-d --deno",
    "Run this command on 'deno' for all 'deno' compatible packages in this monorepo.",
  )
  .option(
    "-c --custom <platform:string>",
    "Run the custom command '<platform>' for all packages compatible with '<platform>' in this monorepo.",
  )
  .option(
    "--run-for <condition:string>",
    "Run these commands on packages fulfilling the criteria <condition>",
  )
  .arguments("<...args>")
  .stopEarly()
  .action(async (options, ...args) => {
    await runCommand(options, args);
  });

async function runCommand(options: any, args: string[]) {
  for await (const objkey of Object.keys(options)) {
    let s = 0;
    let f = 0;
    let command: string = "";
    if (objkey === "custom") {
      command = options.custom;
    } else if (options[objkey as keyof typeof options] === true) {
      switch (objkey) {
        case "npm":
          command = "npm";
          break;
        case "deno":
          command = "deno";
          break;
        default:
          throw new Error("Command not supported");
      }
    }
    let cmdToRun = [command, ...args];

    await execOnRexPackages(async (name, path) => {
      let { failures, successes } = await runonpkgs(
        command,
        path,
        name,
        f,
        cmdToRun,
        s
      );
      f = failures;
      s = successes;
    });
  }
}

export default run;
