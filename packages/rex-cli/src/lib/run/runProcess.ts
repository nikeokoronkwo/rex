import { colors } from "https://deno.land/x/cliffy@v1.0.0-rc.3/ansi/colors.ts";

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
    cmd: cmdToRun,
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
      `${colors.green("Success")}: Process suceeded at ${name} \n${stdout}`,
    );
  } else {
    console.log(
      `${colors.red(
        "Failed",
      )}: Process exited with exit code ${status.code}: \n${stderr}`,
    );
  }
  process.close();
}
