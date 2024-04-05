# Rex

Rex is a powerful and feature-rich tool used for handling, managing and scaling monorepositories across various JavaScript Platforms, including [npm](https://npmjs.com), [deno](https://deno.land) and [jsr](https://jsr.io).

Rex is able to handle package dependencies via either npm's node_modules, or through deno's url imports.
Whatever the case, Rex has got you covered.

## Using this tool
The aim of this project is to work and be usable across multiple platforms, with an mvp of being usable in Deno. For now, if you want to use the tool, then you will need to have Deno installed.

Once you have that, run the following command
```bash
deno install -A https://deno.land/x/rex_cli/main.ts 
```

Once you have it installed, you can confirm by running the following command:
```bash
rex -V
```
This should print the current version

For more information on using this tool, check out the [wiki] and the [docs](./docs/README.md).

## Building this Project
Building this project is as simple as compiling. Ensure that you have Deno installed
Run the following commands
1. Clone this repository
```bash
git clone https://github.com/nikeokoronkwo/rex
```
2. Compile the project
```bash
deno compile -A main.ts # Run at root of project
deno compile -A packages/rex-cli/main.ts # You can also do this
```
3. Add Executable to PATH

## Contributing
Contributions are welcome and appreciated!

Check the [contributing](./CONTRIBUTING.md) file for more information

## License

[MIT License](./LICENSE)
