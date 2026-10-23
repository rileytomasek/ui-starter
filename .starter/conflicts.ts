import { existsSync } from "node:fs"
import type { Configuration } from "./configuration.ts"
import { json, object, string, type JsonObject, type Operation } from "./data.ts"
import { current, safe } from "./files.ts"
type Conflict = { path: string; sha256: string | null; actions: string }
function keep(op: Operation, config: Configuration) {
  if (op.path.startsWith("docs/starter/") || op.path === "docs/implementation.md")
    throw new Error(
      `Migrate enduring content from ${op.path}; temporary instructions cannot remain active`,
    )
  const removedExample = op.path.startsWith("src/examples/") && !config.retainExamples
  const removedGallery = op.path.startsWith("src/gallery/") && !config.retainGallery
  if (op.text === null && (removedExample || removedGallery))
    throw new Error(`Set the matching retention choice to keep ${op.path}`)
  op.keep = true
}
function migrate(op: Operation, resolution: JsonObject, ops: Operation[]) {
  const target = string(resolution.to)
  safe(target)
  if (
    target.startsWith(".starter/") ||
    target.startsWith("docs/starter/") ||
    ops.some((item) => item.path === target) ||
    !existsSync(target) ||
    current(target) !== resolution.targetSha256
  )
    throw new Error(
      `Migrate ${op.path} into an existing retained file, then record to and targetSha256`,
    )
}
function resolve(op: Operation, config: Configuration, ops: Operation[]): Conflict | null {
  const hash = current(op.path)
  const value = config.resolutions[op.path]
  const resolution = value === undefined ? null : object(value)
  if (resolution === null || resolution.sha256 !== hash)
    return { path: op.path, sha256: hash, actions: "keep (retained files only), migrate, remove" }
  if (resolution.action === "keep") keep(op, config)
  else if (resolution.action === "migrate") migrate(op, resolution, ops)
  else if (resolution.action !== "remove")
    throw new Error(`Unknown conflict resolution for ${op.path}`)
  return null
}
export function verifyConflicts(ops: Operation[], manifest: JsonObject, config: Configuration) {
  const conflicts: Conflict[] = []
  for (const op of ops) {
    safe(op.path)
    if (!(op.path in manifest)) throw new Error(`Transformation missing from manifest: ${op.path}`)
    if (current(op.path) === manifest[op.path]) continue
    const conflict = resolve(op, config, ops)
    if (conflict !== null) conflicts.push(conflict)
  }
  const lockHash = current("pnpm-lock.yaml")
  const lockResolution = config.resolutions["pnpm-lock.yaml"]
  const acknowledged = lockResolution !== undefined && object(lockResolution).sha256 === lockHash
  if (lockHash !== manifest["pnpm-lock.yaml"] && !acknowledged)
    conflicts.push({
      path: "pnpm-lock.yaml",
      sha256: lockHash,
      actions: "keep; pnpm reconciles the lockfile",
    })
  if (conflicts.length > 0)
    throw new Error(
      `Modified-file conflicts; record an explicit resolution and current hash in .starter/config.json:\n${json(conflicts)}`,
    )
}
