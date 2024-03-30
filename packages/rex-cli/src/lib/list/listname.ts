import { existsSync, SEPARATOR, colors } from "../../../deps.ts";

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
