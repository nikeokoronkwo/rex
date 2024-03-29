import { WalkEntry } from "https://deno.land/std@0.219.1/fs/_create_walk_entry.ts";
import { Command } from "https://deno.land/x/cliffy@v1.0.0-rc.3/command/mod.ts";
import { execOnRexPackages } from "../shared/execFunc.ts";
import { listname } from "../lib/list/listname.ts";

const list = new Command()
  .description("List all packages in this Rex Monorepo.")
  .option(
    "-c --category <category:string>",
    "List packages based on the criteria of <category>",
  )
  .action((options, ...args) => {
    listCommand(options);
  });

export default list;

function listCommand(options: any) {
  execOnRexPackages(listname);
}
