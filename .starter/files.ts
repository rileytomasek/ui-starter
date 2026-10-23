import { execFileSync, spawnSync } from "node:child_process"
import { existsSync, lstatSync, readdirSync, readFileSync, rmdirSync } from "node:fs"
import { dirname, isAbsolute, resolve } from "node:path"
import { digest } from "./manifest.ts"
export const root = process.cwd()
export function safe(path: string): string {
  if (
    path === "" ||
    isAbsolute(path) ||
    path.split("/").some((part) => ["..", ".", ""].includes(part)) ||
    path.startsWith(".git/")
  )
    throw new Error(`Unsafe path: ${path}`)
  const full = resolve(root, path)
  for (let part = full; part !== root; part = dirname(part)) {
    if (existsSync(part) && lstatSync(part).isSymbolicLink())
      throw new Error(`Symlink not allowed: ${path}`)
  }
  if (!full.startsWith(root + "/")) throw new Error(`Path escapes repository: ${path}`)
  return full
}
export const read = (path: string) => readFileSync(safe(path), "utf8")
export const current = (path: string) =>
  existsSync(safe(path)) ? digest(readFileSync(safe(path))) : null
export function run(command: string, args: string[]) {
  console.log(`> ${command} ${args.join(" ")}`)
  const result = spawnSync(command, args, { cwd: root, stdio: "inherit" })
  if (result.status !== 0)
    throw new Error(
      `Verification failed: ${command} ${args.join(" ")}. Fix the failure and rerun pnpm setup:finalize --apply; tooling remains available.`,
    )
}
export function pruneEmpty(dir: string) {
  if (!existsSync(dir)) return
  for (const child of readdirSync(dir, { withFileTypes: true })) {
    if (child.isDirectory()) pruneEmpty(`${dir}/${child.name}`)
  }
  if (readdirSync(dir).length === 0) rmdirSync(dir)
}
export function verifyRepository() {
  if (execFileSync("git", ["rev-parse", "--show-toplevel"], { encoding: "utf8" }).trim() !== root)
    throw new Error("Run from the repository root")
  execFileSync("git", ["rev-parse", "HEAD"], { stdio: "ignore" })
  if (existsSync("node_modules") && lstatSync("node_modules").isSymbolicLink())
    throw new Error("Use a normal local dependency install; node_modules must not be a symlink")
}
export function verifyOrigin() {
  let origin = ""
  try {
    origin = execFileSync("git", ["remote", "get-url", "origin"], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim()
  } catch {
    /* A consuming repository may not have a remote. */
  }
  if (/rileytomasek[/:]ui-starter(?:\.git)?$/u.test(origin))
    throw new Error(
      "Do not finalize the upstream repository. Create a consuming copy with its own origin (or no origin).",
    )
}
