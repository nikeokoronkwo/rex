import { Command, EnumType } from "https://deno.land/x/cliffy/command/mod.ts";
import { init, help, list } from "./commands/commands.ts";

const logLevel = new EnumType(["debug", "info", "warn", "error"]);

const cli = new Command()
  .name("rex")
  .version("0.1.0")
  .description("Mono Repo for Deno, Node and Bun Projects")
  .globalOption("-v --verbose", "Print verbose logging output")
  .default("init")
  .command("init", init)
  .command("check")
  .command("readme")
  .command("ci")
  .command("list", list)
  .command("global")
  .command("build")
  .command("publish")
  .command("help", help);

export default cli;
