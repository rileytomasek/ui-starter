import { readFileSync, writeFileSync, readdirSync } from "node:fs"
import { join } from "node:path"
import { icons } from "@iconify-json/carbon"
const mapping = {
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
function visit(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) visit(path)
    else if (/\.tsx?$/.test(path)) {
      const source = readFileSync(path, "utf8")
      const next = source.replace(
        /import\s*\{([^}]+)\}\s*from ["']lucide-react["'];?/gs,
        (_, names) =>
          names
            .split(",")
            .filter((n) => n.trim())
            .map((n) => {
              const name = n.trim(),
                icon = mapping[name]
              if (!icon || !icons.icons[icon])
                throw Error(
                  `Map and review Carbon equivalent for ${name} in scripts/carbon-icons.mjs`,
                )
              return `import ${name} from "~icons/carbon/${icon}"`
            })
            .join("\n"),
      )
      if (next !== source) writeFileSync(path, next)
    }
  }
}
visit("src/components/ui")
