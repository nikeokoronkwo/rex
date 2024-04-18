import * as esbuild from "https://deno.land/x/esbuild@v0.20.1/mod.js";
import { bundle } from "https://deno.land/x/emit/mod.ts";

const result = await bundle("./main.ts");
const { code } = result;
Deno.writeFileSync("dist/pheasant_routing.js", new TextEncoder().encode(code));

// Run from project root directory
await esbuild.build({
  entryPoints: ["dist/pheasant_routing.js"],
  outfile: "dist/pheasant_routing.min.js",
  minify: true,
});
