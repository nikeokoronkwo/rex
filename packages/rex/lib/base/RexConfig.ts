export interface RexConfigFileOptions {
  publishTo?: string[];
  publishChildrenTo?: string[];
  workflows?: object;
  repository?: object | string;
  plugins?: object[];
  mainPackage?: object;
  rexActions?: object;
}

export interface RexSpecialConfig {
  stringify(): string;
}
