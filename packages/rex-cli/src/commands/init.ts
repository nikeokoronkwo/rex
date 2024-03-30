import { Command, EnumType, colors } from "../../deps.ts";
import { addRexToProject } from "../lib/init/addRexToProject.ts";
import { generateRexProject } from "../lib/init/generateRexProject.ts";
import { envType } from "../shared/env.ts";
import { RexError } from "rex";

const projectType = new EnumType([
  "none",
  "skeleton",
  "library",
  "web",
  "fresh",
  "react",
  "vue",
  "svelte",
]);
const init = new Command()
  .type("project-type", projectType)
  .type("env-type", envType)
  .description("Initialise a new mono repo in your project")
  .option(
    "-t --template <temp:project-type>",
    "set the template project type for your project",
  )
  .option(
    "-n --no-generate",
    "Do not generate a new project - Add Rex to a new project",
    {
      conflicts: ["template"],
    },
  )
  .option(
    "-e --env <registry...:env-type>",
    'Set the environments for/to publish the project. Use "all" to publish to all',
    {
      default: "none",
    },
  )
  .option(
    "-p --packages <packages...:string>",
    "Define packages to be used for the mono repo",
    {
      depends: ["no-generate"],
      collect: true,
    },
  )
  .option(
    "-b, --box <box:string>",
    "Use template from the given box url (not supported yet)",
    {
      hidden: true,
      conflicts: ["template"],
    },
  )
  .arguments("<directory> [name]")
  .action((options, ...args) => {
    if (!options.template) options.template = "none";
    initCommand(options, args);
  });

init.help(`
The 'init' command helps generate a new rex workspace powered by the rex monorepo tool.
There are various template styles to choose from to help you get your project started from scratch such as:

--> ${projectType.values().splice(4).join(", ")} <--

If you want to add rex to an already existing project, you can manually do so by adding/configuring a "rex_pkg.json" file to the needed apps, or by using the "--no-generate" flag.

${init.getHelp()}
`);

function initCommand(options: any, args: (string | undefined)[]): void {
  handleOptions(options, args);
  if (options.box) {
    console.log(colors.red("Boxes are not supported yet"));
    Deno.exit(2);
  }
  const packages = options.packages
    ? options.packages.reduce(
        (acc: string[], current: string[]) => acc.concat(current),
        [],
      )
    : [];
  if (!options.noGenerate) {
    generateRexProject(options.template, args[0], args[1], options);
  } else {
    addRexToProject(packages, args[0], args[1], options);
  }
  Deno.exit(0);
}

export default init;

function handleOptions(options: any, args: (string | undefined)[]) {
  if (!options.packages && !options.noGenerate) {
    new RexError("Provide a definite option choice to get started")
      .print()
      .exit();
  }
}
