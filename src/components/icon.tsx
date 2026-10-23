import type { ComponentType, SVGProps, ComponentProps } from "react"
import { cn } from "cn"
import { Button } from "@/components/ui/button"
export type SvgIcon = ComponentType<SVGProps<SVGSVGElement>>
const sizes = { sm: "size-3.5", md: "size-4", lg: "size-5" }
export function Icon({
  as: Svg,
  size = "md",
  label,
}: {
  as: SvgIcon
  size?: keyof typeof sizes
  label?: string
}) {
  return (
    <Svg
      className={cn("shrink-0", sizes[size])}
      aria-hidden={label ? undefined : true}
      aria-label={label}
      role={label ? "img" : undefined}
    />
  )
}
export function IconButton({
  icon,
  label,
  ...props
}: Omit<ComponentProps<typeof Button>, "children" | "aria-label"> & {
  icon: SvgIcon
  label: string
}) {
  return (
    <Button variant="ghost" size="icon" {...props} aria-label={label}>
      <Icon as={icon} />
    </Button>
  )
}
