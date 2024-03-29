import { existsSync } from "https://deno.land/std@0.219.1/fs/mod.ts";
import { SEPARATOR } from "https://deno.land/std@0.219.1/path/constants.ts";
import { RexError } from "rex";
import { runProcess } from "./runProcess.ts";

export async function runonpkgs(
  command: string,
  path: string,
  name: string,
  failures: number,
  cmdToRun: string[],
  successes: number,
) {
  switch (command) {
    case "npm":
      if (!existsSync(`${path}${SEPARATOR}package.json`)) {
        new RexError(`'package.json' doesn't exist for package ${name}`)
          .print();
        failures++;
      } else {
        await runProcess(name, path, cmdToRun);
        successes++;
      }
      break;
    case "deno":
      if (!existsSync(`${path}${SEPARATOR}deno.json`)) {
        new RexError(`'deno.json' doesn't exist for package ${name}`).print();
        failures++;
      } else {
        await runProcess(name, path, cmdToRun);
        successes++;
      }
      break;
    default:
      await runProcess(name, path, cmdToRun);
      successes++;
      break;
  }
  return { failures, successes };
}
