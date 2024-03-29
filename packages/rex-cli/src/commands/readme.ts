import { Command, EnumType } from "https://deno.land/x/cliffy/command/mod.ts";

const readme = new Command().description(
  "Get markdown summary of packages suitable for use in your README.",
);

export default readme;
