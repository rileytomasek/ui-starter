# Implementation plan

Status: not started. This is the implementation task checklist for the upstream
starter. All boxes below are intentionally unchecked. Creating this plan does
not mean app implementation or verification has begun.

[Scope and decisions](spec.md) owns requirements and unresolved choices;
[Acceptance](acceptance.md) owns the final observable criteria. This plan owns
work order and implementation progress. Refer to the detailed specifications
instead of treating this checklist as a replacement for them.

## Tracking conventions

- Work in phase order and keep the repository runnable after each completed
  phase. Resolve prerequisites before dependent work.
- Check a task only after its implementation, relevant documentation, and
  verification are complete. Leave partial or blocked tasks unchecked and note
  the remaining work beside them.
- Update this file in the same change as completed work. At each phase exit,
  replace its evidence placeholder with concise commands/results, relevant
  commit or artifact references, and any explicit limitations.
- Keep tests, gallery examples, and usage instructions alongside each feature.
  Do not defer all documentation or verification to the final phase.
- Record decisions in the decision record, actual commands in the quality guide,
  and implementation progress here. Avoid competing status narratives.
- If paths move during implementation, update links in this plan and its
  consumers. This plan is temporary starter material in consuming app copies
  and is removed by finalization; retain it in the upstream starter repository.

## Phase 1 — Resolve initialization choices and compatibility

Goal: establish a reproducible foundation before committing to integrations.
See [Scope](spec.md), [Customization](customization.md), and [Sources](sources.md).

- [ ] Confirm package manager, Node version, router, and compatible core versions.
- [ ] Select the shadcn/create preset, primitive base, fonts, and icon family;
  record the preset, generation command, and customization boundaries.
- [ ] Confirm forms/validation and Markdown libraries before their feature work.
- [ ] Prove shadcn Code Block, Shiki, and Typeset work together in a minimal spike.
- [ ] Prove static Iconify/unplugin-icons React imports and custom SVG support.
- [ ] Verify Oxlint with the chosen shadcn rules and Oxfmt Tailwind sorting;
  record supported versions and any narrowly justified exceptions.
- [ ] Set the initial browser/CI targets and distinguish initial app choices
  from stack defaults that consuming agents should normally reuse.
- [ ] Update the decision record and resolve blockers; keep publication and
  licensing explicitly deferred until their release gate if still undecided.

Exit: initialization is reproducible and the unusual integrations have been
executed successfully. Spikes can be reused or removed after their evidence is
captured; they must not leave a second app/toolchain in the starter.

Evidence: pending.

## Phase 2 — Runnable repository and verification workflow

Depends on Phase 1. See [Quality](quality.md), [Testing](testing.md), and
[Agent guidance](agent-guidance.md).

- [ ] Initialize Vite, React, strict TypeScript, Tailwind, and shadcn with the
  selected versions, aliases, and a committed lockfile.
- [ ] Establish predictable directories for app code, shared UI, gallery/examples,
  temporary setup material, and retained documentation; define ownership clearly.
- [ ] Configure Oxlint, shadcn rules, Oxfmt class sorting, and separate typechecking.
- [ ] Implement the documented non-interactive dev/build/check commands and
  explicit watch modes, with actionable failures and prerequisite instructions.
- [ ] Configure Vitest Node and real-browser React projects with the Playwright
  provider; add an actual render/interaction smoke test without inventing logic
  solely to populate a Node suite.
- [ ] Configure a minimal Playwright application smoke test and reproducible CI,
  including browser installation and useful failure artifacts.
- [ ] Update README/AGENTS.md with actual paths and working commands, and verify
  install, development startup, checks, and production build from a fresh checkout.

Exit: an agent can install, run, inspect, and check a minimal app without hidden
setup. CI runs the checks that exist; later phases expand meaningful coverage.

Evidence: pending.

## Phase 3 — Visual foundation and initial UI gallery

Depends on Phase 2. See [Foundations](foundations.md) and
[Documentation requirements](documentation.md).

- [ ] Implement semantic tokens, typography, density, radii, surfaces, layering,
  and the primitive controls needed by subsequent features.
- [ ] Implement Light/Dark/System mode, persisted choices, live OS updates,
  first-paint initialization, and native-control color-scheme behavior.
- [ ] Add compact/reading Typeset presets and the configured font loading/fallbacks.
- [ ] Implement static icon imports, small Icon/IconButton helpers, custom SVG
  usage, and consistent generated-component icons with accessible naming.
- [ ] Build gallery navigation with search, stable example URLs, theme switching,
  copyable snippets, and source/documentation references.
- [ ] Populate theme, typography, icon, and initial component sections using the
  actual tokens/components/providers and representative interaction states.
- [ ] Separate gallery routes and fixtures from production app imports; verify
  default production exclusion and document an explicit preview/test target.
- [ ] Test theme behavior and relevant helpers; review both themes, keyboard
  focus, reduced motion, and mobile/desktop rendering.
- [ ] Publish actual customization recipes and run an early agent exercise:
  locate a component, adjust a variant, open its example, and verify the result.

Exit: a coherent visual system and useful inspection surface exist before more
components are built. Correct discoverability problems exposed by the exercise.

Evidence: pending.

## Phase 4 — Shells, navigation, and page structure

Depends on Phase 3. See [Layouts](layouts.md) and [Components](components.md).

- [ ] Implement routing and one shared definition for destinations, labels, icons,
  and active-state matching; support direct links and refresh behavior.
- [ ] Build the no-sidebar fixed-header shell with mobile navigation, content
  offsets, anchor spacing, and shared appearance controls.
- [ ] Build the sidebar shell with desktop collapse persistence, independent
  mobile overlay state, accessible collapsed labels, and dismissal/focus behavior.
- [ ] Integrate the command palette with real destinations/actions, Cmd/Ctrl+K,
  search/empty states, keyboard operation, and appropriate focus restoration.
- [ ] Add small page header/content/section/toolbar pieces and provisional
  collection, detail, settings, and reading compositions.
- [ ] Implement landmarks, skip-to-content, route focus behavior, and responsive
  actions/overflow; demonstrate both shells through stable gallery URLs.
- [ ] Add focused interaction and navigation tests, review keyboard/mobile use,
  and document adding a route, destination, command action, and page layout.

Exit: both shells navigate real routes and support accessible responsive use.
Refine inner-page compositions with actual content in Phase 5.

Evidence: pending.

## Phase 5 — Substantial components and reference pages

Depends on Phase 4. Build each chain in the order below. See
[Components](components.md), [Layouts](layouts.md), and [Testing](testing.md).

### Code, Markdown, and reading/detail pages

- [ ] Integrate shadcn Code Block/Shiki with filename/actions, faithful copying,
  theme handling, optional line numbers, overflow, and plain-text failure fallback.
- [ ] Implement Markdown with GFM content, safe HTML/URL defaults, Typeset presets,
  and the shared code display; handle wide content and long links.
- [ ] Complete reading and detail examples with realistic content and responsive
  metadata; add relevant tests, gallery entries, usage and extension recipes.

### Inputs, full forms, and settings pages

- [ ] Build single/multi-select combobox examples with search, clearing, disabled
  and empty states; document async search and stale-request handling.
- [ ] Build the single-date picker with labels, clearing, disabled dates,
  validation, keyboard use, and an explicit date-only value contract.
- [ ] Integrate a coherent full form with defaults, validation timing, field/form
  errors, reset, pending state, success, failure, and input-preserving recovery.
- [ ] Add dialog-form and destructive-confirmation compositions with meaningful
  pending/error states and focus handling; complete the settings page example.
- [ ] Add browser interaction tests, useful Node tests for owned logic, gallery
  states, and recipes for adding fields and replacing local submission behavior.

### Data table and collection pages

- [ ] Build typed TanStack columns, sorting/filtering/pagination, selection scope,
  column visibility, row actions, and loading/empty/no-results states.
- [ ] Complete the collection page, toolbar, formatting/alignment, and overflow;
  keep the client-side data boundary and extension points explicit.
- [ ] Test relevant behavior and document adding columns, actions, and data;
  avoid turning the example into a universal table framework.

### Composition review

- [ ] Complete all gallery sections and exercise the four page patterns in both
  shells, themes, and relevant viewport sizes with realistic edge cases.
- [ ] Refine shared pieces based on repeated actual use; reconcile component APIs,
  lint exceptions, tests, usage snippets, and documentation in the same changes.

Exit: all agreed components work as coherent compositions, with observable
states, focused tests, and discoverable extension instructions.

Evidence: pending.

## Phase 6 — Guided setup and application finalization

Depends on Phases 2–5; directory ownership was established in Phase 2. See
[Setup transition](setup-transition.md) for the full behavioral contract.

- [ ] Implement the temporary setup entry point and explicit configuration record
  covering app identity, visual choices, shell/navigation, and example retention.
- [ ] Separate temporary guides/specs from retained app guides; preserve design
  skill provenance, source attribution, and enduring conventions before cleanup.
- [ ] Define an explicit bounded cleanup manifest and baseline comparison for
  modified examples/instructions; support keep/migrate/remove resolutions.
- [ ] Implement non-mutating preview and non-interactive apply, configuration
  validation, path constraints, and exact reporting of proposed changes.
- [ ] Produce app-specific README/AGENTS.md and reconcile routes/imports/scripts,
  dependencies/lockfile, retained gallery/docs, and obsolete links.
- [ ] Implement recoverable failure/retry behavior and completion checks; remove
  one-off tooling only after success and document its command lifecycle.
- [ ] Test disposable repositories for missing configuration, preview, successful
  cleanup, modified-file conflicts, retention, unrelated work, and failed retries.
- [ ] Run setup/finalization on a real consuming copy; verify the app still works,
  production exclusions hold, and no active starter instructions remain.

Exit: configuration ends in a verified application repository with clear app
identity and recoverable changes. The upstream starter remains intact.

Evidence: pending.

## Phase 7 — Agent acceptance, hardening, and handoff

Depends on all earlier phases. See [Acceptance](acceptance.md) for the complete
release checklist; this phase closes gaps rather than starting documentation.

- [ ] Complete the retained setup-independent usage/architecture/customization
  guides and verify their exact paths, imports, examples, commands, and links.
- [ ] Validate the optional shadcn/Recharts recipe in a disposable copy; keep
  charts out of the default dependencies and distinguish open optional choices.
- [ ] Run an agent with no prior conversation context through a consuming copy's
  setup/finalization, then use a fresh task to extend the finalized app from its
  retained instructions; fix problems and recheck the affected steps.
- [ ] Complete end-to-end navigation/theme/form coverage, accessibility scans,
  manual keyboard/focus review, both-theme responsive review, and browser checks
  for the selected support matrix; add only useful stable visual baselines.
- [ ] Verify a clean install, CI, production build, and setup-tool/gallery removal
  behavior; confirm retained skill provenance and required attribution.
- [ ] Reconcile every acceptance item with evidence; record limitations honestly,
  resolve stale guidance, and leave unverified requirements unchecked.
- [ ] Resolve distribution/licensing decisions and prepare the documented copy
  workflow. Change visibility, template status, or publication only within the
  user's authorized scope; otherwise record release as deferred.
- [ ] Record the completed revision, validation results, and remaining issues;
  remove temporary implementation spikes and confirm the intended repository state.

Exit: an agent can produce and maintain a coherent app using the repository
alone, all required acceptance is verified, and any deferred release actions are
clearly distinguished from implementation completion.

Evidence: pending.

## Milestones

| Milestone | Required phases | Observable result |
| --- | --- | --- |
| Inspectable foundation | 1–3 | Runnable visual foundation, gallery, checks, and an early agent exercise |
| Complete reference UI | 4–5 | Both shells and all agreed components/patterns work together |
| Application transition | 6 | Consuming copies shed starter context safely |
| Verified starter | 7 | Fresh-agent acceptance and full handoff criteria are satisfied |
