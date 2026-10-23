# Optional integrations

The default stack has no backend, authentication, deployment adapter, server-state
cache, global-state framework, charts, rich text editor, or MDX execution pipeline.
Add one only when the app has a concrete need; document the ownership and contract.

## Charts

Prefer the shadcn Chart component with Recharts. Install through `pnpm ui:add chart`,
then `pnpm ui:icons`, inspect the CLI changes and dependencies, and run `pnpm check`.
Use a typed ChartConfig and ChartContainer with a real width and height; compose
Recharts charts inside it. Use semantic chart colors, readable axes/units, a text
summary or table equivalent, and responsive tooltip/legend behavior. Test both
themes, empty/loading data, keyboard access, and narrow screens. Do not install a
second charting library without a specific unmet requirement.

[Official recipe](https://ui.shadcn.com/docs/components/chart) and
[Recharts](https://recharts.org/en-US/guide/getting-started/). Validated October 23, 2026 using shadcn 4.22.1 and Recharts 3.8.0: CLI installation,
Carbon normalization, lint, strict typecheck, production build, and light/dark
390px/1280px rendering. Charts are absent by default.

A minimal composition (after CLI installation):

```tsx
import { Bar, BarChart, XAxis } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

const config = {
  observations: { label: "Observations", color: "var(--chart-2)" },
} satisfies ChartConfig
const data = [
  { week: "Oct 5", observations: 18 },
  { week: "Oct 12", observations: 25 },
]

export function ActivityChart() {
  return (
    <ChartContainer config={config} className="min-h-64 w-full">
      <BarChart accessibilityLayer data={data}>
        <XAxis dataKey="week" tickLine={false} axisLine={false} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="observations" fill="var(--color-observations)" />
      </BarChart>
    </ChartContainer>
  )
}
```

Add a prose summary/table beside the chart. The container must have nonzero dimensions;
verify the rendered SVG and tooltip, not only a successful build.

## Forms, tables, and server data

Prefer React Hook Form + Zod for nontrivial forms and TanStack Table v8 for typed
interactive tables. These integrations are included with retained reference
examples. If removed, add `react-hook-form @hookform/resolvers zod` or
`@tanstack/react-table@^8.21.3` when needed. Build on the installed Field and Table
primitives and explicit local types. Use TanStack Query for a concrete server-cache
need; keep data fetching out of generic UI wrappers. Auth, persistence, routing
loaders, and deployment must be selected for the consuming application's runtime.

For Markdown keep react-markdown's safe defaults. Math, diagrams, streamed chat,
and editing are separate integrations, not reasons to enable raw HTML globally.
