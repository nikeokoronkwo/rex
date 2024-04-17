import { colors } from "../../../deps.ts";

export async function runProcess(
  name: string,
  path: string,
  cmdToRun: string[],
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
        "Failed",
      )}: Process exited with exit code ${status.code}: \n${new TextDecoder().decode(stderr)}`,
    );
  }
  process.close();
}
