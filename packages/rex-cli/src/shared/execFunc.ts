import {
  existsSync,
  walk,
  walkSync,
  SEPARATOR,
  globToRegExp,
} from "../../deps.ts";

export async function execOnRexPackages(
  closure: (name: string, path: string) => Promise<void> | void,
) {
  const folders = (
    (JSON.parse(Deno.readTextFileSync("rex.json")).exclude as string[]) ?? []
  ).map((e) => globToRegExp(e));
  for (const dir of walkSync(".", {
    includeFiles: false,
    includeSymlinks: false,
    includeDirs: true,
  })) {
    if (
      existsSync(`${dir.path}${SEPARATOR}rex_pkg.json`) &&
      folders.find((e) => dir.path.match(e)) === undefined
    ) {
      await Promise.resolve(closure(dir.name, dir.path));
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
