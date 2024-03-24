import { RexConfigFileOptions, RexSpecialFile } from "./RexConfig.ts";
import { RexFile } from "./RexFile.ts";

export class RexConfigFile extends RexFile implements RexSpecialFile {
  publishTo: string[] | undefined;
  publishChildrenTo: string[] | undefined;
  workflows: object | undefined;
  repository: object | undefined;
  plugins: object[] | undefined;
  mainPackage: object | undefined;

  constructor(options?: RexConfigFileOptions) {
    super("rex.json");
    this.publishTo = options?.publishTo;
    this.publishChildrenTo = options?.publishChildrenTo;
    this.workflows = options?.workflows;
    this.repository = options?.repository;
    this.plugins = options?.plugins;
    this.mainPackage = options?.mainPackage;
  }

  static parse(contents: string) {
    try {
      const jsonObject = JSON.parse(contents);
      return new RexConfigFile({
        publishTo: jsonObject.publishTo,
        publishChildrenTo: jsonObject.publishChildrenTo,
        workflows: jsonObject.workflows,
        repository: jsonObject.repository,
        plugins: jsonObject.plugins,
        mainPackage: jsonObject.mainPackage
      });
    } catch (err) {
      console.error(`Error parsing 'rex.json' file: ${err}`);
      return new RexConfigFile();
    }
  }

  stringify(): string {
    // Create json text
    return JSON.stringify({
      publishTo: this.publishTo,
      publishChildrenTo: this.publishChildrenTo,
      mainPackage: this.mainPackage,
      workflows: this.workflows,
      repository: this.repository,
      plugins: this.plugins
    });
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
