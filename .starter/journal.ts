import { execFileSync } from "node:child_process"
import { randomUUID } from "node:crypto"
import { existsSync, mkdirSync, readFileSync, unlinkSync, writeFileSync } from "node:fs"
import { dirname, resolve } from "node:path"
import { json, object, parseObject, string, type Operation, type State } from "./data.ts"
import { current, root, safe } from "./files.ts"
import { digest, files } from "./manifest.ts"
export function backup(configHash: string, ops: Operation[]): State {
  const gitDir = execFileSync("git", ["rev-parse", "--absolute-git-dir"], {
    encoding: "utf8",
  }).trim()
  const path = resolve(gitDir, "app-setup-backups", `${randomUUID()}.json`)
  const paths = [...new Set([...ops.map((op) => op.path), ...files(".starter"), "pnpm-lock.yaml"])]
  const originals = Object.fromEntries(
    paths.map((p) => [p, existsSync(safe(p)) ? readFileSync(safe(p)).toString("base64") : null]),
  )
  mkdirSync(dirname(path), { recursive: true })
  writeFileSync(
    path,
    json({
      root,
      head: execFileSync("git", ["rev-parse", "HEAD"], { encoding: "utf8" }).trim(),
      files: originals,
    }),
    { flag: "wx" },
  )
  const state = { configHash, backup: path, ops, next: 0, mutated: false }
  writeFileSync(".starter/state.json", json(state))
  return state
}
function mutate(op: Operation, originalBytes: unknown) {
  if (op.keep === true) return
  const original =
    originalBytes === null ? null : digest(Buffer.from(string(originalBytes), "base64"))
  const planned = op.text === null ? null : digest(op.text)
  if (current(op.path) !== original && current(op.path) !== planned)
    throw new Error(
      `File changed during partial apply: ${op.path}; review recovery before retrying`,
    )
  if (op.text === null) {
    if (existsSync(safe(op.path))) unlinkSync(safe(op.path))
  } else {
    mkdirSync(dirname(safe(op.path)), { recursive: true })
    writeFileSync(safe(op.path), op.text)
  }
}
export function applyOperations(state: State) {
  if (state.mutated) return
  const originals = object(parseObject(readFileSync(state.backup, "utf8")).files)
  for (; state.next < state.ops.length; state.next++) {
    const op = state.ops[state.next]
    mutate(op, originals[op.path])
    writeFileSync(".starter/state.json", json({ ...state, next: state.next + 1 }))
  }
  state.mutated = true
  writeFileSync(".starter/state.json", json(state))
}
