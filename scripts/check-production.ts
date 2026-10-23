import { readFileSync, readdirSync } from "node:fs"
const js = readdirSync("dist/assets")
  .filter((f) => f.endsWith(".js"))
  .map((f) => readFileSync(`dist/assets/${f}`, "utf8"))
  .join("\n")
for (const marker of ["Interface foundations", "Find examples", "/__gallery/"])
  if (js.includes(marker)) throw new Error(`Gallery leaked into production: ${marker}`)
console.log("Production bundle excludes gallery routes and modules")
