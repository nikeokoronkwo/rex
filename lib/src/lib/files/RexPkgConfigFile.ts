import { RexFile } from './RexFile.ts';
import { RexSpecialFile } from './RexConfig.ts';

export class RexPkgConfigFile extends RexFile implements RexSpecialFile {
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

  override createSync(directory?: string): void {
    Deno
      .createSync(`${directory ?? '.'}/${this.name}`)
      .writeSync(new TextEncoder().encode(this.stringify()));
  }

  override async create(directory?: string): Promise<void> {
    await Deno
      .create(`${directory ?? '.'}/${this.name}`)
      .then(
        (file: Deno.FsFile) => file.writeSync(new TextEncoder().encode(this.stringify()))
      );
  }
}
