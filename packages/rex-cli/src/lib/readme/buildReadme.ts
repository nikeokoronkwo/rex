import { existsSync } from "https://deno.land/std@0.219.1/fs/mod.ts";
import { SEPARATOR } from "https://deno.land/std@0.219.1/path/constants.ts";
import { RexPkgMDInterface, splitPkg } from "../../commands/readme.ts";

export function buildReadme(readmeObj: RexPkgMDInterface[][]) {
  let output = `
| Package | Registries | Version(s) |
| ------- | ---------- | ---------- |
`;
  readmeObj.forEach((e) => {
    output += `| ${e[0].name} | ${e.map((l) => l.reg).join(", ")} | ${e.map((l) => l.pubVersion).join(" ")} |\n`;
  });
  return output;
}
export function getReadmeInfo(path: string, pkgname: string, name: string, pkgversion: string, pkgpubversion: string, pkgdescs: RexPkgMDInterface[], readmeObj: RexPkgMDInterface[][]) {
  if (existsSync(`${path}${SEPARATOR}deno.json`)) {
    const newLocal = JSON.parse(
      Deno.readTextFileSync(`${path}${SEPARATOR}deno.json`)
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
      Deno.readTextFileSync(`${path}${SEPARATOR}jsr.json`)
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
      Deno.readTextFileSync(`${path}${SEPARATOR}package.json`)
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
  if (!existsSync(`${path}${SEPARATOR}package.json`) &&
    !existsSync(`${path}${SEPARATOR}jsr.json`) &&
    !existsSync(`${path}${SEPARATOR}deno.json`)) {
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
  return { pkgname, pkgversion, pkgpubversion };
}
