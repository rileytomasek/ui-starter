import { useState } from "react"
import { NavLink, Route, Routes } from "react-router"
import Search from "~icons/carbon/search"
import Add from "~icons/carbon/add"
import Download from "~icons/carbon/download"
import Mark from "~icons/local/mark"
import { Icon, IconButton } from "@/components/icon"
import { ThemeControl } from "@/components/theme-control"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  CodeBlock,
  CodeBlockHeader,
  CodeBlockTitle,
  CodeBlockActions,
  CodeBlockCopyButton,
  CodeBlockContent,
} from "@/components/ui/code-block"
import { Badge } from "@/components/ui/badge"
const sections = ["Theme", "Typography", "Components", "Patterns", "Layouts", "Icons"]
const usage =
  'import { Button } from "@/components/ui/button"\n\n<Button size="sm" variant="outline">Save changes</Button>'
function Usage() {
  return (
    <section className="space-y-3">
      <h2 className="text-base font-medium">Use the shared components</h2>
      <CodeBlock>
        <CodeBlockHeader>
          <CodeBlockTitle>src/components/ui/button.tsx</CodeBlockTitle>
          <CodeBlockActions>
            <CodeBlockCopyButton value={usage} />
          </CodeBlockActions>
        </CodeBlockHeader>
        <CodeBlockContent>{usage}</CodeBlockContent>
      </CodeBlock>
      <p className="text-xs text-muted-foreground">
        Change tokens in src/index.css. Add variants in the installed component. Use docs/ui.md for
        examples and verification.
      </p>
    </section>
  )
}
function Example({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-4">
      <h2 className="text-base font-medium">{title}</h2>
      {children}
    </section>
  )
}
function Theme() {
  return (
    <div className="space-y-10">
      <Example title="Semantic colors">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { name: "Background", style: "bg-background text-foreground" },
            { name: "Muted", style: "bg-muted text-muted-foreground" },
            { name: "Primary", style: "bg-primary text-primary-foreground" },
            { name: "Accent", style: "bg-accent text-accent-foreground" },
          ].map((token) => (
            <div key={token.name}>
              <div className={token.style}>
                <p className="p-5 text-sm">Aa</p>
              </div>
              <p className="mt-2 text-sm">{token.name}</p>
            </div>
          ))}
        </div>
      </Example>
      <Example title="Controls and surfaces">
        <div className="flex flex-wrap items-center gap-3">
          <Button>Save changes</Button>
          <Button variant="outline">Cancel</Button>
          <Button variant="ghost">View details</Button>
          <Badge variant="secondary">In review</Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          Neutral surfaces keep attention on content. Shared tokens apply in both themes.
        </p>
      </Example>
    </div>
  )
}
function Typography() {
  return (
    <div className="grid gap-10 lg:grid-cols-2">
      <Example title="Compact">
        <article className="typeset typeset-compact">
          <h3>Release notes</h3>
          <p>
            Changes are grouped by what they help you do. Useful details stay close to the work.
          </p>
          <ul>
            <li>Review activity across your projects.</li>
            <li>Filter records by status and owner.</li>
          </ul>
          <p>
            <a href="#reading">Read the implementation notes</a>
          </p>
          <code>const ready = true</code>
        </article>
      </Example>
      <Example title="Reading">
        <article id="reading" className="typeset typeset-reading">
          <h3>Working with a shared system</h3>
          <p>
            Build hierarchy with typography and proximity. Keep controls compact, and use whitespace
            to separate meaningful groups.
          </p>
          <blockquote>
            Start with realistic content. Review the whole screen before polishing individual
            components.
          </blockquote>
        </article>
      </Example>
    </div>
  )
}
function Components() {
  const [message, setMessage] = useState("")
  return (
    <div className="space-y-10">
      <Example title="Actions">
        <div className="flex flex-wrap gap-3">
          <Button onClick={() => setMessage("Changes saved.")}>Save changes</Button>
          <Button variant="outline">Secondary</Button>
          <Button disabled>Unavailable</Button>
          <IconButton icon={Add} label="Add record" onClick={() => setMessage("Record added.")} />
        </div>
        <output className="block text-sm">{message}</output>
      </Example>
      <Example title="Inputs">
        <div className="max-w-sm space-y-2">
          <label htmlFor="example-name" className="text-sm font-medium">
            Project name
          </label>
          <Input id="example-name" placeholder="Research workspace" />
          <p className="text-xs text-muted-foreground">A name your team will recognize.</p>
        </div>
      </Example>
    </div>
  )
}
function Icons() {
  return (
    <Example title="IBM Carbon">
      <div className="flex items-center gap-6">
        <Icon as={Search} label="Search" />
        <Icon as={Add} label="Add" />
        <Icon as={Download} label="Download" />
        <Icon as={Mark} label="Custom SVG" />
      </div>
      <p className="mt-4 text-sm text-muted-foreground">
        Static React SVG imports, consistent dimensions, accessible controls.
      </p>
    </Example>
  )
}
export default function Gallery() {
  const [search, setSearch] = useState("")
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
        <aside className="space-y-3">
          <Input
            aria-label="Find examples"
            placeholder="Find examples…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <nav aria-label="UI examples" className="flex flex-wrap gap-1 md:flex-col">
            {sections
              .filter((s) => s.toLowerCase().includes(search.toLowerCase()))
              .map((s) => (
                <NavLink className="nav-link" key={s} to={`/__gallery/${s.toLowerCase()}`}>
                  {s}
                </NavLink>
              ))}
          </nav>
          {search && !sections.some((s) => s.toLowerCase().includes(search.toLowerCase())) && (
            <p className="text-sm text-muted-foreground">No examples found.</p>
          )}
        </aside>
        <main id="gallery-content" className="min-w-0 space-y-8 md:col-span-4">
          <div>
            <h1 className="text-xl font-semibold">Interface foundations</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Theme, typography, controls, and complete compositions.
            </p>
          </div>
          <Routes>
            <Route path="theme" element={<Theme />} />
            <Route path="typography" element={<Typography />} />
            <Route path="components" element={<Components />} />
            <Route path="icons" element={<Icons />} />
            <Route
              path="*"
              element={
                <p className="text-sm text-muted-foreground">
                  Choose an example to inspect. Patterns and layouts arrive with their
                  implementation phases.
                </p>
              }
            />
          </Routes>
          <Usage />
          <footer className="border-t pt-4 text-xs text-muted-foreground">
            <a
              className="underline underline-offset-4"
              href="https://github.com/rileytomasek/ui-starter/blob/main/docs/development.md"
            >
              Usage and source map
            </a>
          </footer>
        </main>
      </div>
    </>
  )
}
