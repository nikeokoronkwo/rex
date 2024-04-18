import { colors } from "../../../deps.ts";

export async function runProcess(
  name: string,
  path: string,
  cmdToRun: string[],
  exitOnError?: boolean | undefined,
) {
  console.log(
    `Running "${cmdToRun.join(" ")}" in ${colors.blue(name)} at ${colors.italic(
      path,
    )}\n`,
  );
  const process = Deno.run({
    cmd: ["cmd", "/c", ...cmdToRun],
    cwd: path,
    stderr: "piped",
    stdout: "piped",
  });
  const [status, stdout, stderr] = await Promise.all([
    process.status(),
    process.output(),
    process.stderrOutput(),
  ]);
  if (status.success) {
    console.log(
      `${colors.green("Success")}: Process suceeded at ${name} \n${new TextDecoder().decode(stdout)}`,
    );
  } else {
    console.log(
      `${colors.red(
        `Failed at ${colors.white.bold(name)}`,
      )}: Process exited with exit code ${status.code}: \n${new TextDecoder().decode(stderr)}`,
    );
    if (exitOnError) {
      process.close();
      Deno.exit(1);
    }
  }
  await process.close();
}
