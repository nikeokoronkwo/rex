import { EnumType } from "https://deno.land/x/cliffy@v1.0.0-rc.3/command/mod.ts";

export const envType = new EnumType(["npm", "deno", "jsr", "all", "none"]);
