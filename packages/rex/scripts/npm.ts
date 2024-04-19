// TODO: Generate package.json
const pkgVer = JSON.parse(Deno.readTextFileSync("./deno.json")).version;

const pkgJson = {
    name: "@rex-js/rex",
    version: pkgVer,
    description: "The Rex Monorepo Tool, used for building the greatest in JS!",
    keywords: [
      "rex",
      "monorepo",
      "typescript",
      "rexjs"
    ],
    repository: "https://github.com/nikeokoronkwo/rex",
    bugs: {
      url: "https://github.com/nikeokoronkwo/rex/issues",
      email: "nikechukwu@nugegroup.com"
    },
    author: "Nikechukwu Okoronkwo <nikechukwu@nugegroup.com>",
    type: "module",
    main: "index.js",
    exports: {
      ".": "./index.js",
      "min": "./index.min.js"
    },
    license: "MIT"
}

Deno.createSync('./package.json')