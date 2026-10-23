import { icons } from "@iconify-json/carbon"
import { readdirSync, readFileSync, writeFileSync } from "node:fs"
import { join } from "node:path"
const mapping: Record<string, string | undefined> = {
  CheckIcon: "checkmark",
  ChevronDownIcon: "chevron-down",
  ChevronLeftIcon: "chevron-left",
  ChevronRightIcon: "chevron-right",
  ChevronUpIcon: "chevron-up",
  CopyIcon: "copy",
  MoreHorizontalIcon: "overflow-menu-horizontal",
  PanelLeftIcon: "side-panel-open",
  SearchIcon: "search",
  XIcon: "close",
}
function carbonImport(input: string) {
  const name = input.trim()
  const icon = mapping[name]
  if (icon === undefined || !Object.hasOwn(icons.icons, icon))
    throw new Error(`Map and review Carbon equivalent for ${name} in scripts/carbon-icons.ts`)
  return `import ${name} from "~icons/carbon/${icon}"`
}
function normalize(path: string) {
  if (!/\.tsx?$/u.test(path)) return
  const source = readFileSync(path, "utf8")
  const next = source.replaceAll(
    /import\s*\{([^}]+)\}\s*from ["']lucide-react["'];?/gsu,
    (_: string, names: string) =>
      names
        .split(",")
        .filter((name) => name.trim() !== "")
        .map((name) => carbonImport(name))
        .join("\n"),
  )
  if (next !== source) writeFileSync(path, next)
}
function visit(dir: string) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) visit(path)
    else normalize(path)
  }
}
visit("src/components/ui")
