import { existsSync } from "https://deno.land/std@0.223.0/fs/exists.ts";

// TODO: Generate package.json
const pkgVer = JSON.parse(Deno.readTextFileSync("./deno.json")).version;

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
  type: "module",
  main: "index.js",
  exports: {
    ".": "./index.js",
    "./min": "./index.min.js",
  },
  license: "MIT",
};

if (existsSync("./package.json")) Deno.removeSync("./package.json");
Deno.createSync("./package.json").writeSync(
  new TextEncoder().encode(JSON.stringify(pkgJson)),
);
