import { flattenDestinations, type Destination } from "@/app/navigation"
import { Icon } from "@/components/icon"
import { useTheme } from "@/components/theme"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog"
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react"
import { useNavigate } from "react-router"
import Search from "~icons/carbon/search"
const Context = createContext<(() => void) | null>(null)
export function CommandProvider({
  destinations,
  children,
}: {
  destinations: Destination[]
  children: ReactNode
}) {
  const [open, setOpen] = useState(false),
    lastFocus = useRef<HTMLElement | null>(null)
  const show = useCallback(() => {
    lastFocus.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null
    setOpen(true)
  }, [])
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
    return () => {
      window.removeEventListener("keydown", handle)
    }
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
          <CommandOptions
            destinations={destinations}
            close={() => {
              setOpen(false)
            }}
          />
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

function CommandOptions({
  destinations,
  close,
}: {
  destinations: Destination[]
  close: () => void
}) {
  const navigate = useNavigate()
  const { setMode } = useTheme()
  return (
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
                close()
                void navigate(item.path)
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
                close()
              }}
            >
              Use {mode} appearance
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  )
}
