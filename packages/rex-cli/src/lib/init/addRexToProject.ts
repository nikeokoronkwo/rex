import {
  walkSync,
  walk,
  WalkEntry,
} from "https://deno.land/std@0.219.1/fs/mod.ts";
import { globToRegExp } from "https://deno.land/std@0.220.1/path/glob_to_regexp.ts";

import {
  RexPkgConfigFile,
  RexConfigFile,
  RexSpecialFile,
  RexImportMapFile,
  RexJSRFile,
  RexDenoFile,
} from "rex";

export function addRexToProject(
  packages: string[],
  directory: string | undefined,
  name: string | undefined,
  options: any,
) {
  const dir = directory ?? ".";
  new RexConfigFile({
    publishTo: [...options.env],
  }).createSync(dir);
  if (packages) {
    const pathRegexes = packages.map((p) => globToRegExp(p));
    let paths: string[] = [];
    for (const item of walkSync(dir, {
      includeFiles: false,
      includeSymlinks: false,
      includeDirs: true,
    })) {
      if (pathRegexes.filter((p) => item.path.match(p)).length > 0) {
        paths.push(item.path);
        new RexPkgConfigFile(item.path).createSync();
      }
    }
    new RexImportMapFile(paths).createSync();
    if (typeof options.env === "string") {
      createEnvFiles(options.env);
    } else {
      for (const env in options.env) createEnvFiles(env);
    }
    new RexConfigFile({
      publishTo:
        typeof options.env === "string" ? [options.env] : [...options.env],
    }).createSync();
  }
}

function createEnvFiles(env: string) {
  switch (env) {
    case "deno":
      RexDenoFile.parse(Deno.readTextFileSync("./deno.json"))
        .addImportPath("./rex_map.json")
        .createSync();
      break;
    case "npm":
      console.log("NOTE: Import Maps are not yet supported in NPM Packages.");
      break;
    case "jsr":
      RexJSRFile.parse(Deno.readTextFileSync("./jsr.json"))
        .addImportPath("./rex_map.json")
        .createSync();
      break;
    default:
      break;
  }
}
