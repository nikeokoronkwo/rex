import { WalkEntry, Command } from "../../deps.ts";
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
