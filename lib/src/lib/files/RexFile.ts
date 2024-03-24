export class RexFile {
  createSync(directory?: string): void {
    Deno
      .createSync(`${directory ?? '.'}/${this.name}`)
      .writeSync(new TextEncoder().encode(this.contents ?? ''));
  }

  async create(directory?: string): Promise<void> {
    await Deno
      .create(`${directory ?? '.'}/${this.name}`)
      .then((file: Deno.FsFile) => file.writeSync(new TextEncoder().encode(this.contents)));
  }

  name: string;
  contents: string | undefined;

  constructor(
    name: string,
    contents?: string
  ) {
    this.name = name;
    this.contents = contents;
  }

  addCode(contents: string): RexFile {
    this.contents = contents;
    return this;
  }

  public toString = (): string => {
    return `${this.name}: ${this.contents}`;
  };
}
