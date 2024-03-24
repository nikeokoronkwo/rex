import { Command, EnumType } from "https://deno.land/x/cliffy@v1.0.0-rc.3/command/mod.ts";
import { colors } from "https://deno.land/x/cliffy@v1.0.0-rc.3/ansi/colors.ts";
import { addRexToProject } from "../exec/init/addRexToProject.ts";
import { generateRexProject } from "../exec/init/generateRexProject.ts";

const projectType = new EnumType(["none", "skeleton", "library", "web", "fresh", "react", "vue", "svelte"]);

const init = new Command()
.type('project-type', projectType)
.description("Initialise a new mono repo in your project")
.option('-t --template <temp:project-type>', 'set the template project type for your project')
.option('--no-generate', 'Do not generate a new project', {
    hidden: true,
    conflicts: ['template']
})
.option('--packages <packages...:string>', 'Define packages to be used for the mono repo', {
    depends: ['no-generate'],
    collect: true,
    value: (value: string[], previous: Array<string> = []): Array<string> => {
        previous.concat(value);
        return previous;
    },
})
.option('-b, --box <box:string>', 'Use template from the given box url (not supported yet)', {
    hidden: true,
    conflicts: ['template']
})
.arguments('<directory> [name]')
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
`)

function initCommand(options: any, args: (string | undefined)[]): void {
    if (options.box) {
        console.log(colors.red('Boxes are not supported yet'));
        Deno.exit(2);
    }
    if (options.generate) {
        generateRexProject(options.template, args[0], args[1]);
    } else {
        addRexToProject(options.packages ,args[0], args[1]);
    }
    Deno.exit(0);
}

export default init;

