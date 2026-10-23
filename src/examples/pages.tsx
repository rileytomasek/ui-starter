import { useRef } from "react"
import { useLocation, useNavigate } from "react-router"
import { PageContent, PageHeader, PageSection } from "@/components/page"
import { Markdown } from "@/components/markdown"
import { Badge } from "@/components/ui/badge"
import { ProjectForm } from "./project-form"
import { ProjectDialogs } from "./project-dialogs"
import { ProjectTable } from "./project-table"
import { projects, guide } from "./fixtures"
export function ExamplePage({
  kind,
  base,
}: {
  kind: "collection" | "detail" | "settings" | "reading"
  base: string
}) {
  const navigate = useNavigate(),
    location = useLocation(),
    params = new URLSearchParams(location.search),
    failed = useRef(false)
  const submit = async () => {
    await new Promise((resolve) => setTimeout(resolve, 350))
    if (params.get("scenario") === "failure" && !failed.current) {
      failed.current = true
      throw Error("Example service unavailable")
    }
  }
  if (kind === "collection")
    return (
      <PageContent>
        <PageHeader
          title="Projects"
          description="Research, design, and delivery across your workspace."
        />
        <ProjectTable
          rows={params.get("state") === "empty" ? [] : projects}
          loading={params.get("state") === "loading"}
          onOpen={(row) => navigate(`${base}/detail?id=${row.id}`)}
        />
      </PageContent>
    )
  if (kind === "settings")
    return (
      <PageContent width="form">
        <PageHeader
          title="Settings"
          description="Manage the project details, ownership, and review schedule."
          actions={<ProjectDialogs submit={submit} archive={submit} />}
        />
        <ProjectForm submit={submit} />
      </PageContent>
    )
  if (kind === "reading")
    return (
      <PageContent width="reading">
        <PageHeader
          title="Working guide"
          description="A practical reference for consistent research."
        />
        <Markdown source={guide} />
      </PageContent>
    )
  const project = projects.find((p) => p.id === params.get("id")) ?? projects[0]
  return (
    <PageContent>
      <PageHeader
        title={project.name}
        description="Research workspace · Project details"
        actions={<ProjectDialogs submit={submit} archive={submit} />}
      />
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="min-w-0 space-y-6 lg:col-span-2">
          <Markdown source={guide} variant="compact" />
        </div>
        <aside className="space-y-6">
          <PageSection title="Details">
            <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
              <dt className="text-muted-foreground">Status</dt>
              <dd>
                <Badge variant="secondary">{project.status}</Badge>
              </dd>
              <dt className="text-muted-foreground">Owner</dt>
              <dd>{project.owner}</dd>
              <dt className="text-muted-foreground">Records</dt>
              <dd className="tabular-nums">{project.records.toLocaleString("en-US")}</dd>
              <dt className="text-muted-foreground">Updated</dt>
              <dd>{project.updated}</dd>
            </dl>
          </PageSection>
        </aside>
      </div>
    </PageContent>
  )
}
