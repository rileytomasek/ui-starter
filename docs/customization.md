# Customization

The starter must make the initial visual choices explicit and show how to
change them. This guide specifies the documentation and examples the implemented
starter must provide; paths and commands must be filled in from the actual app.
[Documentation requirements](documentation.md) owns the broader usage-guide
coverage and standards for optional extension recipes.

## Initialize with shadcn/create

Use [shadcn/create](https://ui.shadcn.com/create) to choose the starting style,
primitive base, palette, radius, typography, and icons. Resolve these choices
before generating components. Record the selected options, generated command,
tool versions, and reproducible preset link or identifier where available.

Retain the generated `components.json` and explain its aliases, stylesheet,
style, and registry configuration. It guides future additions; editing it alone
does not restyle already copied components. The actual CSS tokens and component
source govern the existing UI. Document any integration changes needed to use
Iconify through unplugin-icons consistently with generated components.

## Install before composing

Follow the [component source contract](components.md#component-source-and-installation).
Use the configured shadcn CLI to add components and selected available blocks,
then build application examples from that installed source. Record the actual
commands, tool versions, registry sources, and any narrow local adaptations.
Do not substitute handwritten source or manual documentation copying. Keep these
installation instructions in the retained app docs after setup finalization.

## Required recipes

Each recipe must identify the real files to edit, show one small example, and
state how to check the result. Keep one authoritative definition for each token
or configuration. Avoid a second configuration layer that mirrors shadcn.

| Change | What the guide must explain | Verification |
| --- | --- | --- |
| Brand and neutral colors | Change semantic tokens for both themes, including border, muted, destructive, and focus colors | Inspect normal, hover, selected, disabled, and focus states |
| Density and radius | Adjust shared tokens or component variants; preserve readable targets and alignment | Compare tables, forms, menus, and mobile layouts |
| Fonts | Configure body, heading, and monospace loading, fallbacks, and metrics | Check wrapping, first load, code, and numeric alignment |
| Prose | Change Typeset compact and reading styles through their shared definitions | Check Markdown headings, lists, tables, links, and code |
| Theme | Find the provider, first-paint initialization, storage key, and selector | Test System, Light, Dark, reload, and a live OS change |
| Icons | Install the chosen Iconify collection and use static unplugin-icons imports | Check bundle behavior, sizing, alignment, and accessible names |
| Components | Add through the configured shadcn workflow and adapt through shared variants | Exercise relevant interaction states and design lint |
| Code highlighting | Add supported languages or change the Shiki theme through the shared integration | Check both modes, fallback text, copy, and loading |
| Shell and navigation | Select either shell and edit the shared destination definitions | Check direct URLs, active items, mobile navigation, and command actions |
| Page composition | Start from collection, detail, settings, or reading examples | Check narrow viewports and realistic content |

Explain when to use a component variant versus a caller's layout class. Layout
spacing and placement belong with the composition; repeated visual treatment
belongs in a token or variant. Do not hide common upstream component capabilities
behind a restrictive wrapper.

## Add charts only when needed

Provide an optional recipe for [shadcn charts](https://ui.shadcn.com/docs/components/chart)
and Recharts. Do not install a chart package or ship a chart demo by default.

The recipe must cover adding the appropriate component with the project's
configured shadcn tooling, checking the required Recharts version, and defining
series labels and semantic colors. Include responsive container sizing, tooltip
and legend formatting, units and numeric formatting, and both themes. Describe
loading, empty, and error behavior and an accessible text or table alternative
where needed. Confirm the commands against the selected versions when the
starter is implemented; avoid a permanently copied installation command that
can silently drift.

## Start a real application

Follow [Setup transition](setup-transition.md) for initial application choices,
example retention, and finalization. The setup guide must identify the actual
example files separately from reusable foundations. Removing examples must not
break shared providers or navigation. Reconcile affected dependencies and tests,
preserving those still used by the app. Keep ongoing customization instructions
in the retained application docs after temporary setup guidance is removed.

Link to [Scope and decisions](spec.md) for backend and deployment boundaries.
Keep developer documentation in the repository; the starter's user-facing
screens should demonstrate useful product interactions.
