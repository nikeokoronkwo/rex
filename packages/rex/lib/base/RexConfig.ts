export interface RexConfigFileOptions {
  publishTo?: string[];
  publishChildrenTo?: string[];
  workflows?: object;
  repository?: object;
  plugins?: object[];
  mainPackage?: object;
}

export interface RexSpecialConfig {
  stringify(): string;
}