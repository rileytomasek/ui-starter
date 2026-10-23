import { existsSync, unlinkSync, writeFileSync } from "node:fs"
import type { Configuration } from "./configuration.ts"
import { json, object, parseObject, strings, type JsonObject, type State } from "./data.ts"
import { pruneEmpty, read, run, safe } from "./files.ts"
import { files } from "./manifest.ts"
export function verifyApp(config: Configuration, state: State) {
  const formatter = parseObject(read(".oxfmtrc.json"))
  const ignored = strings(formatter.ignorePatterns)
  formatter.ignorePatterns = [...new Set([...ignored, ".starter/state.json"])]
  writeFileSync(".oxfmtrc.json", json(formatter))
  const pkg = parseObject(read("package.json"))
  object(pkg.scripts)["setup:finalize"] = "node .starter/finalize.ts"
  writeFileSync("package.json", json(pkg))
  run("pnpm", ["install", "--ignore-scripts"])
  const written = state.ops
    .filter((op) => op.text !== null && op.keep !== true)
    .map((op) => op.path)
  run("pnpm", ["exec", "oxfmt", "--write", ...written, ".starter/config.json"])
  verifyDocs(config)
  run("pnpm", ["check"])
  run("pnpm", ["test:e2e"])
}
function verifyDocs(config: Configuration) {
  for (const path of [
    "README.md",
    "AGENTS.md",
    ...files("docs").filter((p) => p.endsWith(".md")),
  ]) {
    if (/(?:docs\/)?starter\//u.test(read(path)))
      throw new Error(`Stale temporary documentation link in ${path}; migrate it before retrying`)
  }
  for (const path of ["README.md", "AGENTS.md"]) {
    if (!read(path).includes(config.name) || !read(path).includes(config.purpose))
      throw new Error(`${path} must describe the configured app name and purpose`)
  }
  if (
    !read("AGENTS.md").includes("shadcn") ||
    !read("AGENTS.md").includes("interface-design/SKILL.md")
  )
    throw new Error("AGENTS.md must retain shadcn installation and design-skill instructions")
}
export function cleanup(manifest: JsonObject) {
  const pkg = parseObject(read("package.json"))
  for (const key of ["setup:finalize", "setup:baseline", "test:setup"])
    delete object(pkg.scripts)[key]
  writeFileSync("package.json", json(pkg))
  const formatter = parseObject(read(".oxfmtrc.json"))
  formatter.ignorePatterns = strings(formatter.ignorePatterns).filter(
    (path) => path !== ".starter/state.json",
  )
  writeFileSync(".oxfmtrc.json", json(formatter))
  run("pnpm", ["exec", "oxfmt", "--write", "package.json", ".oxfmtrc.json"])
  const paths = [
    ...Object.keys(manifest).filter((path) => path.startsWith(".starter/")),
    ".starter/manifest.json",
    ".starter/state.json",
  ]
  for (const path of paths) {
    if (existsSync(safe(path))) unlinkSync(safe(path))
  }
  for (const dir of [".starter", "docs/starter", "src/gallery", "src/examples"]) pruneEmpty(dir)
}
