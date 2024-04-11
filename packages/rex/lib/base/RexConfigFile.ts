import { RexConfigFileOptions, RexSpecialConfig } from "./RexConfig.ts";
import { RexFile, RexSpecialFile } from "./RexFile.ts";

export class RexConfigFile extends RexSpecialFile {
  publishTo: string[] | undefined;
  publishChildrenTo: string[] | undefined;
  workflows: object | undefined;
  repository: object | string | undefined;
  plugins: object[] | undefined;
  mainPackage: object | undefined;
  rexActions: object | undefined;

  constructor(options?: RexConfigFileOptions) {
    super("rex.json");
    this.publishTo = options?.publishTo;
    this.publishChildrenTo = options?.publishChildrenTo;
    this.workflows = options?.workflows;
    this.repository = options?.repository;
    this.plugins = options?.plugins;
    this.mainPackage = options?.mainPackage;
    this.rexActions = options?.rexActions;
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
        mainPackage: jsonObject.main,
        rexActions: jsonObject.actions,
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
      plugins: this.plugins,
    });
  }

  public override toString = (): string => {
    return `${this.name}: ${this.stringify()}`;
  };
}
