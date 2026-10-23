import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockHeader,
  CodeBlockLine,
  CodeBlockTitle,
} from "@/components/ui/code-block"
import { useHighlightedCode } from "@/hooks/use-highlighted-code"
import { codeLines } from "@/lib/code-lines"
export function CodeDisplay({
  code,
  language = "text",
  filename,
  lineNumbers = false,
  wrap = false,
}: {
  code: string
  language?: string
  filename?: string
  lineNumbers?: boolean
  wrap?: boolean
}) {
  const lines = useHighlightedCode(code, language)
  return (
    <CodeBlock>
      <CodeBlockHeader>
        <CodeBlockTitle>{filename ?? language}</CodeBlockTitle>
        <CodeBlockActions>
          <CodeBlockCopyButton value={code} />
        </CodeBlockActions>
      </CodeBlockHeader>
      <CodeBlockContent className="max-h-96" wrap={wrap} lineNumbers={lineNumbers}>
        {codeLines(code).map((line, index) => (
          <CodeBlockLine key={line.offset}>{lines[index]}</CodeBlockLine>
        ))}
      </CodeBlockContent>
    </CodeBlock>
  )
}
