export class RexConfigRexActions {
  publish?: object;
  bundle?: object;
  compile?: object;
  gitActions?: RexConfigGitActions;

  constructor(
    publish?: object,
    bundle?: object,
    compile?: object,
    gitActions?: object,
  ) {
    this.publish = publish;
    this.bundle = bundle;
    this.compile = compile;
    this.gitActions = gitActions;
  }

  static parse(obj: any) {
    return new RexConfigRexActions(
      obj.publish,
      obj.bundle,
      obj.compile,
      obj.gitHooks,
    );
  }
}

interface RexConfigCI {}

interface RexConfigPublish {
  preAction?: object;
}

interface RexConfigGitActions {
  preCommit?: object | string;
  postCommit?: object | string;
  preRebase?: object | string;
  postRewrite?: object | string;
}

interface RexConfigGitHook {
  script: string;
}
