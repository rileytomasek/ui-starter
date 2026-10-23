import { Markdown } from "@/components/markdown"
import { PageSection } from "@/components/page"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { guide } from "./fixtures"
import type { ProjectRow } from "./project-table-model"

export function ProjectDetailTabs({ project }: { project: ProjectRow }) {
  return (
    <Tabs defaultValue="overview">
      <TabsList aria-label="Project information">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="guide">Research guide</TabsTrigger>
      </TabsList>
      <TabsContent className="mt-4" value="overview">
        <div className="grid gap-8 lg:grid-cols-3">
          <p className="text-sm text-muted-foreground lg:col-span-2">
            {project.owner} owns this workspace. Review its status and records before planning the
            next research session.
          </p>
          <aside>
            <ProjectDetails project={project} />
          </aside>
        </div>
      </TabsContent>
      <TabsContent className="mt-4" value="guide">
        <Markdown source={guide} variant="compact" />
      </TabsContent>
    </Tabs>
  )
}

function ProjectDetails({ project }: { project: ProjectRow }) {
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
