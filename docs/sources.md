# Sources and provenance

References consulted for the specification, recorded October 23, 2026. They
explain upstream capabilities and integration direction; they do not establish
that the future starter has been built or validated. Recheck compatibility and
commands against selected releases during implementation.

## Pinned design skill

- Author/source: Riley Tomasek's [interface-design gist](https://gist.github.com/rileytomasek/e96df70d38e1dcaea9c1c20a2c931e3c).
- Reviewed gist revision: `5dcf3882ed69a75fb1b21f3b325c12d5dcf72c84`.
- [Versioned source](https://gist.github.com/rileytomasek/e96df70d38e1dcaea9c1c20a2c931e3c/5dcf3882ed69a75fb1b21f3b325c12d5dcf72c84), file `SKILL.md`.
- Local copy: [.agents/skills/interface-design/SKILL.md](../.agents/skills/interface-design/SKILL.md).
- Content SHA-256: `9d66d87a1dd8c7dd20bd630a4dac178a9777a3c434faf04f91cd467f7079bad0`.
- Status: exact content copied from the versioned GitHub API response, without
  local edits. Updates follow [Agent guidance](agent-guidance.md).

## Foundations and components

| Reference | Role |
| --- | --- |
| [shadcn/create](https://ui.shadcn.com/create) | Select and generate the visual starting point |
| [shadcn installation](https://ui.shadcn.com/docs/installation) | Framework setup |
| [components.json](https://ui.shadcn.com/docs/components-json) | CLI configuration and aliases |
| [shadcn theming](https://ui.shadcn.com/docs/theming) and [Tailwind theme](https://tailwindcss.com/docs/theme) | Semantic tokens and styling foundation |
| [Typeset](https://ui.shadcn.com/docs/typeset) | Prose styling and code integration |
| [Vite dark mode](https://ui.shadcn.com/docs/dark-mode/vite) | Theme-provider starting point |
| [Code Block](https://ui.shadcn.com/docs/components/code-block) and [Shiki performance](https://shiki.style/guide/best-performance) | Code display and highlighting |
| [react-markdown](https://github.com/remarkjs/react-markdown) and [remark-gfm](https://github.com/remarkjs/remark-gfm) | Selected Markdown implementation |
| [Data Table](https://ui.shadcn.com/docs/components/data-table) | TanStack Table composition |
| [React Hook Form guide](https://ui.shadcn.com/docs/forms/react-hook-form) | Selected form integration with React Hook Form and Zod |
| [Combobox](https://ui.shadcn.com/docs/components/combobox) | Selection and search |
| [Date Picker](https://ui.shadcn.com/docs/components/date-picker) | Calendar/popover composition |
| [Sidebar](https://ui.shadcn.com/docs/components/sidebar) and [sidebar-07](https://ui.shadcn.com/blocks/sidebar#sidebar-07) | Responsive sidebar shell starting point |
| [Command](https://ui.shadcn.com/docs/components/command) | Command palette foundation |
| [Charts](https://ui.shadcn.com/docs/components/chart) | Optional Recharts recipe, not an installed default |
| [unplugin-icons](https://github.com/unplugin/unplugin-icons) | IBM Carbon Iconify icons compiled as React components |
| [Iconify collection metadata](https://github.com/iconify/icon-sets/blob/master/collections.json) and [Carbon collection](https://github.com/iconify/icon-sets/blob/master/json/carbon.json) | Selected `carbon` collection and icon metadata |
| [Carbon license](https://github.com/carbon-design-system/carbon/blob/main/LICENSE) | Apache-2.0 terms retained for Carbon assets |
| [MIT license](https://opensource.org/license/mit) | Selected license for starter-owned source and documentation |
| [Iconify React](https://iconify.design/docs/icon-components/react/) | Runtime alternative considered; static imports are the selected direction |
| [React Router declarative setup](https://reactrouter.com/start/declarative/installation) | Selected declarative router |

## Quality and tests

| Reference | Role |
| --- | --- |
| [shadcn lint](https://github.com/shadcn-ui/lint) and [setup](https://github.com/shadcn-ui/lint/blob/main/SETUP.md) | Design-system lint rules and Oxlint integration |
| [Oxlint plugins](https://oxc.rs/docs/guide/usage/linter/plugins.html) | JavaScript plugin support |
| [Oxfmt sorting](https://oxc.rs/docs/guide/usage/formatter/sorting.html) | Tailwind class sorting configuration |
| [Vitest browser component testing](https://vitest.dev/guide/browser/component-testing) | Real-browser React component testing |
| [Vitest environments](https://vitest.dev/guide/environment.html) | Separate Node and browser responsibilities |
| [Playwright](https://playwright.dev/docs/intro) | Application flows and browser tooling |

Source URLs can redirect as upstream documentation evolves. Keep the behavioral
requirements stable and update implementation recipes deliberately.
