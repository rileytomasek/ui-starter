// Source offsets identify lines even when content repeats; tokens use Shiki offsets.
export function codeLines(code: string) {
  let offset = 0
  return code
    .replace(/\n$/u, "")
    .split("\n")
    .map((text) => {
      const line = { text, offset }
      offset += text.length + 1
      return line
    })
}
