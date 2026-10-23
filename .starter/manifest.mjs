import { readdirSync, readFileSync, writeFileSync, existsSync } from "node:fs"
import { createHash } from "node:crypto"
export const digest = (text) => createHash("sha256").update(text).digest("hex")
export function files(dir) {
  if (!existsSync(dir)) return []
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    if (entry.isSymbolicLink()) throw Error(`Symlink not allowed: ${dir}/${entry.name}`)
    return entry.isDirectory() ? files(`${dir}/${entry.name}`) : [`${dir}/${entry.name}`]
  })
}
export const transformed = [
  "README.md",
  "AGENTS.md",
  "package.json",
  "pnpm-lock.yaml",
  "index.html",
  "src/main.tsx",
  "src/App.tsx",
  "src/App.browser.test.tsx",
  "src/app/config.ts",
  "src/app/navigation.ts",
  "playwright.config.ts",
  "vite.config.ts",
  "docs/architecture.md",
  "docs/ui.md",
  "docs/components.md",
  "docs/layouts.md",
  "tests/e2e/smoke.spec.ts",
]
export function refresh() {
  const paths = [
    ...new Set([
      ...transformed,
      ...files("docs/starter"),
      ...files("src/gallery"),
      ...files("src/examples"),
      ...files(".starter").filter(
        (p) => ![".starter/manifest.json", ".starter/state.json"].includes(p),
      ),
      "docs/implementation.md",
      "tests/e2e/forms.spec.ts",
      "tests/e2e/shells.spec.ts",
    ]),
  ]
  writeFileSync(
    ".starter/manifest.json",
    JSON.stringify(
      Object.fromEntries(paths.map((p) => [p, existsSync(p) ? digest(readFileSync(p)) : null])),
      null,
      2,
    ) + "\n",
  )
}
