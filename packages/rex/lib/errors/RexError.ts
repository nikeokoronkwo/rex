import { colors } from "https://deno.land/x/cliffy@v1.0.0-rc.3/ansi/colors.ts";

export class RexError {
  message: string;
  exitCode: number;

  constructor(msg: string, exitCode?: number) {
    this.message = msg;
    this.exitCode = exitCode ?? 1;
  }

  print() {
    console.error(`${colors.red("Error")}: ${this.message}`);
    return this;
  }

  exit = () => Deno.exit(this.exitCode);
}
