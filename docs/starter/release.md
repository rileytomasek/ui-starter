# Acceptance evidence

Verified locally and in hosted CI October 23, 2026. The implementation plan records each phase;
this document records final acceptance and its practical limits.

## Runtime and UI

- `pnpm check`: format, Oxlint/shadcn rules, local documentation file links, strict
  TypeScript, 10 focused Vitest Node/browser tests, and production exclusion/build.
- `pnpm test:e2e`: 11 cases, including Chromium navigation/commands/theme/form
  recovery and Firefox/WebKit smoke for production, appearance, and a form.
- The full page matrix covered two shells, four patterns, two themes, and widths
  390/820/1280 (48 views). All six gallery sections were checked in both themes
  (12 more views). The final disabled-input correction was rescanned in both
  themes; all checked views have zero axe violations.
- Rendered review covered hierarchy, restrained surfaces, compact controls,
  alignment, wrapped content, overlays, visible focus, and reduced motion.
  [Desktop collection baseline](review/collection-desktop.png) and
  [mobile form baseline](review/form-mobile.png) are reviewed visual references.
  They are not an OS-dependent automated pixel-diff test.
- Keyboard checks exposed and fixed the installed Calendar day button's unattached
  focus ref and coordinated initial focus with Popover. Disabled combobox state
  now reaches the actual input. Table headers explicitly declare column scope.

## Consuming copies and agents

Four disposable setup regression cases cover missing configuration, non-mutating
preview, modified-file resolution, unrelated-file preservation, retention,
failed checks/retry, migration acknowledgments, and unsafe paths/symlinks.
A real clean copy passed install/check/build and four browser cases with gallery
and examples removed. A separate failed real run preserved edits during retry.

A fresh agent, without this conversation, configured Research Ledger from the
repository alone in an independent copy, retained the gallery/examples, previewed
and applied cleanup, and passed all available checks. It inspected stable gallery
URLs and the app at desktop/intermediate/mobile widths in both themes. Two stale
references were found and corrected in the upstream guides/gallery.

A second fresh agent entered only that finalized app and added a working review
checklist using installed Checkbox/Field and PageSection. It found purpose,
conventions, source paths, and commands without reopening setup. Its checks passed,
including 11 browser cases and four theme/viewport axe scans. No upstream code was
changed by either acceptance agent.

## Optional recipe and provenance

In a disposable copy, `pnpm ui:add chart --yes` installed shadcn 4.22.1 Chart/Card
and Recharts 3.8.0. Carbon normalization, lint, strict typecheck, production build,
and a real typed chart rendered successfully at 390/1280 in light/dark, with zero
axe violations. The dependency is absent from the default repository.

The design skill retains its exact pinned SHA-256 from [Sources](../sources.md).
CLI installation receipts and MIT/Apache/OFL notices remain available after cleanup.
The GitHub repository is private and template-enabled.

## Hosted checks and limits

Implementation revision `cc030fc552f00ad313192cab51ad95d4ef2cb298` passed
[hosted CI](https://github.com/rileytomasek/ui-starter/actions/runs/39983576775):
frozen-lockfile install, setup regression tests, the complete `pnpm check`, and
Chromium/Firefox/WebKit E2E tests. All seven phases are verified and committed;
the final documentation commit records this evidence and refreshes the setup baseline.

Automated accessibility scans are a useful check, not a claim of comprehensive
accessibility conformance. Reference submissions are local simulations and reset
on reload. The default production JS bundle is about 521 kB minified / 170 kB gzip;
Vite emits its nonblocking 500 kB chunk advisory. Introduce route-level splitting
when actual app features warrant it. No backend, deployment, or publication is
included in this acceptance.

## Strict lint follow-up

The Charlie Labs-derived configuration retains all supported explicit rules and
limits, enables type-aware linting, and composes existing shadcn integration rules.
No new exemptions were added; the obsolete mobile-hook exemption was removed.
Six effect-review warnings remain visible at the reference's warning severity,
with their external synchronization purpose documented in [Development](../development.md).

Validation after refactoring:

- `pnpm check`: no lint errors, strict TypeScript, 10 passing Vitest tests, and production build.
- `pnpm test:e2e`: all 11 application/gallery cases passed across three browsers.
- `pnpm test:setup`: all four conflict/recovery/cleanup regression cases passed.
- A temporary negative fixture was rejected for all eleven tested rule families:
  complexity, block depth, file/function length, nested callbacks, parameters,
  statements, nested ternaries, JSX depth, floating promises, and explicit any.
  The fixture was removed after checking diagnostics.
- A fresh consuming copy with two routes and no gallery/examples completed real
  install, lint/types/tests/build, seven browser cases, and final cleanup. The first
  trial caught generated navigation and test-loop violations; corrected templates
  passed in a new clean copy without manual repairs.
- Six rendered views covered tables, forms, and highlighted Markdown at 390/1280
  across both themes. Screenshots were reviewed; all had zero axe violations,
  uncaught page errors, and page-level horizontal overflow. Wide tables/code remain
  independently scrollable. The design skill remains unchanged.

The config and scripts now use native Node TypeScript. Sidebar, form, table, and
navigation internals are split by responsibility with existing public imports
preserved. Installed component source retains its original provenance. This record
supersedes the earlier lint configuration; original phase evidence above remains
historical. Hosted CI for this follow-up is recorded in GitHub on its commit.

## Compact grouped controls follow-up

Installed Toggle, Toggle Group, and Button Group using shadcn@4.22.1; reused
CLI-installed Input Group and Tabs. The [receipt](../installation.json) records the
new original hashes; [architecture](../architecture.md) explains narrow lint adaptations.
Both shells now expose search/clear, combined exact-status filtering, grouped
pagination, and local Overview/Research guide panels with responsive metadata.

Verified on October 23, 2026:

- `pnpm check`: formatting, strict lint, docs links, types, all 10 Vitest tests, and
  production build/exclusion pass. No new lint exceptions; the six existing
  external-synchronization warnings remain visible.
- `pnpm test:e2e`: 15 pass, including four new cases for both shells covering
  combined filters, reset pagination, clear/focus, required selection, and keyboard tabs.
- `pnpm test:setup`: five pass, including shared primitive/recipe retention and
  removal of the grouped-control example test when gallery cleanup is selected.
- Six rendered views at 1280px/390px across light/dark and both shells: no Axe
  violations, browser errors, or document overflow. Tables retain local horizontal
  scrolling. Reviewed spacing, grouping, disabled pagination, and metadata stacking.
- Fresh disposable consuming copy with gallery/examples removed: real finalization,
  `pnpm check`, and four cross-browser E2E cases pass. Grouped primitives and their
  API guide remain; example-specific references and tests are removed.

Vite's existing bundle-size advisory remains. Grouped-control interaction cases run
in Chromium; Firefox/WebKit retain the production/theme/form smoke coverage.
