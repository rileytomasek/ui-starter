export type Json = null | boolean | number | string | Json[] | { [key: string]: Json | undefined }
export type JsonObject = { [key: string]: Json | undefined }
export function object(value: unknown): JsonObject {
  if (!isJson(value) || value === null || typeof value !== "object" || Array.isArray(value))
    throw new Error("Expected a JSON object")
  return value
}
function isJson(value: unknown): value is Json {
  if (value === null || ["boolean", "number", "string"].includes(typeof value)) return true
  if (Array.isArray(value)) return value.every((item: unknown) => isJson(item))
  return typeof value === "object" && Object.values(value).every((item: unknown) => isJson(item))
}
export const parseObject = (text: string) => object(JSON.parse(text))
export function string(value: unknown): string {
  if (typeof value !== "string") throw new Error("Expected a string")
  return value
}
export function strings(value: unknown): string[] {
  if (!Array.isArray(value)) throw new Error("Expected a string array")
  return value.map((item: unknown) => string(item))
}
export function boolean(value: unknown): boolean {
  if (typeof value !== "boolean") throw new Error("Expected an explicit boolean")
  return value
}
export function number(value: unknown): number {
  if (typeof value !== "number" || !Number.isSafeInteger(value) || value < 0)
    throw new Error("Expected a nonnegative integer")
  return value
}
export const json = (value: unknown) => `${JSON.stringify(value, null, 2)}\n`
export type Reader = (path: string) => string
export type Operation = { path: string; text: string | null; keep?: boolean }
export type State = {
  configHash: string
  backup: string
  ops: Operation[]
  next: number
  mutated: boolean
}
export function parseState(text: string): State {
  const value = parseObject(text)
  if (!Array.isArray(value.ops)) throw new Error("Expected journal operations")
  const ops = value.ops.map((item) => {
    const op = object(item)
    return {
      path: string(op.path),
      text: op.text === null ? null : string(op.text),
      keep: op.keep === true,
    }
  })
  const next = number(value.next)
  if (next > ops.length) throw new Error("Journal position exceeds operation count")
  return {
    configHash: string(value.configHash),
    backup: string(value.backup),
    ops,
    next,
    mutated: boolean(value.mutated),
  }
}
