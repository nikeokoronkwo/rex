import {
  Command,
  EnumType,
} from "https://deno.land/x/cliffy@v1.0.0-rc.3/command/mod.ts";
import { execOnRexPackages } from "../shared/execFunc.ts";
import { getReadmeInfo, buildReadme } from "../lib/readme/buildReadme.ts";

const readme = new Command()
  .description(
    "Get markdown summary of packages suitable for use in your README.",
  )
  .action((options, ...args) => {
    readmeCommand();
  });

export default readme;

export function splitPkg(pkgname: string) {
  const items: string[] = pkgname.split("/");
  return {
    scope: items[0].replace("@", ""),
    name: items[1],
  };
}

export interface RexPkgMDInterface {
  name: string;
  pubVersion: string;
  reg: string;
}

function readmeCommand() {
  const readmeObj: Array<RexPkgMDInterface[]> = [];
  execOnRexPackages((name: string, path: string) => {
    let pkgdescs: RexPkgMDInterface[] = [];
    let pkgname: string = "";
    let pkgversion: string = "";
    let pkgpubversion: string = "";
    ({ pkgname, pkgversion, pkgpubversion } = getReadmeInfo(
      path,
      pkgname,
      name,
      pkgversion,
      pkgpubversion,
      pkgdescs,
      readmeObj,
    ));
  });
  let output = buildReadme(readmeObj);
  console.log(output);
}
