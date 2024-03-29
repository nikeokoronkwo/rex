export interface RexConfigRexActions {
  ci?: object;
  publish?: object;
  bundle?: object;
  compile?: object;
}

interface RexConfigCI {}

interface RexConfigPublish {
  preAction?: object;
}
