import assert from "node:assert/strict"
import { execFileSync, spawnSync } from "node:child_process"
import {
  cpSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readdirSync,
  readFileSync,
  symlinkSync,
  writeFileSync,
} from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { test } from "node:test"
import { object, parseObject, string } from "./data.ts"
import { digest } from "./manifest.ts"
const source = process.cwd()
function configure(root: string, gallery: boolean, examples: boolean) {
  const config = parseObject(readFileSync(join(root, ".starter/config.json"), "utf8"))
  Object.assign(config, {
    name: "Research desk",
    purpose: "Organize research notes.",
    users: "Researchers",
    packageName: "research-desk",
    shell: "header",
    routes: [
      { path: "/", title: "Notes", description: "Research notes and reviews." },
      { path: "/reviews", title: "Reviews", description: "Upcoming reviews." },
    ],
    retainGallery: gallery,
    retainExamples: examples,
  })
  writeFileSync(join(root, ".starter/config.json"), JSON.stringify(config, null, 2) + "\n")
  return config
}
function environment(root: string, real: boolean) {
  let env = process.env
  if (real) symlinkSync(join(source, "node_modules"), join(root, "node_modules"), "dir")
  else {
    const bin = join(root, ".test-bin")
    mkdirSync(bin)
    writeFileSync(
      join(bin, "pnpm"),
      `#!/usr/bin/env node\nimport fs from 'node:fs';if(process.argv[2]==='check'&&fs.existsSync('.fail-check'))process.exit(1)\n`,
      { mode: 0o755 },
    )
    env = { ...process.env, PATH: `${bin}:${process.env.PATH}` }
  }
  return env
}
function fixture({ gallery = false, examples = false, real = false } = {}) {
  const root = mkdtempSync(join(tmpdir(), "ui-setup-"))
  const ignored = new Set([
    ".git",
    "node_modules",
    "dist",
    "dist-gallery",
    ".vitest",
    "test-results",
    "playwright-report",
  ])
  for (const entry of readdirSync(source)) {
    if (!ignored.has(entry) && !entry.endsWith(".tsbuildinfo"))
      cpSync(join(source, entry), join(root, entry), { recursive: true })
  }
  const config = configure(root, gallery, examples)
  for (const args of [
    ["init", "-q"],
    ["add", "."],
    [
      "-c",
      "user.name=Setup Test",
      "-c",
      "user.email=setup@example.invalid",
      "commit",
      "-qm",
      "Consuming baseline",
    ],
  ])
    execFileSync("git", args, { cwd: root })
  const env = environment(root, real)
  const run = (flag = "--preview") =>
    spawnSync(process.execPath, [".starter/finalize.ts", flag], {
      cwd: root,
      env,
      encoding: "utf8",
      maxBuffer: 30 * 1024 * 1024,
    })
  const read = (p: string) => readFileSync(join(root, p), "utf8")
  const write = (p: string, s: string) => {
    writeFileSync(join(root, p), s)
  }
  return {
    root,
    config,
    run,
    read,
    write,
    save: () => {
      write(".starter/config.json", JSON.stringify(config, null, 2) + "\n")
    },
  }
}
void test("missing configuration fails without mutation; preview is non-mutating", () => {
  const f = fixture()
  const before = execFileSync("git", ["status", "--porcelain"], { cwd: f.root, encoding: "utf8" })
  let result = f.run()
  assert.equal(result.status, 0, result.stderr)
  assert.equal(existsSync(join(f.root, ".starter/state.json")), false)
  assert.equal(
    execFileSync("git", ["status", "--porcelain"], { cwd: f.root, encoding: "utf8" }),
    before,
  )
  f.config.purpose = ""
  f.save()
  result = f.run("--apply")
  assert.notEqual(result.status, 0)
  assert.match(result.stderr, /purpose/u)
  assert.ok(existsSync(join(f.root, "src/gallery/Gallery.tsx")))
})
void test("modified instructions require current-hash resolution; unrelated work survives", () => {
  const f = fixture()
  f.write("README.md", f.read("README.md") + "\nUser requirements.\n")
  f.write("unrelated.txt", "keep me")
  assert.notEqual(f.run("--apply").status, 0)
  object(f.config.resolutions)["README.md"] = {
    action: "remove",
    sha256: digest(f.read("README.md")),
  }
  f.save()
  const r = f.run("--apply")
  assert.equal(r.status, 0, r.stderr)
  assert.equal(f.read("unrelated.txt"), "keep me")
  assert.equal(existsSync(join(f.root, ".starter")), false)
  assert.equal(existsSync(join(f.root, "src/gallery")), false)
  assert.equal(existsSync(join(f.root, "src/examples")), false)
  assert.match(f.read("AGENTS.md"), /Research desk/u)
  assert.doesNotMatch(f.read("package.json"), /setup:finalize/u)
  const backups = readdirSync(join(f.root, ".git/app-setup-backups"))
  const backup = parseObject(f.read(`.git/app-setup-backups/${backups[0]}`))
  assert.match(
    Buffer.from(string(object(backup.files)["README.md"]), "base64").toString(),
    /User requirements/u,
  )
})
void test("retention and failed verification preserve tools; retry preserves app fixes", () => {
  const f = fixture({ gallery: true, examples: true })
  f.write(".fail-check", "yes")
  let r = f.run("--apply")
  assert.notEqual(r.status, 0)
  assert.ok(existsSync(join(f.root, ".starter/finalize.ts")))
  assert.match(f.read("package.json"), /setup:finalize/u)
  f.write("src/App.tsx", f.read("src/App.tsx") + "\n// App-specific repair survives retry.\n")
  execFileSync(process.execPath, ["-e", "require('node:fs').unlinkSync('.fail-check')"], {
    cwd: f.root,
  })
  r = f.run("--apply")
  assert.equal(r.status, 0, r.stderr)
  assert.match(f.read("src/App.tsx"), /repair survives/u)
  assert.ok(existsSync(join(f.root, "src/gallery/Gallery.tsx")))
  assert.ok(existsSync(join(f.root, "src/examples/project-form.tsx")))
})
void test("migrate requires an existing acknowledged destination; symlinks are rejected", () => {
  const f = fixture()
  f.write("README.md", f.read("README.md") + "\nApp constraint.\n")
  f.write("docs/app-notes.md", "App constraint.\n")
  object(f.config.resolutions)["README.md"] = {
    action: "migrate",
    sha256: digest(f.read("README.md")),
    to: "../outside",
    targetSha256: digest(f.read("docs/app-notes.md")),
  }
  f.save()
  assert.notEqual(f.run().status, 0)
  object(object(f.config.resolutions)["README.md"]).to = "docs/app-notes.md"
  f.save()
  assert.equal(f.run().status, 0)
  const other = fixture()
  execFileSync(
    process.execPath,
    [
      "-e",
      "const fs=require('node:fs');fs.unlinkSync('README.md');fs.symlinkSync('LICENSE','README.md')",
    ],
    { cwd: other.root },
  )
  assert.match(other.run().stderr, /Symlink/u)
})

void test("grouped primitives and recipes survive removal of examples and their tests", () => {
  const f = fixture()
  const result = f.run("--apply")
  assert.equal(result.status, 0, result.stderr)
  for (const name of ["input-group", "toggle-group", "button-group", "tabs"])
    assert.ok(existsSync(join(f.root, `src/components/ui/${name}.tsx`)))
  assert.equal(existsSync(join(f.root, "tests/e2e/grouped-controls.spec.ts")), false)
  assert.match(f.read("docs/components.md"), /## Compact grouped controls/u)
  assert.doesNotMatch(f.read("docs/components.md"), /src\/examples|__gallery/u)
})
