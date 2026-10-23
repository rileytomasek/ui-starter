import { CodeDisplay } from "@/components/code-display"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "cn"
import { Children, isValidElement, useState, type ComponentProps } from "react"
import ReactMarkdown, { type Components } from "react-markdown"
import remarkGfm from "remark-gfm"
function MarkdownImage({ alt, ...props }: ComponentProps<"img">) {
  const [failed, setFailed] = useState(false)
  return failed ? (
    <span className="text-sm text-muted-foreground">
      Image unavailable: {alt === undefined || alt === "" ? "No description" : alt}
    </span>
  ) : (
    <img
      {...props}
      alt={alt ?? ""}
      loading="lazy"
      onError={() => {
        setFailed(true)
      }}
    />
  )
}
export function Markdown({
  source,
  variant = "reading",
}: {
  source: string
  variant?: "compact" | "reading"
}) {
  return (
    <div
      className={cn(
        "typeset min-w-0",
        variant === "reading" ? "typeset-reading" : "typeset-compact",
      )}
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]} skipHtml components={components}>
        {source}
      </ReactMarkdown>
    </div>
  )
}

const components: Components = {
  input: ({ checked }) => (
    <span className="inline-flex align-middle">
      <Checkbox
        disabled
        checked={checked === true}
        aria-label={checked === true ? "Completed task" : "Incomplete task"}
      />
    </span>
  ),
  pre: ({ children }) => {
    const child = Children.toArray(children)[0]
    if (!isValidElement<{ children?: string; className?: string }>(child))
      return <pre>{children}</pre>
    const language = /language-([^ ]+)/u.exec(child.props.className ?? "")?.[1]
    return <CodeDisplay code={child.props.children ?? ""} language={language} />
  },
  table: ({ children }) => (
    <section className="overflow-x-auto" aria-label="Scrollable table" tabIndex={0}>
      <table>{children}</table>
    </section>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      {...(/^https?:\/\//u.test(href ?? "")
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
    >
      {children}
    </a>
  ),
  img: ({ node: _node, ...props }) => <MarkdownImage key={props.src} {...props} />,
}
