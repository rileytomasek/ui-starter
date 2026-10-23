import { useState } from "react"
import { ThemeControl } from "@/components/theme-control"
import { Button } from "@/components/ui/button"
export default function App() {
  const [saved, setSaved] = useState(false)
  return (
    <main className="mx-auto max-w-3xl space-y-4 px-6 py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Workspace</h1>
        <ThemeControl />
      </div>
      <p className="text-sm text-muted-foreground">Your application starts here.</p>
      <Button onClick={() => setSaved(true)}>Save changes</Button>
      <output className="block text-sm">{saved ? "Changes saved." : ""}</output>
    </main>
  )
}
