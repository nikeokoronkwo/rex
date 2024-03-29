import { existsSync } from "https://deno.land/std@0.219.1/fs/mod.ts";
import { SEPARATOR } from "https://deno.land/std@0.219.1/path/constants.ts";
import { colors } from "https://deno.land/x/cliffy@v1.0.0-rc.3/ansi/colors.ts";

export function listname(name: string, path: string) {
  let pkgname: string = "";
  if (existsSync(`${path}${SEPARATOR}deno.json`)) {
    pkgname =
      JSON.parse(Deno.readTextFileSync(`${path}${SEPARATOR}deno.json`)).name ??
      name;
  } else if (existsSync(`${path}${SEPARATOR}jsr.json`)) {
    pkgname =
      JSON.parse(Deno.readTextFileSync(`${path}${SEPARATOR}jsr.json`)).name ??
      name;
  } else if (existsSync(`${path}${SEPARATOR}package.json`)) {
    pkgname = JSON.parse(
      Deno.readTextFileSync(`${path}${SEPARATOR}package.json`),
    ).name;
  } else {
    pkgname = name;
  }
  console.log(`${colors.blue(pkgname)} -- ${path}`);
}
