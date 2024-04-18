import { existsSync, SEPARATOR } from "../../deps.ts";
import { RexError } from "../../deps.ts";
import { runProcess } from "../lib/run/runProcess.ts";

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
      if (
        !existsSync(`${path}${SEPARATOR}package.json`) &&
        cmdToRun[1] != "init"
      ) {
        new RexError(
          `'package.json' doesn't exist for package ${name}`,
        ).print();
        failures++;
      } else {
        await runProcess(name, path, cmdToRun);
        successes++;
      }
      break;
    case "deno":
      if (
        !existsSync(`${path}${SEPARATOR}deno.json`) &&
        cmdToRun[1] != "init"
      ) {
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
