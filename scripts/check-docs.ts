import { existsSync, readdirSync, readFileSync } from "node:fs"
import { dirname, resolve } from "node:path"
function markdown(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = `${dir}/${entry.name}`
    if (entry.isDirectory()) return markdown(path)
    return entry.name.endsWith(".md") ? [path] : []
  })
}
function brokenLinks(path: string): string[] {
  const source = readFileSync(path, "utf8").replaceAll(/```[\s\S]*?```/gu, "")
  const errors: string[] = []
  for (const match of source.matchAll(/\]\(([^)]+)\)/gu)) {
    const href = match[1]
    if (/^[a-z]+:/iu.test(href) || href.startsWith("#")) continue
    const target = href.split("#")[0]
    if (target !== "" && !existsSync(resolve(dirname(path), target)))
      errors.push(`${path}: ${href}`)
  }
  return errors
}
const errors = [
  "README.md",
  "AGENTS.md",
  ...markdown("docs"),
  ...markdown(".agents/skills"),
].flatMap((path) => brokenLinks(path))
if (errors.length > 0) throw new Error(`Broken local documentation links:\n${errors.join("\n")}`)
console.log("Local documentation file links resolve")
