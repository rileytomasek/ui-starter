# UI Starter

A specification for a reusable Vite, React, and TypeScript UI starter for
agent-authored apps, with Tailwind, shadcn/ui, deliberate information density,
and clear customization.

Coding agents are the primary consumers of the starter. When authoring workflows
conflict, prioritize reliable agent discovery, modification, and verification
over human developer convenience. The resulting apps must still provide excellent
interfaces for their users. [Scope and decisions](docs/starter/spec.md#authoring-priority)
defines this priority.

**Status: implementation in progress.** Phases 1–3 are verified. The runnable
foundation, lint/format/type checks, browser tests, and CI configuration exist.
The initial gallery is at `/__gallery/theme`. Full shells, examples, and
finalization follow in subsequent phases.

## Run and verify

Use Node 24.10.0 and pnpm 11.14.0. Run `pnpm install`,
`pnpm exec playwright install chromium firefox webkit`, then `pnpm dev`.
`pnpm check` runs the core checks; `pnpm test:e2e` runs application browser tests.
See [Development](docs/development.md) for the source map and prerequisites.

## Read the spec

| Document                                                    | Owns                                                                         |
| ----------------------------------------------------------- | ---------------------------------------------------------------------------- |
| [Implementation plan](docs/starter/implementation-plan.md)  | Phased task checklists, completion criteria, and implementation progress     |
| [Scope and decisions](docs/starter/spec.md)                 | Goals, confirmed stack, implementation boundaries, and deferred scope        |
| [Setup transition](docs/starter/setup-transition.md)        | Initial app choices, finalization, and removal of temporary starter material |
| [UI foundations](docs/starter/foundations.md)               | Tokens, themes, Typeset, icons, and design direction                         |
| [Components](docs/starter/components.md)                    | The eight included components/examples and their behavior                    |
| [Shells and page layouts](docs/starter/layouts.md)          | Both shells, shared navigation, and four inner-page patterns                 |
| [Documentation requirements](docs/starter/documentation.md) | Required usage guides, extension recipes, and maintenance standards          |
| [Customization](docs/starter/customization.md)              | How apps change the foundation and add capabilities                          |
| [Code quality](docs/starter/quality.md)                     | Oxlint, Oxfmt, design rules, command contract, and CI responsibilities       |
| [Testing](docs/starter/testing.md)                          | Vitest Node/browser, Playwright, accessibility, and visual review            |
| [Agent guidance](docs/starter/agent-guidance.md)            | AGENTS.md, skill ownership, documentation upkeep, and provenance             |
| [Acceptance](docs/starter/acceptance.md)                    | Observable criteria for a completed starter                                  |
| [Sources](docs/sources.md)                                  | First-party references and pinned design-skill provenance                    |

The [interface-design skill](.agents/skills/interface-design/SKILL.md) supplies
the design principles. Implementation details belong in the documents above.

## What the starter will contain

- Vite + React + strict TypeScript, Tailwind, and a shadcn/create preset.
- Actual shadcn/ui components installed through its CLI, with app-specific
  composition rather than handwritten component replacements.
- Light, dark, and system modes with live OS switching and persisted overrides.
- IBM Carbon icons compiled through Iconify and unplugin-icons to React SVG
  components.
- shadcn Code Block with Shiki, Markdown with Typeset, a data table, a full
  forms example, combobox, date picker, sidebar, and command palette.
- A collapsible-sidebar shell and a no-sidebar shell with a fixed header.
- Collection, detail, settings/form, and reading page examples.
- Guided application setup and finalization that replaces starter instructions
  with app-specific guidance and removes temporary material.
- A searchable UI gallery, usage and extension guides in `docs/`, and
  repository-local agent guidance.
- Oxlint, Oxfmt, targeted shadcn design rules, Vitest component tests in a real
  browser, and a small Playwright end-to-end suite.

The initial implementation should be easy to understand and adapt. Applications
own their copied code. Prefer small reusable pieces and realistic examples;
introduce further abstraction only when repeated needs justify it.

## Confirmed choices

Use React Router with declarative routing, React Hook Form + Zod,
react-markdown + remark-gfm, and pnpm. Use IBM Carbon icons, an MIT license,
and GitHub template distribution. Run the main CI suites in Chromium with a
small Firefox/WebKit smoke suite.

The implementing agent selects and records compatible versions and the precise
shadcn/create preset, primitive base, and fonts within the agreed design direction.
These are implementation tasks, not unanswered product questions. See
[Scope and decisions](docs/starter/spec.md#confirmed-implementation-decisions).

## Repository setup

The specification repository is named `ui-starter` and was created privately on
GitHub. It uses the [MIT license](LICENSE); third-party components and assets
retain their own licenses and notices. Keep the repository private during
implementation; publication requires a user request. Production deployment is
outside this starter's scope.

Start future work with [AGENTS.md](AGENTS.md). Creating this specification does
not start implementation or authorize deployment.
