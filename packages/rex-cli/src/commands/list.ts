import { existsSync } from "https://deno.land/std@0.219.1/fs/mod.ts";
import { walkSync } from "https://deno.land/std@0.219.1/fs/walk.ts";
import { SEPARATOR } from "https://deno.land/std@0.219.1/path/constants.ts";
import { colors } from "https://deno.land/x/cliffy@v1.0.0-rc.3/ansi/colors.ts";
import { Command } from "https://deno.land/x/cliffy@v1.0.0-rc.3/command/mod.ts";

const list = new Command()
.description("List all packages in this Rex Monorepo.")
.option("-c --category <category:string>", "List packages based on the criteria of <category>")
.action((options, ...args) => {
    listCommand(options);
});

export default list;

function listCommand(options: any) {
  for (const dir of walkSync(".", {
    includeFiles: false,
    includeSymlinks: false,
    includeDirs: true
  })) {
    if (existsSync(`${dir.path}${SEPARATOR}rex_pkg.json`)) {
        let pkgname: string = "";
        if (existsSync(`${dir.path}${SEPARATOR}deno.json`)) {
            pkgname = JSON.parse(Deno.readTextFileSync(`${dir.path}${SEPARATOR}deno.json`)).name ?? dir.name;
        } else if (existsSync(`${dir.path}${SEPARATOR}jsr.json`)) {
            pkgname = JSON.parse(Deno.readTextFileSync(`${dir.path}${SEPARATOR}jsr.json`)).name ?? dir.name;
        } else if (existsSync(`${dir.path}${SEPARATOR}package.json`)) {
            pkgname = JSON.parse(Deno.readTextFileSync(`${dir.path}${SEPARATOR}package.json`)).name;
        } else {
            pkgname = dir.name;
        }
        console.log(
            `${colors.blue(pkgname)} -- ${dir.path}`
        );
    }
  }
}
