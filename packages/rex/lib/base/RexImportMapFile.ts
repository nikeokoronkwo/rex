import { SEPARATOR } from "../../deps.ts";
import { RexSpecialFile } from "./RexFile.ts";

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
