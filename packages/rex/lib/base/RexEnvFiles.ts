import { RexSpecialFile } from "rex";

export class RexDenoFile extends RexSpecialFile {
  denoFile: object | undefined;

  // TODO: Implement object-specifics in class implementation
  constructor(denoFile?: object) {
    super("deno.json");
    this.denoFile = denoFile;
  }

  stringify(): string {
    return JSON.stringify(this.denoFile);
  }

  addImportPath(importPath: string) {
    if (this.denoFile)
      Object.assign(this.denoFile, {
        importPath: importPath,
      });
    return this;
  }

  public static parse(contents: string) {
    try {
      const jsonObject = JSON.parse(contents);
      return new RexDenoFile(jsonObject);
    } catch (err) {
      console.error(`Error parsing 'deno.json' file: ${err}`);
      return new RexDenoFile();
    }
  }
}

export class RexJSRFile extends RexSpecialFile {
  jsrFile: object | undefined;

  // TODO: Implement object-specifics in class implementation
  constructor(jsrFile?: object) {
    super("jsr.json");
    this.jsrFile = jsrFile;
  }

  stringify(): string {
    return JSON.stringify(this.jsrFile);
  }

  addImportPath(importPath: string) {
    if (this.jsrFile)
      Object.assign(this.jsrFile, {
        importPath: importPath,
      });
    return this;
  }

  public static parse(contents: string): RexJSRFile {
    try {
      const jsonObject = JSON.parse(contents);
      return new RexJSRFile(jsonObject);
    } catch (err) {
      console.error(`Error parsing 'jsr.json' file: ${err}`);
      return new RexJSRFile();
    }
  }
}
