# Scope and decisions

Recorded October 23, 2026 from the starter-repository discussion.

This document owns product scope and decision status. Other documents define
the behavior of the selected pieces. All implementation requirements describe
the intended starter, not shipped software.

## Objective

Make it straightforward for coding agents to build polished, information-rich
apps that follow the [interface-design skill](../../.agents/skills/interface-design/SKILL.md).
Establish useful defaults for styling, components, layout, agent guidance,
customization, and verification. The first screen should feel coherent, and
later screens should have clear examples to follow.

Useful content should dominate. Compact controls, purposeful whitespace,
typographic hierarchy, restrained surfaces, and precise alignment should make
dense interfaces easy to scan. The foundation must support different products
and compositions; it must not force every app into one dashboard layout.

## Authoring priority

This is a starter for agent-authored apps. Coding agents are the primary users
of the repository, its documentation, component APIs, examples, and development
workflow. Human developers remain supported, but where their authoring preferences
conflict, optimize for reliable agent discovery, implementation, and verification.
This is an explicit product priority, not an optional documentation enhancement.

Evaluate choices by whether an agent can find the right code, understand its
contract, make a scoped change, and verify the outcome with little ambiguity or
missing context. Prefer explicit structure, consistent naming, typed interfaces,
searchable local documentation, executable examples, and deterministic commands.
A little additional explicitness is worthwhile when it prevents repeated agent
mistakes; a shorter or more visually polished developer workflow is not the
primary success criterion.

This priority concerns authoring. It does not reduce requirements for end-user
usability, accessibility, visual quality, or responsiveness. Agents must inspect
rendered output as well as source and test results. Keep the architecture small;
add automation or abstraction when it demonstrably helps agents perform real
starter tasks, rather than assuming that more machinery is better.

[Documentation requirements](documentation.md) and [Agent guidance](agent-guidance.md)
translate this priority into repository conventions. Choose implementation details using this criterion and record consequential tradeoffs in this document.

## Agreed foundation

| Area             | Decision                                                                                              |
| ---------------- | ----------------------------------------------------------------------------------------------------- |
| Application      | Vite + React + TypeScript, with strict checking                                                       |
| Styling          | Tailwind CSS and shadcn/ui; use shadcn/create for the preset and the shadcn CLI to install components |
| Typography       | shadcn Typeset for rendered prose, with compact and reading presets                                   |
| Theme            | Light / Dark / System; System default; live OS updates and persisted override                         |
| Icons            | IBM Carbon icons through Iconify and unplugin-icons; compiled React SVG components                    |
| Code display     | shadcn Code Block and its Shiki integration                                                           |
| Tables           | A shadcn-based TanStack Table example                                                                 |
| Lint             | Strict type-aware Oxlint, structural limits, and @shadcn/lint rules                                   |
| Format           | Oxfmt, including Tailwind class sorting                                                               |
| Component tests  | Vitest Browser Mode, vitest-browser-react, Playwright provider                                        |
| Logic tests      | Vitest in Node                                                                                        |
| End-to-end tests | A smaller Playwright suite for application flows                                                      |
| Agent guidance   | Concise AGENTS.md plus the checked-in interface-design skill                                          |

Use Tailwind v4-compatible tooling for the selected shadcn/lint direction.
Resolve exact compatible package versions during implementation and commit a
lockfile. Documentation consulted during planning is not live integration proof.

## Included scope

The [component spec](components.md) defines code display, Markdown, data table,
forms, combobox, date picker, sidebar, and command palette. Shared interaction
states and small helpers support these examples. Components must be installed
through the shadcn CLI, not handwritten replacements; the
[component source contract](components.md#component-source-and-installation)
defines the boundary between installed UI and custom app composition. The forms coverage includes
a dialog composition and destructive-action confirmation example where useful
to demonstrate pending state, recovery, and focus behavior.

The [layout spec](layouts.md) defines two interchangeable shells and four
inner-page patterns. A lightweight UI gallery inside the Vite app demonstrates
the real components, theme, typography, and compositions with representative
content and edge cases; [Foundations](foundations.md#ui-gallery) owns its scope.

Ship task-oriented usage and extension guides in `docs/`, including preferred
optional integrations such as charts. [Documentation requirements](documentation.md)
defines required coverage and maintenance expectations.

[Setup transition](setup-transition.md) defines a guided configuration phase and
an explicit finalization operation for consuming apps. Separate temporary starter
material from retained foundations; finalization produces app-specific guidance
and removes obsolete setup context so future agents work on the application.

The starter should be a small repository whose code consuming apps own. A
GitHub template is the selected distribution format, with an MIT license for
starter-owned source. A shared runtime component package or generator is not required.

## Confirmed implementation decisions

The recommendations below were accepted on October 23, 2026, with IBM Carbon
selected for icons and MIT selected for the starter license. They are decisions,
not alternatives awaiting another selection round.

| Area                 | Decision                                                                                                                                |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| Router               | React Router with declarative routing                                                                                                   |
| Forms                | React Hook Form + Zod                                                                                                                   |
| Markdown             | react-markdown + remark-gfm                                                                                                             |
| Package manager      | pnpm, with a committed lockfile and pinned manager version                                                                              |
| UI icon family       | IBM Carbon through Iconify's `carbon` collection and unplugin-icons; use `@iconify-json/carbon` and static `~icons/carbon/...` imports  |
| shadcn configuration | Use shadcn/create; select and record a coherent compact preset and compatible primitive base during Phase 1, following the design skill |
| Fonts                | Choose coordinated body/heading and monospace fonts during Phase 1; document loading, fallbacks, and applicable licenses                |
| Runtime versions     | Select compatible stable versions during Phase 1, using a supported Node LTS release; pin the toolchain and lock dependencies           |
| Distribution         | GitHub template repository; retain current private visibility unless the user requests publication                                      |
| License              | MIT for starter-owned source and documentation; preserve third-party licenses and notices                                               |
| Browser coverage     | Chromium for the main CI suites, with a small Firefox and WebKit smoke suite                                                            |
| Commands and CI      | Use the pnpm command contract in quality.md, with reproducible CI and explicit watch modes                                              |

There are no outstanding product-choice questions. Exact versions, visual preset
values, font assets, exported APIs, setup-record schema, and CI wiring are
implementation details delegated to the implementing agent. Select and document
them within these constraints and verify compatibility; do not reopen the agreed
stack. A demonstrated incompatibility must be reported and resolved explicitly,
without substituting handwritten shadcn components.

## Licensing and distribution

The repository uses the [MIT license](../../LICENSE). Add `license: "MIT"` to the
package manifest when the app is initialized. Keep the copyright and permission
notice in consuming copies. The starter's license does not replace third-party
licenses: IBM Carbon icons are Apache-2.0, and installed components, fonts, and
other assets retain their applicable notices. Record and ship the notices needed
for the selected sources, including distributed icon assets; preserve them during
setup finalization. [Sources](../sources.md) records the upstream references.

The repository remains private during implementation. GitHub template status is
a release task; selecting this distribution format does not itself publish the
repository or authorize a visibility change. No production deployment is part
of the starter implementation.

## Scope boundaries

- No installed charting dependency by default. Document how to add shadcn's
  Recharts integration and theme it when needed.
- Backend, authentication, persistence, server-data caching, global state
  libraries, and deployment infrastructure are selected by each app.
- Rich-text editing, uploads, diagrams, resizable split panes, and specialized
  inbox/editor layouts are deferred until a concrete app needs them.
- Streaming Markdown is not a default requirement. Streamdown was discussed as
  an option for streaming-heavy apps; do not install two Markdown renderers.
- Use the in-app UI gallery initially. Reconsider Storybook if automatic prop
  controls, generated component API docs, or a story-based testing workflow
  become requirements; do not build those systems into the gallery.
- No automatic remote skill updates, extra orchestration framework, or large
  collection of agent skills.

## Superseded proposals

- Oxlint and Oxfmt replace the earlier ESLint/Prettier proposal.
- Vitest Browser Mode component tests replace the earlier plan to use Vitest
  only for pure logic and put nearly all interaction coverage in end-to-end tests.
- React Testing Library with jsdom was compared but is not the selected default.
- shadcn Code Block with its existing Shiki hook replaces a bespoke code-display
  implementation. Use its built-in Typeset integration.
- Typeset is the prose styling foundation; a parallel Tailwind Typography setup
  is unnecessary by default.
- Iconify through unplugin-icons replaces the alternative direct lucide-react
  approach for the starter's own icon integration.
- The initial large example-app idea was narrowed to a playground and small,
  realistic reference compositions.

## Delivery shape

Follow the [Implementation plan](implementation-plan.md) for phase order, task
checklists, and progress evidence. Establish the runnable foundation and checks
early, then build the gallery, shells, components, and application finalization.
Keep documentation and tests with each feature. [Acceptance](acceptance.md)
defines the observable end state; the plan tracks execution separately from this
durable product specification.
