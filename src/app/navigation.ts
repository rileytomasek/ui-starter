import type { SvgIcon } from "@/components/icon"
import Home from "~icons/carbon/home"
export type Destination = { title: string; path: string; icon: SvgIcon; children?: Destination[] }
export const destinations: Destination[] = [{ title: "Overview", path: "/", icon: Home }]
export function flattenDestinations(items: Destination[]): Destination[] {
  return items.flatMap((item) => [item, ...flattenDestinations(item.children ?? [])])
}
