# Architecture and foundation decisions

Vite + React + strict TypeScript, Tailwind v4, Base UI Nova shadcn source,
React Router declarative routes, and static Carbon SVGs. src/main.tsx owns
ThemeProvider, TooltipProvider, and BrowserRouter. src/App.tsx composes routes;
src/app owns identity and destinations shared with commands. Shared components
never import development fixtures. Local React state is the default.

The preset is Nova with Base UI primitives, neutral semantic colors, .625rem
base radius, compact controls, and IBM Plex Sans/Mono self-hosted fonts. Change
semantic colors/fonts/radii in src/index.css; inspect the gallery in both themes.
Changing primitive base requires deliberate migration of installed components;
editing components.json does not migrate behavior or restyle existing source.

Light/Dark/System uses public/theme.js before paint and src/components/theme.tsx
after mount. Keep the storage key synchronized. See [UI](ui.md) for customization,
[components](components.md) for data contracts, and [layouts](layouts.md) for routes.

CLI installation receipt: [installation.json](installation.json). Installed source
has narrow Carbon import substitutions, accessible names on icon-only Combobox
controls, clipboard-error feedback, and high-contrast Shiki themes. The selected
lint exceptions are documented in [Development](development.md). The source and
interface design skill provenance is retained in [Sources](sources.md).
