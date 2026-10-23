import type { Configuration } from "./configuration.ts"
import { verifyConflicts } from "./conflicts.ts"
import { json, object, parseObject, type JsonObject, type Operation } from "./data.ts"
import { read } from "./files.ts"
import { files } from "./manifest.ts"
import { replacements } from "./templates.ts"
function removals(config: Configuration, manifest: JsonObject) {
  return Object.keys(manifest).filter((path) => {
    if (path.startsWith("docs/starter/") || path === "docs/implementation.md") return true
    if (
      !config.retainGallery &&
      (path.startsWith("src/gallery/") ||
        ["tests/e2e/forms.spec.ts", "tests/e2e/shells.spec.ts"].includes(path))
    )
      return true
    return !config.retainExamples && path.startsWith("src/examples/")
  })
}
function trimDependencies(writes: Record<string, string>, deletes: string[]) {
  const pkg = parseObject(writes["package.json"])
  const code = [...files("src"), ...files("scripts"), ...files("tests")].filter(
    (path) => /\.(?:tsx?|mjs)$/u.test(path) && !deletes.includes(path),
  )
  const remaining = code.map((path) => writes[path] ?? read(path)).join("\n")
  const removed: string[] = []
  for (const dep of ["@hookform/resolvers", "react-hook-form", "zod", "@tanstack/react-table"]) {
    if (remaining.includes(`"${dep}`) || remaining.includes(`'${dep}`)) continue
    delete object(pkg.dependencies)[dep]
    removed.push(dep)
  }
  writes["package.json"] = json(pkg)
  let vite = read("vite.config.ts")
  for (const dep of removed) {
    const escaped = dep.replaceAll(/[.*+?^${}()|[\]\\]/gu, "\\$&")
    vite = vite.replaceAll(new RegExp(`^\\s*"${escaped}(?:/[^"]*)?",?\\n`, "gmu"), "")
  }
  writes["vite.config.ts"] = vite
}
export function plan(config: Configuration, manifest: JsonObject): Operation[] {
  for (const path of [...files("docs/starter"), ...files(".starter")]) {
    if (!(path in manifest) && ![".starter/manifest.json", ".starter/state.json"].includes(path))
      throw new Error(
        `Unlisted temporary file ${path}; migrate it outside temporary directories before finalization`,
      )
  }
  const writes = replacements(config, read)
  const deletes = removals(config, manifest)
  if (!config.retainExamples) trimDependencies(writes, deletes)
  const ops = [
    ...Object.entries(writes).map(([path, text]) => ({ path, text })),
    ...deletes.map((path) => ({ path, text: null })),
  ]
  verifyConflicts(ops, manifest, config)
  return ops
}
function previewOperation(op: Operation) {
  if (op.keep === true) return { path: op.path, action: "keep" }
  if (op.text === null) return { path: op.path, action: "remove" }
  return { path: op.path, action: "write", content: op.text }
}
export function preview(config: Configuration, ops: Operation[], apply: boolean) {
  console.log(
    json({
      mode: apply ? "apply" : "preview",
      app: config.name,
      operations: ops.map((op) => previewOperation(op)),
      lockfile: "pnpm install --ignore-scripts",
      verification: ["format generated files", "pnpm check", "pnpm test:e2e"],
      afterSuccess:
        "remove only manifest-listed .starter files and setup scripts; retain backup in Git metadata",
    }),
  )
}
