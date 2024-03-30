import { existsSync, walk, walkSync, SEPARATOR } from "../../deps.ts";

export function execOnRexPackages(
  closure: (name: string, path: string) => void,
) {
  for (const dir of walkSync(".", {
    includeFiles: false,
    includeSymlinks: false,
    includeDirs: true,
  })) {
    if (existsSync(`${dir.path}${SEPARATOR}rex_pkg.json`)) {
      closure(dir.name, dir.path);
    }
  }
}

/**
 * @param closure The closure to run for on the given rex package. The `name` corresponds to the name of the folder dir, and the `path` is the folder path
 * @param check In the case you want to filter some options, you have an optional check parameter to validate the output, given as `out`, of the previous closure.
 * @returns A list of the items returned from the `closure` that pass the given `check`
 */
export function execOnRexPackagesAndReturn<T>(
  closure: (name: string, path: string) => T,
  check?: (out: T) => boolean,
): T[] {
  let output: T[] = [];
  for (const dir of walkSync(".", {
    includeFiles: false,
    includeSymlinks: false,
    includeDirs: true,
  })) {
    if (existsSync(`${dir.path}${SEPARATOR}rex_pkg.json`)) {
      let caseOut = closure(dir.name, dir.path);
      if (check) {
        if (check(caseOut)) output.push(caseOut);
      } else {
        output.push(caseOut);
      }
    }
  }
  return output;
}
