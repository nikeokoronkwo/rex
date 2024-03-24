import { walkSync, walk,WalkEntry } from "https://deno.land/std@0.219.1/fs/mod.ts";
import { SEPARATOR } from "https://deno.land/std@0.219.1/path/constants.ts";
import { globToRegExp } from "https://deno.land/std@0.220.1/path/glob_to_regexp.ts";

import { RexPkgConfigFile } from "../../lib/files/RexPkgConfigFile.ts";
import { RexConfigFile } from "../../lib/files/RexConfigFile.ts";

export function addRexToProject(
  packages: string[], 
  directory: string | undefined, 
  name: string | undefined, 
  options: any
) {
  const dir = directory ?? '.';
  new RexConfigFile({
    publishTo: [...options.env],
  }).createSync(dir);
  if (packages) {
    const pathRegexes = packages.map(p => globToRegExp(p));
    for (const item of walkSync(dir, {
      includeFiles: false,
      includeSymlinks: false, 
      includeDirs: true
    })) {
      if (
        pathRegexes.filter(p => item.path.match(p)).length > 0
      ) {
        new RexPkgConfigFile(item.path).createSync();
      }
    }
    new RexConfigFile({
      publishTo: typeof options.env === 'string' ? [options.env] : [...options.env]
    }).createSync()
  }

}

