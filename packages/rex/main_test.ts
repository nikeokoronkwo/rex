import {
  assert,
  assertEquals,
  assertNotEquals,
} from "https://deno.land/std@0.218.0/assert/mod.ts";
import { RexFile } from "./mod.ts";

Deno.test(function RexFileTest() {
  const rfile = new RexFile("README.md", "# Hello World");
  assertEquals(rfile.contents, "# Hello World");
  rfile.addCode("# Rex");
  assertNotEquals(rfile.contents, "# Hello World");
  assertEquals(rfile.contents, "# Rex");
});
