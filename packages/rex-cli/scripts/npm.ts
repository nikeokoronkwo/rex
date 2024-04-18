// ex. scripts/build_npm.ts
import { build, emptyDir } from "https://deno.land/x/dnt@0.40.0/mod.ts";

await emptyDir("./npm");

await build({
  entryPoints: ["./main.ts"],
  outDir: "./npm",
  shims: {
    deno: true,
  },
  filterDiagnostic(diagnostic) {
    if (diagnostic.file?.fileName.includes("cliffy@v1.0.0-rc.3")) {
      return false;
    }
    return true;
  },
  importMap: "../../.rexmap.json",
  scriptModule: false,
  package: {
    // package.json properties
    name: "@prouesse/rex-cli",
    version: "0.0.1-pre",
    description:
      "The Rex Monorepo CLI Tool, used for building the greatest in JS!",
    license: "MIT",
    keywords: ["rex", "monorepo", "typescript", "rexjs"],
    repository: {
      type: "git",
      url: "https://github.com/nikeokoronkwo/rex",
    },
    bugs: {
      url: "https://github.com/nikeokoronkwo/rex/issues",
      email: "nikechukwu@nugegroup.com",
    },
    author: "Nikechukwu Okoronkwo <nikechukwu@nugegroup.com>",
    bin: {
      rex: "./esm/rex-cli/main.js",
    },
  },
  postBuild() {
    // steps to run after building and before running the tests
    Deno.copyFileSync("LICENSE", "npm/LICENSE");
    Deno.copyFileSync("README.md", "npm/README.md");
    Deno.copyFileSync("../../CHANGELOG.md", "npm/CHANGELOG.md");
  },
});
