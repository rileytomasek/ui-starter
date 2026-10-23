import Contrast from "~icons/carbon/contrast"
import { Icon } from "@/components/icon"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu"
import { useTheme, type ThemeMode } from "@/components/theme"
export function ThemeControl() {
  const { mode, setMode } = useTheme()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="ghost" size="icon" aria-label="Appearance" />}>
        <Icon as={Contrast} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuRadioGroup value={mode} onValueChange={(value) => setMode(value as ThemeMode)}>
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
