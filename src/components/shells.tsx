import { useEffect, useRef, useState, type ReactNode } from "react"
import { Link, NavLink, useLocation } from "react-router"
import Menu from "~icons/carbon/menu"
import { Icon, IconButton } from "@/components/icon"
import { ThemeControl } from "@/components/theme-control"
import { CommandProvider, CommandTrigger } from "@/components/command-palette"
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"
import type { Destination } from "@/app/navigation"
type Props = { name: string; destinations: Destination[]; children: ReactNode }
function RouteFocus() {
  const { pathname } = useLocation(),
    previous = useRef(pathname)
  useEffect(() => {
    if (previous.current !== pathname) {
      previous.current = pathname
      document.querySelector<HTMLElement>("main h1")?.focus()
      window.scrollTo(0, 0)
    }
  }, [pathname])
  return null
}
function Links({
  destinations,
  onNavigate,
}: {
  destinations: Destination[]
  onNavigate?: () => void
}) {
  return (
    <>
      {destinations.map((item) => (
        <NavLink end className="nav-link" key={item.path} to={item.path} onClick={onNavigate}>
          <Icon as={item.icon} />
          {item.title}
        </NavLink>
      ))}
    </>
  )
}
export function HeaderShell({ name, destinations, children }: Props) {
  const [mobile, setMobile] = useState(false)
  return (
    <CommandProvider destinations={destinations}>
      <RouteFocus />
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <header className="fixed inset-x-0 top-0 z-40 flex h-header items-center gap-4 border-b bg-background px-5">
        <Link className="text-sm font-semibold" to={destinations[0]?.path ?? "/"}>
          {name}
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          <Links destinations={destinations} />
        </nav>
        <div className="ml-auto flex items-center gap-1">
          <CommandTrigger />
          <ThemeControl />
          <div className="md:hidden">
            <Sheet open={mobile} onOpenChange={setMobile}>
              <SheetTrigger render={<IconButton icon={Menu} label="Open navigation" />} />
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>{name}</SheetTitle>
                  <SheetDescription>Navigate your workspace.</SheetDescription>
                </SheetHeader>
                <nav aria-label="Mobile" className="px-3">
                  <Links destinations={destinations} onNavigate={() => setMobile(false)} />
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
      <main id="main-content" className="min-w-0 pt-header">
        {children}
      </main>
    </CommandProvider>
  )
}
function SideNav({ name, destinations }: Omit<Props, "children">) {
  const { setOpenMobile } = useSidebar(),
    { pathname } = useLocation()
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton render={<Link to={destinations[0]?.path ?? "/"} />} tooltip={name}>
              <Icon as={destinations[0].icon} />
              <span className="font-semibold">{name}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <nav aria-label="Primary">
            <SidebarMenu>
              {destinations.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton
                    render={<Link to={item.path} />}
                    isActive={pathname === item.path}
                    aria-current={pathname === item.path ? "page" : undefined}
                    tooltip={item.title}
                    aria-label={item.title}
                    onClick={() => setOpenMobile(false)}
                  >
                    <Icon as={item.icon} />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                  {item.children && (
                    <SidebarMenuSub>
                      {item.children.map((child) => (
                        <SidebarMenuSubItem key={child.path}>
                          <SidebarMenuSubButton
                            render={<Link to={child.path} />}
                            isActive={pathname === child.path}
                            onClick={() => setOpenMobile(false)}
                          >
                            {child.title}
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </nav>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <ThemeControl />
      </SidebarFooter>
    </Sidebar>
  )
}
export function SidebarShell({ name, destinations, children }: Props) {
  const [open, setOpen] = useState(() => {
    try {
      return localStorage.getItem("app.sidebar") !== "collapsed"
    } catch {
      return true
    }
  })
  return (
    <CommandProvider destinations={destinations}>
      <RouteFocus />
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <SidebarProvider
        open={open}
        onOpenChange={(value) => {
          setOpen(value)
          try {
            localStorage.setItem("app.sidebar", value ? "expanded" : "collapsed")
          } catch {
            /* In-memory preference remains usable. */
          }
        }}
      >
        <SideNav name={name} destinations={destinations} />
        <div className="min-w-0 flex-1">
          <header className="flex h-header items-center justify-between border-b px-5">
            <SidebarTrigger />
            <CommandTrigger />
          </header>
          <main id="main-content" className="min-w-0">
            {children}
          </main>
        </div>
      </SidebarProvider>
    </CommandProvider>
  )
}
