import { Markdown } from "@/components/markdown"
import { PageContent, PageHeader, PageSection } from "@/components/page"
import { Badge } from "@/components/ui/badge"
import { useRef } from "react"
import { useLocation, useNavigate } from "react-router"
import { guide, projects } from "./fixtures"
import { ProjectDialogs } from "./project-dialogs"
import { ProjectForm } from "./project-form"
import { ProjectTable } from "./project-table"
export function ExamplePage({
  kind,
  base,
}: {
  kind: "collection" | "detail" | "settings" | "reading"
  base: string
}) {
  const params = new URLSearchParams(useLocation().search)
  const submit = useExampleSubmit(params.get("scenario") === "failure")
  if (kind === "collection") return <CollectionPage base={base} params={params} />
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
          <ProjectDetails project={project} />
        </aside>
      </div>
    </PageContent>
  )
}

function CollectionPage({ base, params }: { base: string; params: URLSearchParams }) {
  const navigate = useNavigate()
  return (
    <PageContent>
      <PageHeader
        title="Projects"
        description="Research, design, and delivery across your workspace."
      />
      <ProjectTable
        rows={params.get("state") === "empty" ? [] : projects}
        loading={params.get("state") === "loading"}
        onOpen={(row) => {
          void navigate(`${base}/detail?id=${row.id}`)
        }}
      />
    </PageContent>
  )
}

function ProjectDetails({ project }: { project: (typeof projects)[number] }) {
  return (
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
  )
}

function useExampleSubmit(failure: boolean) {
  const failed = useRef(false)
  return async () => {
    await new Promise<void>((resolve) => {
      setTimeout(resolve, 350)
    })
    if (failure && !failed.current) {
      failed.current = true
      throw new Error("Example service unavailable")
    }
  }
}
