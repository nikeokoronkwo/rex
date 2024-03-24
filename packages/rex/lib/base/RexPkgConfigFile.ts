import { RexFile } from "./RexFile.ts";
import { RexSpecialConfig } from "./RexConfig.ts";
import { RexSpecialFile } from "./RexFile.ts";

export class RexPkgConfigFile extends RexSpecialFile {
  constructor(dir: string, _options?: object) {
    super(`${dir}/rex_pkg.json`);
  }

  stringify(): string {
    return JSON.stringify({});
  }

  static parse(dir: string, contents: string) {
    try {
      const _jsonObject = JSON.parse(contents);
      return new RexPkgConfigFile(dir, {});
    } catch (err) {
      console.error(`Error parsing 'rex_pkg.json' file: ${err}`);
      return new RexPkgConfigFile(dir);
    }
  }

  public override toString = (): string => {
    return `${this.name}: ${this.stringify()}`;
  };
}
