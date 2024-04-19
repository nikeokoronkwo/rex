export interface RexPkgPubActions {
  name?: string;
  run: string;
  performFor: ("npm" | "deno" | "jsr" | "all" | "none")[];
}
