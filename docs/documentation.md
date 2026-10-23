# Documentation requirements

The implemented starter must ship practical Markdown documentation in `docs/`
primarily for coding agents using, customizing, and extending it. Human readers
are also supported; the [authoring priority](spec.md#authoring-priority) resolves
conflicts. Documentation is part of the deliverable. The current specification
files describe intended behavior; they do not substitute for verified usage
instructions once code exists.

## Agent-oriented documentation contract

Optimize for an agent entering the repository without prior conversation context.
Use a short entry point and focused, linked guides that can be read independently
for a task. Markdown, explicit headings, consistent terminology, exact paths and
export names, and text-searchable examples are the default navigation interface.
Do not require browsing the gallery to discover essential implementation facts.

For common tasks, state the preferred approach first, then provide:

- Preconditions and the existing component or pattern to reuse.
- Exact files, imports, types, and extension points involved.
- A minimal complete example that works with the selected versions.
- The commands to run and observable success criteria.
- Important constraints, common mistakes, and justified exceptions.

Keep instructions self-contained enough to act on without relying on a human to
infer missing setup or choose among undocumented alternatives. Link to shared
contracts instead of copying them. Clearly label recommendations, open decisions,
and implemented behavior. Prefer useful precision over tutorial storytelling or
a polished documentation website. Add machine-readable metadata only when a
concrete workflow needs it; Markdown and source remain sufficient initially.

## Required coverage

The final file organization can follow the implementation. Cover these subjects
with a clear README index and one authoritative explanation for each:

| Guide | Required content |
| --- | --- |
| Getting started | Prerequisites, installation, development, build, checks, and opening the UI gallery; copy/rename steps for a new app |
| Architecture | Actual directory map, providers, routing, shared components, examples, styling ownership, and where app-specific code belongs |
| Customization | shadcn/create choices, tokens, light/dark/system mode, fonts, Typeset, density, radii, icons, and component variants |
| Components and patterns | Working usage examples for the included components; value contracts, important states, and composition guidance |
| Layout and navigation | Choosing a shell, adding a page, shared destinations, page patterns, responsive behavior, and command actions |
| UI gallery | Browsing themes, typography, components, patterns, layouts, and icons; adding an example; production exclusion and removal |
| Extensions | Preferred approaches for optional capabilities, starting with shadcn charts and Recharts |
| Quality and testing | Actual lint/format/typecheck/test commands, when to use each test layer, and rendered review expectations |
| Agent guidance | A concise AGENTS.md entry point and pinned design skill, directing agents to task-specific authoritative guides |

These are coverage requirements, not a requirement to create a separate file for
every row. Keep documentation concise and organized around tasks. Link to
upstream API references instead of reproducing complete library manuals.

## Usage and extension recipes

A recipe must explain when to use the existing foundation, which real files to
edit, a minimal working example, and how to verify the result. Include relevant
accessibility, responsive, theme, and content-state considerations. Link to its
live gallery example when one exists. Keep snippets aligned with the actual
component API and installed package versions.

Document how to add a shadcn component, a component variant, an Iconify icon or
custom SVG, a page and navigation destination, a form field, a table column, and
a Markdown/code-rendering customization. Link to [Customization](customization.md)
for the detailed requirements rather than duplicating its recipes here.

## Optional capabilities

Make the distinction between installed defaults, recommended optional additions,
and unresolved app-specific choices explicit. An optional recommendation is not
a requirement to install that dependency.

Charts are the first required optional recipe: prefer the shadcn chart components
with Recharts, as detailed in [Customization](customization.md#add-charts-only-when-needed).
For another optional capability, record a preferred library only after it is
selected for a concrete need. Otherwise state that the choice is open. Backend,
authentication, data access, deployment, rich-text editing, uploads, and other
out-of-scope features do not acquire mandatory dependencies through this guide.

For each selected optional addition, explain:

- When it is useful and when the included components already suffice.
- The preferred integration and why it fits the starter.
- Dependencies and verified setup commands, with links to official docs.
- How it uses shared tokens, themes, icons, layouts, and accessibility conventions.
- A minimal example, meaningful verification steps, and important limitations.

## Maintenance and acceptance

When implementation replaces a proposal, update the guide and decision record
together. Keep historical planning clearly labeled or separate from current
usage instructions. Do not leave competing descriptions of the current API.

Changes to behavior, dependencies, commands, or configuration must update the
affected docs, examples, and agent guidance in the same task. Verify local links
and relevant commands/examples before completion. If an optional recipe cannot
be validated against the selected versions, label that limitation explicitly.

The README and AGENTS.md should let an agent starting with no conversation
context find the relevant guide, run the app and gallery, and locate verification
commands. Humans can use the same documentation. A separate documentation site
is not required.
