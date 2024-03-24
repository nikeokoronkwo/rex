import { HelpCommand } from "https://deno.land/x/cliffy@v1.0.0-rc.3/command/mod.ts";

const help = new HelpCommand()
.description("Get Help for any command")
.option('-d --detailed', 'Get Detailed Information (more help)')
.arguments('<command>');

export default help;