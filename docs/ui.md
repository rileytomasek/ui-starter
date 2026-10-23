# UI foundations and customization

Use the CLI-installed source in src/components/ui. The preset is Base UI Nova,
neutral, with subtle menu accent. Source receipt: [installation.json](installation.json).

## Add a component

Run `pnpm ui:add <component>` followed by `pnpm ui:icons` and `pnpm format`.
The CLI generates Lucide imports; ui:icons replaces known equivalents with static
Carbon imports and fails on unmapped names. Add a deliberate mapping to
scripts/carbon-icons.ts, inspect the icon, and remove lucide-react if no longer
used after installation. Never handwrite replacement primitives. Preserve the
installed APIs and record narrow local changes in [architecture](architecture.md).

## Theme and typography

Edit semantic light/dark tokens in src/index.css. Keep color pairs coherent.
Use existing sizes or a named variant inside the owning component for repeated
changes; layout spacing belongs to callers. IBM Plex fonts are self-hosted from
Fontsource, with sans 400/500/600 and mono 400/500. Update imports and --font-sans,
--font-heading, --font-mono together to replace them; preserve font licenses.

Typeset source is src/typeset.css; compact/reading preset variables live in
src/index.css. Wrap prose with `className="typeset typeset-reading"` or
`className="typeset typeset-compact"`. The page controls reading width.

ThemeProvider in src/components/theme.tsx owns Light/Dark/System. The blocking
public/theme.js bootstrap and provider share `app.theme`; update them together.
Use ThemeControl or useTheme().setMode. System is default and follows live OS
changes; manual choices persist. Storage failures retain a usable in-memory mode.

## Icons

```tsx
import Search from "~icons/carbon/search"
import { Icon, IconButton } from "@/components/icon"

<Icon as={Search} />
<IconButton icon={Search} label="Search records" onClick={openSearch} />
```

An Icon is decorative unless given a label. IconButton requires a label. Sizes
are sm/md/lg; SVGs inherit currentColor. Custom SVGs in src/assets/icons import
as ~icons/local/name. Keep their viewBox and multicolor fills. Use Carbon for UI;
new collections need a specific purpose and preserved source notices.

After installing or updating components, run `pnpm lint` and `pnpm typecheck`.
Refactor generated code to the [strict lint contract](development.md#strict-lint-contract)
while preserving its APIs, behavior, styling, and installation provenance.

## Density and grouping

Prefer the installed InputGroup, ToggleGroup, ButtonGroup, and Tabs for related
controls and local panels. See [compact grouped controls](components.md#compact-grouped-controls)
for semantics, APIs, and working examples. Keep meaningful groups compact and allow
toolbars to wrap on narrow screens.

## Inspect and verify

Run `pnpm dev` and open `/__gallery/theme`, `/__gallery/typography`,
`/__gallery/components`, or `/__gallery/icons`. Gallery source is
src/gallery/Gallery.tsx. Search navigation uses section names. Add a route and a
section entry for a new example, using real components and deterministic states.
`pnpm build:gallery` creates an explicit preview build in dist-gallery.
`pnpm exec vite preview --outDir dist-gallery` serves that build. Default
`pnpm build` excludes gallery routes/modules and asserts that exclusion.

After changes run `pnpm check`, relevant browser tests, and inspect both themes
at desktop and mobile widths. Verify keyboard focus, long content, and reduced
motion. Shared source must never import gallery fixtures. The gallery is a development reference; keep its fixture imports outside production.
