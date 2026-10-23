import { boolean, object, parseObject, string, type JsonObject } from "./data.ts"
export type Route = { path: string; title: string; description: string }
export type Configuration = {
  name: string
  purpose: string
  users: string
  packageName: string
  shell: "header" | "sidebar"
  visual: Record<string, string>
  routes: Route[]
  retainGallery: boolean
  retainExamples: boolean
  resolutions: JsonObject
}
function required(value: unknown, label: string): string {
  const text = string(value)
  if (text.trim() === "" || /[\r\n]/u.test(text))
    throw new Error(`Set a non-empty, single-line ${label} in .starter/config.json`)
  return text
}
function routes(value: unknown): Route[] {
  if (!Array.isArray(value) || value.length === 0)
    throw new Error("Provide routes with the first path / for the home page")
  const paths = new Set<string>()
  const result = value.map((item: unknown) => {
    const route = object(item)
    const path = string(route.path)
    if (
      !/^\/(?:[a-z0-9-]+(?:\/[a-z0-9-]+)*)?$/u.test(path) ||
      path.startsWith("/__") ||
      paths.has(path)
    )
      throw new Error(`Invalid or duplicate route: ${path}`)
    paths.add(path)
    return {
      path,
      title: required(route.title, `route ${path} title`),
      description: required(route.description, `route ${path} description`),
    }
  })
  if (result[0].path !== "/")
    throw new Error("Provide routes with the first path / for the home page")
  return result
}
export function configuration(text: string): Configuration {
  const c = parseObject(text)
  const name = required(c.name, "name")
  const purpose = required(c.purpose, "purpose")
  const users = required(c.users, "users")
  const packageName = required(c.packageName, "packageName")
  if (
    !/^(?:@[a-z0-9][a-z0-9-]*\/)?[a-z0-9][a-z0-9-]*$/u.test(packageName) ||
    packageName === "ui-starter"
  )
    throw new Error("Use an app-specific npm packageName")
  if (c.shell !== "header" && c.shell !== "sidebar")
    throw new Error("Choose shell: header or sidebar")
  const source = object(c.visual)
  const visual = Object.fromEntries(
    ["colors", "fonts", "density", "radius", "icons"].map((key) => [
      key,
      required(source[key], `visual.${key}`),
    ]),
  )
  const retainGallery = boolean(c.retainGallery)
  const retainExamples = boolean(c.retainExamples)
  if (retainGallery && !retainExamples)
    throw new Error(
      "Gallery references examples: retainExamples must be true when retainGallery is true",
    )
  return {
    name,
    purpose,
    users,
    packageName,
    shell: c.shell,
    visual,
    routes: routes(c.routes),
    retainGallery,
    retainExamples,
    resolutions: object(c.resolutions),
  }
}
