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
controls, clipboard-error feedback, high-contrast Shiki themes, and attaching the generated
CalendarDayButton focus ref so arrow-key navigation actually moves focus. The selected
lint exceptions are documented in [Development](development.md). The source and
interface design skill provenance is retained in [Sources](sources.md).

The stricter lint contract also requires small modules and stable renderers.
The installed Sidebar keeps its public facade in sidebar.tsx, with context, panel,
layout, and menu internals alongside it. Calendar slot renderers are stable module
functions. Forms separate model/details/people, and tables separate model/columns/
controls/content. Shared code display identifies lines and tokens by source offset.
These are local refactors of the installed source, not new primitive implementations.

Toggle Group retains the CLI API and styles, with named React imports, a typed CSS
custom-property helper, memoized context, and nullish variant fallbacks to meet strict
lint. Button Group uses named React types. The additional CLI receipt records the
original installed hashes before these narrow adaptations.
