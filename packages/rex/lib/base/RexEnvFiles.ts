import { RexSpecialFile } from "rex";

export class RexDenoFile extends RexSpecialFile {
  denoFile: object | undefined;
  dir: string;

  // TODO: Implement object-specifics in class implementation
  constructor(denoFile?: object, dir: string = ".") {
    super("deno.json");
    this.denoFile = denoFile;
    this.dir = dir;
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

  public static parse(contents: string, dir: string = ".") {
    try {
      const jsonObject = JSON.parse(contents);
      return new RexDenoFile(jsonObject, dir);
    } catch (err) {
      console.error(`Error parsing 'deno.json' file: ${err}`);
      return new RexDenoFile(undefined, dir);
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
