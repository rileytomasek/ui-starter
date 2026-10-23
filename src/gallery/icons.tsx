import { Icon } from "@/components/icon"
import Add from "~icons/carbon/add"
import Download from "~icons/carbon/download"
import Search from "~icons/carbon/search"
import Mark from "~icons/local/mark"
export function Icons() {
  return (
    <section className="space-y-4">
      <h2 className="text-base font-medium">IBM Carbon</h2>
      <div className="flex items-center gap-6">
        <Icon as={Search} label="Search" />
        <Icon as={Add} label="Add" />
        <Icon as={Download} label="Download" />
        <Icon as={Mark} label="Custom SVG" />
      </div>
      <p className="mt-4 text-sm text-muted-foreground">
        Static React SVG imports, consistent dimensions, accessible controls.
      </p>
    </section>
  )
}
