import {
  Command,
  EnumType,
} from "https://deno.land/x/cliffy@v1.0.0-rc.3/command/mod.ts";
import { envType } from "../shared/env.ts";

const publishType = new EnumType(["children", "main"]);

const publish = new Command()
  .type("pub-type", publishType)
  .type("env-type", envType)
  .description(
    `
Publish your packages in the monorepository.

This command publishes the given packages inferred from the argument, using the "rex_pkg.json" or "rex.json" file to get the configuration for the publishing pipeline.
By default cli arguments override.
`,
  )
  .option("-n --dry-run", "Perform a dry run, do not publish yet")
  .option(
    "-i --ignore <env...:env-type>",
    "Ignore publishing packages to the given <env>(s)",
  )
  .option(
    "-b --bundle [args...:string]",
    "Bundle Packages before publishing and pass ",
  )
  .option(
    "--tsc-compile",
    "Compile to TypeScript with given args before publishing",
  )
  .option(
    "--no-config",
    "Do not use 'rex_pkg.json' when configuring publishing pipeline",
  )
  .arguments("<type:pub-type>");
export default publish;
