// ex. scripts/build_npm.ts
import { build, emptyDir } from "https://deno.land/x/dnt@0.40.0/mod.ts";

const pkgVer = JSON.parse(Deno.readTextFileSync("./deno.json")).version;

const rexDest = `../../${JSON.parse(Deno.readTextFileSync("../../.rexmap.json")).imports["rex/"]}`;

const rexPkgVer = JSON.parse(
  Deno.readTextFileSync(`${rexDest}deno.json`),
).version;

await emptyDir("./npm");

// TODO: Get Version

await build({
  entryPoints: ["./main.ts"],
  outDir: "./npm",
  shims: {
    deno: true,
  },
  filterDiagnostic(diagnostic) {
    if (diagnostic.file?.fileName.includes("cliffy")) {
      return false;
    }
    return true;
  },
  importMap: "../../.rexmap.json",
  mappings: {
    "../rex/mod.ts": {
      name: "@rex-js/rex",
      version: `^${rexPkgVer}`,
      peerDependency: true,
    },
  },
  scriptModule: false,
  package: {
    // package.json properties
    name: "@rex-js/rex-cli",
    version: pkgVer,
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
    Deno.createSync("npm/.gitignore").writeSync(
      new TextEncoder().encode(`node_modules/`),
    );
    Deno.writeTextFileSync("npm/.npmignore", "\nnode_modules/", {
      append: true,
    });
  },
});
