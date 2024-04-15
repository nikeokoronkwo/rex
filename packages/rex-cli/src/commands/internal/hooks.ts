import { Command } from "../../../deps.ts";

// TODO: Hooks for Git via Rex
const hooks = new Command().description("Git Hooks for Rex").hidden();

export default hooks;
