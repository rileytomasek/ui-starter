# UI Starter

An agent-first Vite + React + TypeScript foundation for building restrained,
information-rich apps with Tailwind, CLI-installed shadcn components, and IBM
Carbon icons. Agents are the primary authors; reliable discovery, modification,
and verification take priority over human developer convenience while preserving
end-user usability and visual quality.

## Start a new application

Use this public GitHub template to create your own repository. Setup is not yet
complete in a new copy: follow [Getting started](docs/starter/getting-started.md),
record app choices in `.starter/config.json`, preview, then explicitly apply
finalization. It replaces these instructions with app-specific guidance and
removes temporary specs/tooling and unselected examples after checks pass.

```sh
pnpm install
pnpm exec playwright install chromium firefox webkit
pnpm dev
```

Use Node 24.10.0 and pnpm 11.14.0. Open `/__gallery/theme` in the dev server to
browse the UI foundation. `pnpm check` runs format, lint, documentation links,
strict types, Vitest, and production build; `pnpm test:e2e` runs browser flows.

## Included

- Base UI Nova shadcn source installed by the CLI, with static Carbon SVG icons,
  IBM Plex fonts, semantic tokens, Typeset, and Light/Dark/System appearance.
- Shiki code display, safe GFM Markdown, a typed data table, complete forms,
  single/multiple comboboxes, date-only picker, sidebar, and command palette.
- Input Group, Toggle Group, Button Group, and Tabs for compact, related controls.
- Sidebar and fixed-header shells; collection, detail, settings, and reading pages.
- Searchable development gallery, excluded from production by default.
- Strict type-aware Oxlint + shadcn rules, Oxfmt, Vitest Node/browser tests, Playwright, and CI.
- Previewable, recoverable setup/finalization with explicit modified-file handling.

Charts are optional: [shadcn/Recharts recipe](docs/optional.md). Backend, auth,
deployment, server caching, and global state remain application decisions.

## Working guides

| Task                                               | Guide                                   |
| -------------------------------------------------- | --------------------------------------- |
| Understand ownership and providers                 | [Architecture](docs/architecture.md)    |
| Run, test, and diagnose checks                     | [Development](docs/development.md)      |
| Change tokens, fonts, variants, icons, or themes   | [UI customization](docs/ui.md)          |
| Use and extend substantial components              | [Component recipes](docs/components.md) |
| Add routes, navigation, commands, and page layouts | [Layouts](docs/layouts.md)              |
| Add optional capabilities                          | [Integrations](docs/optional.md)        |
| Review installation and design provenance          | [Sources](docs/sources.md)              |

Read [AGENTS.md](AGENTS.md) for authoring conventions and the pinned
[interface-design skill](.agents/skills/interface-design/SKILL.md) before UI work.
Apply [ui-review](.agents/skills/ui-review/SKILL.md) before completing UI changes;
AGENTS.md explains their roles and verification workflow.

## Maintaining the upstream repository

[Specification](docs/starter/spec.md), [implementation plan](docs/starter/implementation-plan.md),
and [acceptance evidence](docs/starter/release.md) record requirements and verification.
Run `pnpm test:setup` for the cleanup regression suite. After intentional release
changes, run `pnpm setup:baseline` and commit the manifest with those changes;
consuming apps must never refresh it to bypass modified-file conflicts.

Own source is MIT licensed; retain LICENSE and public/licenses notices for shadcn,
Carbon (Apache-2.0), and IBM Plex (OFL). The GitHub repository is a public, open-source template.
Deploying a consuming app remains an application-specific decision.
