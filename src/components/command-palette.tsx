import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react"
import { useNavigate } from "react-router"
import Search from "~icons/carbon/search"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command"
import { Icon } from "@/components/icon"
import { useTheme } from "@/components/theme"
import { flattenDestinations, type Destination } from "@/app/navigation"
const Context = createContext<(() => void) | null>(null)
export function CommandProvider({
  destinations,
  children,
}: {
  destinations: Destination[]
  children: ReactNode
}) {
  const [open, setOpen] = useState(false),
    lastFocus = useRef<HTMLElement | null>(null),
    navigate = useNavigate(),
    { setMode } = useTheme()
  function show() {
    lastFocus.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null
    setOpen(true)
  }
  useEffect(() => {
    const handle = (event: KeyboardEvent) => {
      if (event.isComposing || event.repeat || event.altKey) return
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault()
        lastFocus.current =
          document.activeElement instanceof HTMLElement ? document.activeElement : null
        setOpen((value) => !value)
      }
    }
    window.addEventListener("keydown", handle)
    return () => window.removeEventListener("keydown", handle)
  }, [])
  return (
    <Context.Provider value={show}>
      {children}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent finalFocus={lastFocus} showCloseButton={false}>
          <div className="sr-only">
            <DialogTitle>Commands</DialogTitle>
            <DialogDescription>Find a page or change appearance.</DialogDescription>
          </div>
          <Command>
            <CommandInput placeholder="Search pages and actions…" />
            <CommandList>
              <CommandEmpty>No commands found.</CommandEmpty>
              <CommandGroup heading="Navigate">
                {flattenDestinations(destinations).map((item) => (
                  <CommandItem
                    key={item.path}
                    value={item.title}
                    onSelect={() => {
                      setOpen(false)
                      navigate(item.path)
                    }}
                  >
                    <Icon as={item.icon} />
                    {item.title}
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandGroup heading="Appearance">
                {(["light", "dark", "system"] as const).map((mode) => (
                  <CommandItem
                    key={mode}
                    onSelect={() => {
                      setMode(mode)
                      setOpen(false)
                    }}
                  >
                    Use {mode} appearance
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </DialogContent>
      </Dialog>
    </Context.Provider>
  )
}
export function CommandTrigger() {
  const show = useContext(Context)
  return (
    <Button variant="ghost" onClick={() => show?.()} aria-label="Search ⌘ / Ctrl K commands">
      <Icon as={Search} />
      <span className="hidden sm:inline">Search</span>
      <kbd aria-hidden="true" className="hidden text-xs text-muted-foreground sm:inline">
        ⌘ / Ctrl K
      </kbd>
    </Button>
  )
}
