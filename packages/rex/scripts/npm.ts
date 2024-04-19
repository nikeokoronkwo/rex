import { build, emptyDir } from "https://deno.land/x/dnt@0.40.0/mod.ts";

const pkgVer = JSON.parse(Deno.readTextFileSync("./deno.json")).version;

await emptyDir("./npm");

const pkgJson = {
  name: "@rex-js/rex",
  version: pkgVer,
  description: "The Rex Monorepo Tool, used for building the greatest in JS!",
  keywords: ["rex", "monorepo", "typescript", "rexjs"],
  repository: "https://github.com/nikeokoronkwo/rex",
  bugs: {
    url: "https://github.com/nikeokoronkwo/rex/issues",
    email: "nikechukwu@nugegroup.com",
  },
  author: "Nikechukwu Okoronkwo <nikechukwu@nugegroup.com>",
  license: "MIT",
};

await build({
  entryPoints: ["./mod.ts"],
  outDir: "./npm",
  shims: {
    deno: true,
  },
  package: pkgJson,
  scriptModule: "cjs",
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