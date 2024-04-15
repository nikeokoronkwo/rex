import { Command, EnumType } from "../deps.ts";
import { help, init, list, readme, run, publish, hooks } from "./commands/commands.ts";

const logLevel = new EnumType(["debug", "info", "warn", "error"]);

const cli = new Command()
  .name("rex")
  .version("0.1.0")
  .description("Mono Repo for Deno, Node and Bun Projects")
  .globalOption("-v --verbose", "Print verbose logging output")
  .default("init")
  .command("init", init)
  .command("check")
  .command("readme", readme)
  .command("ci")
  .command("list", list)
  .command("run", run)
  .command("build")
  .command("publish", publish)
  .command("help", help)
  .command("hooks", hooks)
  ;

export default cli;
