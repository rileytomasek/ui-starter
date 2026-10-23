import {
  readFileSync,
  writeFileSync,
  existsSync,
  lstatSync,
  mkdirSync,
  unlinkSync,
  rmdirSync,
  readdirSync,
} from "node:fs"
import { resolve, dirname, isAbsolute } from "node:path"
import { execFileSync, spawnSync } from "node:child_process"
import { randomUUID } from "node:crypto"
import { digest, files } from "./manifest.mjs"
import { replacements, json } from "./templates.mjs"
const root = process.cwd()
const read = (p) => readFileSync(safe(p), "utf8")
function safe(p) {
  if (
    typeof p !== "string" ||
    !p ||
    isAbsolute(p) ||
    p.split("/").some((x) => x === ".." || x === "." || !x) ||
    p.startsWith(".git/")
  )
    throw Error(`Unsafe path: ${p}`)
  const full = resolve(root, p)
  for (let part = full; part !== root; part = dirname(part))
    if (existsSync(part) && lstatSync(part).isSymbolicLink())
      throw Error(`Symlink not allowed: ${p}`)
  if (!full.startsWith(root + "/")) throw Error(`Path escapes repository: ${p}`)
  return full
}
const current = (p) => (existsSync(safe(p)) ? digest(readFileSync(safe(p))) : null)
const run = (command, args) => {
  console.log(`> ${command} ${args.join(" ")}`)
  const result = spawnSync(command, args, { cwd: root, stdio: "inherit" })
  if (result.status !== 0)
    throw Error(
      `Verification failed: ${command} ${args.join(" ")}. Fix the failure and rerun pnpm setup:finalize --apply; tooling remains available.`,
    )
}
function validate(c) {
  for (const k of ["name", "purpose", "users", "packageName"])
    if (typeof c[k] !== "string" || !c[k].trim() || /[\r\n]/.test(c[k]))
      throw Error(`Set a non-empty, single-line ${k} in .starter/config.json`)
  if (
    !/^(?:@[a-z0-9][a-z0-9-]*\/)?[a-z0-9][a-z0-9-]*$/.test(c.packageName) ||
    c.packageName === "ui-starter"
  )
    throw Error("Use an app-specific npm packageName")
  if (!["header", "sidebar"].includes(c.shell)) throw Error("Choose shell: header or sidebar")
  for (const key of ["colors", "fonts", "density", "radius", "icons"])
    if (typeof c.visual?.[key] !== "string" || !c.visual[key].trim())
      throw Error(`Record visual.${key}`)
  if (typeof c.retainGallery !== "boolean" || typeof c.retainExamples !== "boolean")
    throw Error("Choose explicit retainGallery and retainExamples booleans")
  if (c.retainGallery && !c.retainExamples)
    throw Error(
      "Gallery references examples: retainExamples must be true when retainGallery is true",
    )
  if (!Array.isArray(c.routes) || !c.routes.length || c.routes[0].path !== "/")
    throw Error("Provide routes with the first path / for the home page")
  const paths = new Set()
  for (const route of c.routes) {
    if (
      !/^\/(?:[a-z0-9-]+(?:\/[a-z0-9-]+)*)?$/.test(route.path) ||
      route.path.startsWith("/__") ||
      paths.has(route.path)
    )
      throw Error(`Invalid or duplicate route: ${route.path}`)
    paths.add(route.path)
    for (const key of ["title", "description"])
      if (typeof route[key] !== "string" || !route[key].trim())
        throw Error(`Set route ${route.path} ${key}`)
  }
  if (!c.resolutions || typeof c.resolutions !== "object" || Array.isArray(c.resolutions))
    throw Error("resolutions must be an object")
}
function pruneEmpty(dir) {
  if (!existsSync(dir)) return
  for (const child of readdirSync(dir, { withFileTypes: true }))
    if (child.isDirectory()) pruneEmpty(`${dir}/${child.name}`)
  if (!readdirSync(dir).length) rmdirSync(dir)
}
try {
  const args = process.argv.slice(2)
  if (
    args.some((arg) => !["--preview", "--apply"].includes(arg)) ||
    new Set(args).size !== args.length ||
    args.length > 1
  )
    throw Error("Use pnpm setup:finalize --preview or --apply")
  const apply = args.includes("--apply")
  if (execFileSync("git", ["rev-parse", "--show-toplevel"], { encoding: "utf8" }).trim() !== root)
    throw Error("Run from the repository root")
  execFileSync("git", ["rev-parse", "HEAD"], { stdio: "ignore" })
  if (existsSync("node_modules") && lstatSync("node_modules").isSymbolicLink())
    throw Error("Use a normal local dependency install; node_modules must not be a symlink")
  const config = JSON.parse(read(".starter/config.json"))
  validate(config)
  const configHash = digest(json({ ...config, resolutions: undefined }))
  let state = existsSync(".starter/state.json") ? JSON.parse(read(".starter/state.json")) : null
  if (state && state.configHash !== configHash)
    throw Error(
      "Setup choices changed during a pending finalization. Restore from the recorded backup before changing choices.",
    )
  const manifest = JSON.parse(read(".starter/manifest.json"))
  let ops = state?.ops
  if (!state) {
    const writes = replacements(config, read)
    const deletes = Object.keys(manifest).filter(
      (p) =>
        p.startsWith("docs/starter/") ||
        p === "docs/implementation.md" ||
        (!config.retainGallery &&
          (p.startsWith("src/gallery/") ||
            ["tests/e2e/forms.spec.ts", "tests/e2e/shells.spec.ts"].includes(p))) ||
        (!config.retainExamples && p.startsWith("src/examples/")),
    )
    for (const p of [...files("docs/starter"), ...files(".starter")])
      if (!(p in manifest) && ![".starter/manifest.json", ".starter/state.json"].includes(p))
        throw Error(
          `Unlisted temporary file ${p}; migrate it outside temporary directories before finalization`,
        )
    if (!config.retainExamples) {
      const pkg = JSON.parse(writes["package.json"])
      const codeFiles = [...files("src"), ...files("scripts"), ...files("tests")].filter(
        (p) => /\.(?:tsx?|mjs)$/.test(p) && !deletes.includes(p),
      )
      const remaining = codeFiles.map((p) => writes[p] ?? read(p)).join("\n")
      const removed = []
      for (const dep of [
        "@hookform/resolvers",
        "react-hook-form",
        "zod",
        "@tanstack/react-table",
      ]) {
        if (!remaining.includes(`"${dep}`) && !remaining.includes(`'${dep}`)) {
          delete pkg.dependencies[dep]
          removed.push(dep)
        }
      }
      writes["package.json"] = json(pkg)
      let vite = read("vite.config.ts")
      for (const dep of removed)
        vite = vite.replace(
          new RegExp(`^\\s*"${dep.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(?:/[^"]*)?",?\\n`, "gm"),
          "",
        )
      writes["vite.config.ts"] = vite
    }
    ops = [
      ...Object.entries(writes).map(([path, text]) => ({ path, text })),
      ...deletes.map((path) => ({ path, text: null })),
    ]
    const conflicts = []
    for (const op of ops) {
      safe(op.path)
      if (!(op.path in manifest)) throw Error(`Transformation missing from manifest: ${op.path}`)
      const hash = current(op.path)
      if (hash !== manifest[op.path]) {
        const resolution = config.resolutions[op.path]
        if (!resolution || resolution.sha256 !== hash) {
          conflicts.push({
            path: op.path,
            sha256: hash,
            actions: "keep (retained files only), migrate, remove",
          })
          continue
        }
        if (resolution.action === "keep") {
          if (op.path.startsWith("docs/starter/") || op.path === "docs/implementation.md")
            throw Error(
              `Migrate enduring content from ${op.path}; temporary instructions cannot remain active`,
            )
          if (
            op.text === null &&
            ((op.path.startsWith("src/examples/") && !config.retainExamples) ||
              (op.path.startsWith("src/gallery/") && !config.retainGallery))
          )
            throw Error(`Set the matching retention choice to keep ${op.path}`)
          op.keep = true
        } else if (resolution.action === "migrate") {
          const target = resolution.to
          safe(target)
          if (
            target.startsWith(".starter/") ||
            target.startsWith("docs/starter/") ||
            ops.some((o) => o.path === target) ||
            !existsSync(target) ||
            current(target) !== resolution.targetSha256
          )
            throw Error(
              `Migrate ${op.path} into an existing retained file, then record to and targetSha256`,
            )
        } else if (resolution.action !== "remove")
          throw Error(`Unknown conflict resolution for ${op.path}`)
      }
    }
    // The lockfile is regenerated, not replaced from a stale template.
    if (
      current("pnpm-lock.yaml") !== manifest["pnpm-lock.yaml"] &&
      config.resolutions["pnpm-lock.yaml"]?.sha256 !== current("pnpm-lock.yaml")
    )
      conflicts.push({
        path: "pnpm-lock.yaml",
        sha256: current("pnpm-lock.yaml"),
        actions: "keep; pnpm reconciles the lockfile",
      })
    if (conflicts.length)
      throw Error(
        `Modified-file conflicts; record an explicit resolution and current hash in .starter/config.json:\n${json(conflicts)}`,
      )
  }
  console.log(
    json({
      mode: apply ? "apply" : "preview",
      app: config.name,
      operations: ops.map((op) => ({
        path: op.path,
        action: op.keep ? "keep" : op.text === null ? "remove" : "write",
        ...(op.text === null || op.keep ? {} : { content: op.text }),
      })),
      lockfile: "pnpm install --ignore-scripts",
      verification: ["format generated files", "pnpm check", "pnpm test:e2e"],
      afterSuccess:
        "remove only manifest-listed .starter files and setup scripts; retain backup in Git metadata",
    }),
  )
  if (!apply) process.exit(0)
  let origin = ""
  try {
    origin = execFileSync("git", ["remote", "get-url", "origin"], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim()
  } catch {
    /* A local consuming repository may not yet have a remote. */
  }
  if (/rileytomasek[/:]ui-starter(?:\.git)?$/.test(origin))
    throw Error(
      "Do not finalize the upstream repository. Create a consuming copy with its own origin (or no origin).",
    )
  if (!state) {
    const gitDir = execFileSync("git", ["rev-parse", "--absolute-git-dir"], {
      encoding: "utf8",
    }).trim()
    const backup = resolve(gitDir, "app-setup-backups", `${randomUUID()}.json`)
    const paths = [...new Set([...ops.map((o) => o.path), ...files(".starter"), "pnpm-lock.yaml"])]
    const originals = Object.fromEntries(
      paths.map((p) => [p, existsSync(safe(p)) ? readFileSync(safe(p)).toString("base64") : null]),
    )
    mkdirSync(dirname(backup), { recursive: true })
    writeFileSync(
      backup,
      json({
        root,
        head: execFileSync("git", ["rev-parse", "HEAD"], { encoding: "utf8" }).trim(),
        files: originals,
      }),
      { flag: "wx" },
    )
    state = { configHash, backup, ops, next: 0, mutated: false }
    writeFileSync(".starter/state.json", json(state))
  }
  console.log(
    `Recovery backup: ${state.backup}. See .starter/RECOVERY.md for recovery; do not reset unrelated work.`,
  )
  for (const op of state.ops) {
    safe(op.path)
    if (!(op.path in manifest)) throw Error(`Unexpected resumed operation: ${op.path}`)
  }
  if (!state.mutated) {
    const originals = JSON.parse(readFileSync(state.backup, "utf8")).files
    for (; state.next < state.ops.length; state.next++) {
      const op = state.ops[state.next]
      if (!op.keep) {
        const original =
          originals[op.path] === null ? null : digest(Buffer.from(originals[op.path], "base64"))
        const planned = op.text === null ? null : digest(op.text)
        if (current(op.path) !== original && current(op.path) !== planned)
          throw Error(
            `File changed during partial apply: ${op.path}; review recovery before retrying`,
          )
        if (op.text === null) {
          if (existsSync(safe(op.path))) unlinkSync(safe(op.path))
        } else {
          mkdirSync(dirname(safe(op.path)), { recursive: true })
          writeFileSync(safe(op.path), op.text)
        }
      }
      writeFileSync(".starter/state.json", json({ ...state, next: state.next + 1 }))
    }
    state.mutated = true
    writeFileSync(".starter/state.json", json(state))
  }
  const pendingFormatter = JSON.parse(read(".oxfmtrc.json"))
  if (!pendingFormatter.ignorePatterns.includes(".starter/state.json"))
    pendingFormatter.ignorePatterns.push(".starter/state.json")
  writeFileSync(".oxfmtrc.json", json(pendingFormatter))
  const pendingPackage = JSON.parse(read("package.json"))
  pendingPackage.scripts["setup:finalize"] = "node .starter/finalize.mjs"
  writeFileSync("package.json", json(pendingPackage))
  run("pnpm", ["install", "--ignore-scripts"])
  run("pnpm", [
    "exec",
    "oxfmt",
    "--write",
    ...state.ops.filter((o) => o.text !== null && !o.keep).map((o) => o.path),
    ".starter/config.json",
  ])
  for (const p of ["README.md", "AGENTS.md", ...files("docs").filter((p) => p.endsWith(".md"))])
    if (/(?:docs\/)?starter\//.test(read(p)))
      throw Error(`Stale temporary documentation link in ${p}; migrate it before retrying`)
  for (const p of ["README.md", "AGENTS.md"])
    if (!read(p).includes(config.name) || !read(p).includes(config.purpose))
      throw Error(`${p} must describe the configured app name and purpose`)
  if (
    !read("AGENTS.md").includes("shadcn") ||
    !read("AGENTS.md").includes("interface-design/SKILL.md")
  )
    throw Error("AGENTS.md must retain shadcn installation and design-skill instructions")
  run("pnpm", ["check"])
  run("pnpm", ["test:e2e"])
  // Success is reached only after the resulting app passes checks. Remove the
  // one-off files last; no other directory is deleted recursively.
  const finalPackage = JSON.parse(read("package.json"))
  for (const key of ["setup:finalize", "setup:baseline", "test:setup"])
    delete finalPackage.scripts[key]
  writeFileSync("package.json", json(finalPackage))
  const finalFormatter = JSON.parse(read(".oxfmtrc.json"))
  finalFormatter.ignorePatterns = finalFormatter.ignorePatterns.filter(
    (p) => p !== ".starter/state.json",
  )
  writeFileSync(".oxfmtrc.json", json(finalFormatter))
  run("pnpm", ["exec", "oxfmt", "--write", "package.json", ".oxfmtrc.json"])
  for (const p of [
    ...Object.keys(manifest).filter((p) => p.startsWith(".starter/")),
    ".starter/manifest.json",
    ".starter/state.json",
  ])
    if (existsSync(safe(p))) unlinkSync(safe(p))
  for (const dir of [".starter", "docs/starter", "src/gallery", "src/examples"]) pruneEmpty(dir)
  console.log(
    `Finalized ${config.name}. Review git diff and commit. Setup commands are now removed. Recovery bytes remain at ${state.backup}.`,
  )
} catch (error) {
  console.error(error.message)
  process.exitCode = 1
}
