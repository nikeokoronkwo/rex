import { existsSync } from "https://deno.land/std@0.219.1/fs/mod.ts";
import { SEPARATOR } from "https://deno.land/std@0.219.1/path/constants.ts";
import {
  Command,
  EnumType,
} from "https://deno.land/x/cliffy@v1.0.0-rc.3/command/mod.ts";
import { execOnRexPackages } from "rex-cli/src/shared/execFunc.ts";

const readme = new Command()
  .description(
    "Get markdown summary of packages suitable for use in your README.",
  )
  .action((options, ...args) => {
    readmeCommand();
  });

export default readme;

function splitPkg(pkgname: string) {
  const items: string[] = pkgname.split("/");
  return {
    scope: items[0].replace("@", ""),
    name: items[1],
  };
}

interface RexPkgMDInterface {
  name: string;
  pubVersion: string;
  reg: string;
}

function readmeCommand() {
  const readmeObj: Array<RexPkgMDInterface[]> = [];
  execOnRexPackages((name, path) => {
    let pkgdescs: RexPkgMDInterface[] = [];
    let pkgname: string = "";
    let pkgversion: string = "";
    let pkgpubversion: string = "";
    if (existsSync(`${path}${SEPARATOR}deno.json`)) {
      const newLocal = JSON.parse(
        Deno.readTextFileSync(`${path}${SEPARATOR}deno.json`),
      );
      pkgname = newLocal.name ?? name;
      pkgversion = newLocal.version ?? "unknown";
      let pkgdesc = splitPkg(pkgname);
      pkgpubversion = `![Custom badge](https://shield.deno.dev/x/${pkgdesc.name ?? pkgname})`;
      pkgdescs.push({
        name: pkgname,
        pubVersion: pkgpubversion,
        reg: "deno",
      });
    }
    if (existsSync(`${path}${SEPARATOR}jsr.json`)) {
      const newLocal = JSON.parse(
        Deno.readTextFileSync(`${path}${SEPARATOR}jsr.json`),
      );
      pkgname = newLocal.name ?? name;
      pkgversion = newLocal.version ?? "unknown";
      let pkgdesc = splitPkg(pkgname);
      pkgpubversion = `![Custom Badge](https://badgen.net/https/nikechukwu.npkn.net/jsr-endpoint/${pkgdesc.scope}/${pkgdesc.name}/version?icon=https://jsr.io/logo.svg)`;
      pkgdescs.push({
        name: pkgname,
        pubVersion: pkgpubversion,
        reg: "jsr",
      });
    }
    if (existsSync(`${path}${SEPARATOR}package.json`)) {
      const newLocal = JSON.parse(
        Deno.readTextFileSync(`${path}${SEPARATOR}package.json`),
      );
      pkgname = newLocal.name ?? name;
      pkgversion = newLocal.version ?? "unknown";
      pkgpubversion = `![NPM Version](https://img.shields.io/npm/v/${pkgname})`;
      pkgdescs.push({
        name: pkgname,
        pubVersion: pkgpubversion,
        reg: "npm",
      });
    }
    if (
      !existsSync(`${path}${SEPARATOR}package.json`) &&
      !existsSync(`${path}${SEPARATOR}jsr.json`) &&
      !existsSync(`${path}${SEPARATOR}deno.json`)
    ) {
      pkgname = name;
      pkgversion = "unknown";
      pkgpubversion = "unknown";
      pkgdescs.push({
        name: pkgname,
        pubVersion: pkgpubversion,
        reg: "none",
      });
    }
    readmeObj.push(pkgdescs);
  });
  let output = `
| Package | Registries | Version(s) |
| ------- | ---------- | ---------- |
`;
  readmeObj.forEach((e) => {
    output += `| ${e[0].name} | ${e.map((l) => l.reg).join(", ")} | ${e.map((l) => l.pubVersion).join(" ")} |\n`;
  });
  console.log(output);
}
