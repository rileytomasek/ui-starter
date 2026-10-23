import { Children, isValidElement, useState, type ComponentProps } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { cn } from "cn"
import { Checkbox } from "@/components/ui/checkbox"
import { CodeDisplay } from "@/components/code-display"
function MarkdownImage({ alt, ...props }: ComponentProps<"img">) {
  const [failed, setFailed] = useState(false)
  return failed ? (
    <span className="text-sm text-muted-foreground">
      Image unavailable: {alt || "No description"}
    </span>
  ) : (
    <img {...props} alt={alt ?? ""} loading="lazy" onError={() => setFailed(true)} />
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
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        skipHtml
        components={{
          input: ({ checked }) => (
            <span className="inline-flex align-middle">
              <Checkbox
                disabled
                checked={!!checked}
                aria-label={checked ? "Completed task" : "Incomplete task"}
              />
            </span>
          ),
          pre: ({ children }) => {
            const child = Children.toArray(children)[0]
            if (!isValidElement<{ children?: string; className?: string }>(child))
              return <pre>{children}</pre>
            const language = /language-([^ ]+)/.exec(child.props.className ?? "")?.[1]
            return <CodeDisplay code={String(child.props.children ?? "")} language={language} />
          },
          table: ({ children }) => (
            <section className="overflow-x-auto" aria-label="Scrollable table" tabIndex={0}>
              <table>{children}</table>
            </section>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              {...(/^https?:\/\//.test(href ?? "")
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              {children}
            </a>
          ),
          img: ({ node: _node, ...props }) => <MarkdownImage key={props.src} {...props} />,
        }}
      >
        {source}
      </ReactMarkdown>
    </div>
  )
}
