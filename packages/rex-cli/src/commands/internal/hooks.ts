import { Command, EnumType } from "../../../deps.ts";

const hookType = new EnumType(["pre-commit", "post-commit"])

// TODO: Hooks for Git via Rex
const hooks = new Command()
.type('hook-type', hookType)
.description("Git Hooks for Rex")
.arguments("<hook:hook-type>")
.hidden();

export default hooks;
