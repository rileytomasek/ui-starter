import type { Destination } from "@/app/navigation"
import { HeaderShell, SidebarShell } from "@/components/shells"
import { ExamplePage } from "@/examples/pages"
import { Link, Route, Routes, useLocation } from "react-router"
import Book from "~icons/carbon/book"
import Table from "~icons/carbon/data-table"
import Document from "~icons/carbon/document"
import Settings from "~icons/carbon/settings"
export default function ShellExamples() {
  const { pathname } = useLocation()
  const kind = pathname.includes("/sidebar/") ? "sidebar" : "header"
  const base = `/__gallery/layouts/${kind}`
  const Shell = kind === "sidebar" ? SidebarShell : HeaderShell
  const destinations: Destination[] = [
    {
      title: "Projects",
      path: `${base}/collection`,
      icon: Table,
      children: [{ title: "Project details", path: `${base}/detail`, icon: Document }],
    },
    { title: "Settings", path: `${base}/settings`, icon: Settings },
    { title: "Guide", path: `${base}/reading`, icon: Book },
  ]
  return (
    <Shell name="Fieldnotes" destinations={destinations}>
      <Routes>
        {(["collection", "detail", "settings", "reading"] as const).map((page) => (
          <Route
            key={page}
            path={`${kind}/${page}`}
            element={<ExamplePage kind={page} base={base} />}
          />
        ))}
      </Routes>
      <footer className="mx-auto flex max-w-7xl flex-wrap gap-4 px-5 pb-6 text-xs text-muted-foreground">
        <Link className="underline underline-offset-4" to="/__gallery/layouts">
          All layouts
        </Link>
        <Link
          className="underline underline-offset-4"
          to={`/__gallery/layouts/${kind === "sidebar" ? "header" : "sidebar"}/collection`}
        >
          View {kind === "sidebar" ? "header" : "sidebar"} shell
        </Link>
      </footer>
    </Shell>
  )
}
