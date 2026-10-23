import { existsSync } from "node:fs"
import { configuration } from "./configuration.ts"
import { json, parseObject, parseState } from "./data.ts"
import { read, safe, verifyOrigin, verifyRepository } from "./files.ts"
import { applyOperations, backup } from "./journal.ts"
import { digest } from "./manifest.ts"
import { plan, preview } from "./plan.ts"
import { cleanup, verifyApp } from "./verification.ts"
function finalize() {
  const apply = applyRequested()
  verifyRepository()
  const config = configuration(read(".starter/config.json"))
  const configHash = digest(json({ ...config, resolutions: undefined }))
  const pending = existsSync(".starter/state.json") ? parseState(read(".starter/state.json")) : null
  if (pending !== null && pending.configHash !== configHash)
    throw new Error(
      "Setup choices changed during a pending finalization. Restore from the recorded backup before changing choices.",
    )
  const manifest = parseObject(read(".starter/manifest.json"))
  const ops = pending?.ops ?? plan(config, manifest)
  preview(config, ops, apply)
  if (!apply) return
  verifyOrigin()
  const state = pending ?? backup(configHash, ops)
  console.log(
    `Recovery backup: ${state.backup}. See .starter/RECOVERY.md for recovery; do not reset unrelated work.`,
  )
  for (const op of state.ops) {
    safe(op.path)
    if (!(op.path in manifest)) throw new Error(`Unexpected resumed operation: ${op.path}`)
  }
  applyOperations(state)
  verifyApp(config, state)
  cleanup(manifest)
  console.log(
    `Finalized ${config.name}. Review git diff and commit. Setup commands are now removed. Recovery bytes remain at ${state.backup}.`,
  )
}
try {
  finalize()
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error))
  process.exitCode = 1
}

function applyRequested() {
  const args = process.argv.slice(2)
  if (
    args.some((arg) => !["--preview", "--apply"].includes(arg)) ||
    new Set(args).size !== args.length ||
    args.length > 1
  )
    throw new Error("Use pnpm setup:finalize --preview or --apply")
  const apply = args.includes("--apply")

  return apply
}
