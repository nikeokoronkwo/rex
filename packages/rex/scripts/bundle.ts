import * as esbuild from "https://deno.land/x/esbuild@v0.20.1/mod.js";
import { bundle } from "https://deno.land/x/emit/mod.ts";

const result = await bundle("./mod.ts", {
  importMap: "../../.rexmap.json",
});
const { code } = result;
Deno.writeFileSync("index.js", new TextEncoder().encode(code));

// Run from project root directory
await esbuild.build({
  entryPoints: ["index.js"],
  outfile: "index.min.js",
  minify: true,
});
