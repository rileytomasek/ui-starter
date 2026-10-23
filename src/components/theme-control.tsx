import { Icon } from "@/components/icon"
import { useTheme } from "@/components/theme"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Contrast from "~icons/carbon/contrast"
export function ThemeControl() {
  const { mode, setMode } = useTheme()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="ghost" size="icon" aria-label="Appearance" />}>
        <Icon as={Contrast} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuRadioGroup
          value={mode}
          onValueChange={(value: unknown) => {
            if (value === "light" || value === "dark" || value === "system") setMode(value)
          }}
        >
          {(["light", "dark", "system"] as const).map((value) => (
            <DropdownMenuRadioItem key={value} value={value}>
              {value[0].toUpperCase() + value.slice(1)}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
