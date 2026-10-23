import { existsSync, readdirSync, readFileSync } from "node:fs"
import { dirname, resolve } from "node:path"
function markdown(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory()
      ? markdown(`${dir}/${e.name}`)
      : e.name.endsWith(".md")
        ? [`${dir}/${e.name}`]
        : [],
  )
}
const errors = []
for (const path of ["README.md", "AGENTS.md", ...markdown("docs")]) {
  const source = readFileSync(path, "utf8").replace(/```[\s\S]*?```/g, "")
  for (const match of source.matchAll(/\]\(([^)]+)\)/g)) {
    const href = match[1]
    if (/^[a-z]+:/i.test(href) || href.startsWith("#")) continue
    const target = href.split("#")[0]
    if (target && !existsSync(resolve(dirname(path), target))) errors.push(`${path}: ${href}`)
  }
}
if (errors.length) throw Error(`Broken local documentation links:\n${errors.join("\n")}`)
console.log("Local documentation file links resolve")
