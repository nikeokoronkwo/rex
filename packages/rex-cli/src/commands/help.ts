import { HelpCommand } from "../../deps.ts";

const help = new HelpCommand()
  .description("Get Help for any command")
  .option("-d --detailed", "Get Detailed Information (more help)")
  .arguments("<command>");

export default help;
