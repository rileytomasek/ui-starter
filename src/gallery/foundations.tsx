import { IconButton } from "@/components/icon"
import { MultiCombobox, SelectCombobox } from "@/components/select-combobox"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockHeader,
  CodeBlockTitle,
} from "@/components/ui/code-block"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import Add from "~icons/carbon/add"
const usage =
  'import { Button } from "@/components/ui/button"\n\n<Button size="sm" variant="outline">Save changes</Button>'
export function Usage() {
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
export function Theme() {
  return (
    <div className="space-y-10">
      <Example title="Semantic colors">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { name: "Background", style: "bg-background text-foreground" },
            { name: "Muted", style: "bg-muted text-muted-foreground" },
            { name: "Primary", style: "bg-primary text-primary-foreground" },
            { name: "Accent", style: "bg-accent text-accent-foreground" },
            { name: "Card", style: "bg-card text-card-foreground" },
            { name: "Popover", style: "bg-popover text-popover-foreground" },
            { name: "Secondary", style: "bg-secondary text-secondary-foreground" },
            { name: "Destructive", style: "bg-background text-destructive" },
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
      <Example title="Scale and shape">
        <div className="flex flex-wrap items-center gap-4">
          <Button size="xs" variant="outline">
            Extra small
          </Button>
          <Button size="sm" variant="outline">
            Small
          </Button>
          <Button variant="outline">Default</Button>
          <Button size="lg" variant="outline">
            Large
          </Button>
        </div>
        <div className="flex flex-wrap gap-4 text-xs">
          <span className="rounded-sm border p-4">Small radius</span>
          <span className="rounded-lg border p-4">Base radius</span>
          <span className="rounded-xl border p-4 shadow-sm">Raised surface</span>
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
export function Typography() {
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
export function Components() {
  const [message, setMessage] = useState("")
  return (
    <div className="space-y-10">
      <Example title="Actions">
        <div className="flex flex-wrap gap-3">
          <Button
            onClick={() => {
              setMessage("Changes saved.")
            }}
          >
            Save changes
          </Button>
          <Button variant="outline">Secondary</Button>
          <Button disabled>Unavailable</Button>
          <IconButton
            icon={Add}
            label="Add record"
            onClick={() => {
              setMessage("Record added.")
            }}
          />
        </div>
        <output className="block text-sm">{message}</output>
      </Example>
      <DisabledSelections />
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

function DisabledSelections() {
  return (
    <Example title="Disabled selections">
      <div className="max-w-sm space-y-3">
        <label htmlFor="disabled-owner" className="text-sm">
          Owner
        </label>
        <SelectCombobox
          id="disabled-owner"
          disabled
          options={[{ value: "maya", label: "Maya Chen" }]}
          value="maya"
          onChange={() => {}}
        />
        <label htmlFor="disabled-topics" className="text-sm">
          Topics
        </label>
        <MultiCombobox
          id="disabled-topics"
          disabled
          options={[{ value: "research", label: "Research" }]}
          value={["research"]}
          onChange={() => {}}
        />
      </div>
    </Example>
  )
}
