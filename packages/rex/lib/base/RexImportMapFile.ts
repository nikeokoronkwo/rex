import { SEPARATOR } from "https://deno.land/std@0.219.1/path/constants.ts";
import { RexSpecialFile } from "rex";

export class RexImportMapFile extends RexSpecialFile {
  packages: string[];
  constructor(packageDirs: string[] = []) {
    super("rex_map.json");
    this.packages = packageDirs;
  }

  stringify(): string {
    return JSON.stringify({
      imports: this.packages.reduce(
        (a, v) => ({ ...a, [v.split(SEPARATOR)[-1]]: v }),
        {},
      ),
    });
  }
}
