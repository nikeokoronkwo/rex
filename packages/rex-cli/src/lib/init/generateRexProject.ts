import { RexConfigFile } from "rex";
import { RexFile } from "rex";

export function generateRexProject(
  template: string,
  directory: string | undefined,
  name: string | undefined,
  options: any,
) {
  const dir = directory ?? ".";
  const mainFiles: RexFile[] = [
    new RexFile("README.md"),
    new RexFile("CHANGELOG.md").addCode(
      `# Changelog for ${name}\n\n##1.0.0\n- Initial Version`,
    ),
    new RexFile("LICENSE").addCode(``),
  ];
  mainFiles.forEach((file) => file.createSync(dir));
  new RexConfigFile({
    publishTo: options.env,
  }).createSync(dir);
}
