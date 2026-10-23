import { cn } from "cn"
import type { ReactNode } from "react"
const widths = { full: "max-w-7xl", form: "max-w-3xl", reading: "max-w-reading" }
export function PageContent({
  children,
  width = "full",
}: {
  children: ReactNode
  width?: keyof typeof widths
}) {
  return (
    <div className={cn("mx-auto w-full space-y-8 px-5 py-6 sm:px-8", widths[width])}>
      {children}
    </div>
  )
}
export function PageHeader({
  title,
  description,
  actions,
}: {
  title: string
  description?: string
  actions?: ReactNode
}) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div className="min-w-0">
        <h1 tabIndex={-1} className="text-xl font-semibold tracking-tight outline-none">
          {title}
        </h1>
        {description !== undefined && description !== "" && (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {actions !== undefined && actions !== null && (
        <div className="flex flex-wrap items-center gap-2">{actions}</div>
      )}
    </div>
  )
}
export function PageSection({
  title,
  description,
  children,
}: {
  title: string
  description?: string
  children: ReactNode
}) {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-base font-medium">{title}</h2>
        {description !== undefined && description !== "" && (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {children}
    </section>
  )
}
export function PageToolbar({ children }: { children: ReactNode }) {
  return <div className="flex flex-wrap items-center justify-between gap-3">{children}</div>
}
