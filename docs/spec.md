# Scope and decisions

Recorded October 23, 2026 from the starter-repository discussion.

This document owns product scope and decision status. Other documents define
the behavior of the selected pieces. All implementation requirements describe
the intended starter, not shipped software.

## Objective

Make it straightforward for coding agents to build polished, information-rich
apps that follow the [interface-design skill](../.agents/skills/interface-design/SKILL.md).
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
translate this priority into repository conventions. Resolve open implementation
choices using this criterion and record consequential tradeoffs in this document.

## Agreed foundation

| Area | Decision |
| --- | --- |
| Application | Vite + React + TypeScript, with strict checking |
| Styling | Tailwind CSS and shadcn/ui; use shadcn/create for the preset and the shadcn CLI to install components |
| Typography | shadcn Typeset for rendered prose, with compact and reading presets |
| Theme | Light / Dark / System; System default; live OS updates and persisted override |
| Icons | Iconify collections through unplugin-icons; compiled React SVG components |
| Code display | shadcn Code Block and its Shiki integration |
| Tables | A shadcn-based TanStack Table example |
| Lint | Oxlint with targeted @shadcn/lint rules |
| Format | Oxfmt, including Tailwind class sorting |
| Component tests | Vitest Browser Mode, vitest-browser-react, Playwright provider |
| Logic tests | Vitest in Node |
| End-to-end tests | A smaller Playwright suite for application flows |
| Agent guidance | Concise AGENTS.md plus the checked-in interface-design skill |

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
GitHub template is the leading distribution proposal; exact template setup is
still open. A shared runtime component package or generator is not required.

## Open choices and current recommendations

| Choice | Current recommendation | Still to resolve |
| --- | --- | --- |
| Router | React Router, starting with declarative routing | React Router versus TanStack Router |
| Forms | React Hook Form + Zod | Confirm library and validation approach |
| Markdown | react-markdown + remark-gfm | Confirm parser; assess streaming only if required |
| Package manager | pnpm | Confirm manager and version |
| shadcn configuration | Select visually in shadcn/create | Style, primitive base, colors, radii, fonts, and icon family |
| UI icon family | One coherent family matching the preset | Choose the family; Lucide was an example, not a selection |
| Fonts | Coordinated body/heading and monospace choices | Font selection, loading, and distribution |
| Runtime versions | Compatible stable versions at implementation | Node, React, Vite, Tailwind, and dependent packages |
| Distribution | GitHub template | When to enable template status, visibility, and licensing |
| Browser coverage | Chromium in CI, small Firefox/WebKit smoke coverage | Final support and CI matrix |
| Commands and CI | See quality.md for the proposed command interface | Final script names, pipeline, and hosting configuration |

`ui-starter`, its private visibility, and the local `~/projects/ui-starter`
location are setup choices made to fulfill the request to create this spec
repository. They do not resolve the broader publication and licensing decisions.

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
