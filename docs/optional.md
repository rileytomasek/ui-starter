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
[Recharts](https://recharts.org/en-US/guide/getting-started/). The final acceptance
record tracks validation of this optional recipe; charts are absent by default.

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
