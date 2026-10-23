import { ThemeControl } from "@/components/theme-control"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Link, NavLink, Route, Routes, useLocation } from "react-router"
import ShellExamples from "./ShellExamples"
import { Components, Theme, Typography, Usage } from "./foundations"
import { Icons } from "./icons"
const sections = [
  { title: "Theme", keywords: "colors tokens radius density shadows", path: "theme" },
  { title: "Typography", keywords: "typeset fonts prose", path: "typography" },
  { title: "Components", keywords: "button input disabled combobox", path: "components" },
  {
    title: "Patterns",
    keywords: "forms data table markdown code date picker dialog confirmation",
    path: "patterns",
  },
  {
    title: "Layouts",
    keywords: "sidebar header collection detail settings reading command palette",
    path: "layouts",
  },
  { title: "Icons", keywords: "carbon svg iconify", path: "icons" },
]
export default function Gallery() {
  const { pathname } = useLocation()
  if (
    pathname.startsWith("/__gallery/layouts/header/") ||
    pathname.startsWith("/__gallery/layouts/sidebar/")
  )
    return (
      <Routes>
        <Route path="layouts/*" element={<ShellExamples />} />
      </Routes>
    )
  return (
    <>
      <a className="skip-link" href="#gallery-content">
        Skip to content
      </a>
      <header className="flex h-header items-center justify-between border-b px-5">
        <span className="text-sm font-semibold">UI reference</span>
        <ThemeControl />
      </header>
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-6 md:grid-cols-5">
        <GalleryNavigation />
        <main id="gallery-content" className="min-w-0 space-y-8 md:col-span-4">
          <div>
            <h1 className="text-xl font-semibold">Interface foundations</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Theme, typography, controls, and complete compositions.
            </p>
          </div>
          <GalleryRoutes />
          <Usage />
          <footer className="border-t pt-4 text-xs text-muted-foreground">
            Usage and source map: docs/development.md; component recipes: docs/components.md
          </footer>
        </main>
      </div>
    </>
  )
}

function Patterns() {
  return (
    <div className="space-y-4">
      <h2 className="text-base font-medium">Complete examples</h2>
      <ul className="space-y-3 text-sm">
        {[
          { name: "Data table", path: "collection" },
          { name: "Empty collection", path: "collection?state=empty" },
          { name: "Loading collection", path: "collection?state=loading" },
          { name: "Full form", path: "settings" },
          { name: "Submission failure and retry", path: "settings?scenario=failure" },
          { name: "Markdown and code", path: "reading" },
          { name: "Record details", path: "detail" },
        ].map((item) => (
          <li key={item.path}>
            <Link
              className="underline underline-offset-4"
              to={`/__gallery/layouts/header/${item.path}`}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

function Layouts() {
  return (
    <div className="space-y-4">
      <h2 className="text-base font-medium">Page shells</h2>
      <p className="text-sm text-muted-foreground">
        Inspect the same pages with either navigation structure.
      </p>
      <div className="flex gap-4 text-sm">
        <Link className="underline underline-offset-4" to="/__gallery/layouts/header/collection">
          Fixed header
        </Link>
        <Link className="underline underline-offset-4" to="/__gallery/layouts/sidebar/collection">
          Sidebar
        </Link>
      </div>
    </div>
  )
}

function GalleryRoutes() {
  return (
    <Routes>
      <Route path="theme" element={<Theme />} />
      <Route path="typography" element={<Typography />} />
      <Route path="components" element={<Components />} />
      <Route path="icons" element={<Icons />} />
      <Route path="patterns" element={<Patterns />} />
      <Route path="layouts" element={<Layouts />} />
      <Route
        path="*"
        element={<p className="text-sm text-muted-foreground">Choose an example to inspect.</p>}
      />
    </Routes>
  )
}

function GalleryNavigation() {
  const [search, setSearch] = useState("")
  return (
    <aside className="space-y-3">
      <Input
        aria-label="Find examples"
        placeholder="Find examples…"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value)
        }}
      />
      <nav aria-label="UI examples" className="flex flex-wrap gap-1 md:flex-col">
        {sections
          .filter((s) => `${s.title} ${s.keywords}`.toLowerCase().includes(search.toLowerCase()))
          .map((s) => (
            <NavLink className="nav-link" key={s.path} to={`/__gallery/${s.path}`}>
              {s.title}
            </NavLink>
          ))}
      </nav>
      {search &&
        !sections.some((s) =>
          `${s.title} ${s.keywords}`.toLowerCase().includes(search.toLowerCase()),
        ) && <p className="text-sm text-muted-foreground">No examples found.</p>}
    </aside>
  )
}
