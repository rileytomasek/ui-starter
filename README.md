# UI Starter

A specification for a reusable Vite, React, and TypeScript UI starter for
agent-authored apps, with Tailwind, shadcn/ui, deliberate information density,
and clear customization.

Coding agents are the primary consumers of the starter. When authoring workflows
conflict, prioritize reliable agent discovery, modification, and verification
over human developer convenience. The resulting apps must still provide excellent
interfaces for their users. [Scope and decisions](docs/spec.md#authoring-priority)
defines this priority.

**Status: specification only.** This repository captures the design discussion
through October 23, 2026. It contains Markdown specifications and the reviewed
interface-design skill. There is no app, package manifest, installed toolchain,
CI workflow, or implemented component yet. Commands in the spec are proposed
interfaces, not commands that work in this checkout.

## Read the spec

| Document | Owns |
| --- | --- |
| [Implementation plan](docs/implementation-plan.md) | Phased task checklists, completion criteria, and implementation progress |
| [Scope and decisions](docs/spec.md) | Goals, agreed stack, deferred scope, open choices, and superseded proposals |
| [Setup transition](docs/setup-transition.md) | Initial app choices, finalization, and removal of temporary starter material |
| [UI foundations](docs/foundations.md) | Tokens, themes, Typeset, icons, and design direction |
| [Components](docs/components.md) | The eight included components/examples and their behavior |
| [Shells and page layouts](docs/layouts.md) | Both shells, shared navigation, and four inner-page patterns |
| [Documentation requirements](docs/documentation.md) | Required usage guides, extension recipes, and maintenance standards |
| [Customization](docs/customization.md) | How apps change the foundation and add capabilities |
| [Code quality](docs/quality.md) | Oxlint, Oxfmt, design rules, command contract, and CI responsibilities |
| [Testing](docs/testing.md) | Vitest Node/browser, Playwright, accessibility, and visual review |
| [Agent guidance](docs/agent-guidance.md) | AGENTS.md, skill ownership, documentation upkeep, and provenance |
| [Acceptance](docs/acceptance.md) | Observable criteria for a completed starter |
| [Sources](docs/sources.md) | First-party references and pinned design-skill provenance |

The [interface-design skill](.agents/skills/interface-design/SKILL.md) supplies
the design principles. Implementation details belong in the documents above.

## What the starter will contain

- Vite + React + strict TypeScript, Tailwind, and a shadcn/create preset.
- Actual shadcn/ui components installed through its CLI, with app-specific
  composition rather than handwritten component replacements.
- Light, dark, and system modes with live OS switching and persisted overrides.
- Iconify collections compiled to React SVG components through unplugin-icons.
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

## Decisions before implementation

Routing, form and Markdown libraries, package manager, the exact visual preset,
fonts, icon family, primitive base, package versions, and distribution details
remain open. The recommendations and decision boundaries are recorded in
[Scope and decisions](docs/spec.md). Do not mistake a recommendation for a
confirmed dependency.

## Repository setup

The specification repository is named `ui-starter` and was created privately on
GitHub. Those are repository-creation defaults, not a decision to publish a
public template. No license or production deployment is selected.

Start future work with [AGENTS.md](AGENTS.md). Creating this specification does
not start implementation or authorize deployment.
