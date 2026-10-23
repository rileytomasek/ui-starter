import { Link, Route, Routes, useLocation } from "react-router"
import Table from "~icons/carbon/data-table"
import Document from "~icons/carbon/document"
import Settings from "~icons/carbon/settings"
import Book from "~icons/carbon/book"
import { HeaderShell, SidebarShell } from "@/components/shells"
import { PageContent, PageHeader, PageSection } from "@/components/page"
import type { Destination } from "@/app/navigation"
export default function ShellExamples() {
  const { pathname } = useLocation()
  const kind = pathname.includes("/sidebar/") ? "sidebar" : "header",
    base = `/__gallery/layouts/${kind}`,
    Shell = kind === "sidebar" ? SidebarShell : HeaderShell
  const destinations: Destination[] = [
    { title: "Projects", path: `${base}/collection`, icon: Table },
    { title: "Project details", path: `${base}/detail`, icon: Document },
    { title: "Settings", path: `${base}/settings`, icon: Settings },
    { title: "Guide", path: `${base}/reading`, icon: Book },
  ]
  return (
    <Shell name="Fieldnotes" destinations={destinations}>
      <Routes>
        {["collection", "detail", "settings", "reading"].map((page) => (
          <Route
            key={page}
            path={`${kind}/${page}`}
            element={
              <PageContent
                width={page === "reading" ? "reading" : page === "settings" ? "form" : "full"}
              >
                <PageHeader
                  title={
                    destinations[["collection", "detail", "settings", "reading"].indexOf(page)]
                      .title
                  }
                  description="A shared space for research and delivery."
                />
                <PageSection title="Page structure">
                  <p className="text-sm text-muted-foreground">
                    This layout will hold the complete {page} composition in the next phase.
                  </p>
                </PageSection>
                <div className="flex flex-wrap gap-4 text-sm">
                  <Link className="underline underline-offset-4" to="/__gallery/layouts">
                    All layouts
                  </Link>
                  <Link
                    className="underline underline-offset-4"
                    to={`/__gallery/layouts/${kind === "sidebar" ? "header" : "sidebar"}/${page}`}
                  >
                    View {kind === "sidebar" ? "header" : "sidebar"} shell
                  </Link>
                </div>
              </PageContent>
            }
          />
        ))}
      </Routes>
    </Shell>
  )
}
