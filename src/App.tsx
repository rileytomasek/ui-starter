import { appConfig } from "@/app/config"
import { destinations } from "@/app/navigation"
import { PageContent, PageHeader } from "@/components/page"
import { HeaderShell, SidebarShell } from "@/components/shells"
import { Button } from "@/components/ui/button"
import { useState } from "react"
export default function App() {
  const [saved, setSaved] = useState(false),
    Shell = appConfig.shell === "sidebar" ? SidebarShell : HeaderShell
  return (
    <Shell name={appConfig.name} destinations={destinations}>
      <PageContent>
        <PageHeader title={appConfig.name} description={appConfig.purpose} />
        <Button
          onClick={() => {
            setSaved(true)
          }}
        >
          Save changes
        </Button>
        <output className="block text-sm">{saved ? "Changes saved." : ""}</output>
      </PageContent>
    </Shell>
  )
}
