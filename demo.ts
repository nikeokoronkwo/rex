import { normalizeGlob } from "https://deno.land/std/path/normalize_glob.ts";
import { globToRegExp } from "https://deno.land/std/path/glob_to_regexp.ts";
import {EOL} from "https://deno.land/std/fs/eol.ts";

// const ex = 'lib/*';
// const norm = normalizeGlob(ex);
// const globex = globToRegExp(ex);

// for await (const item of Deno.readDir('.')) {
//     if (item.isDirectory) console.log(item.name);
// }

const p=Deno.run({ cmd: ["echo", "abcd"] });

console.log(p.status);