# Acceptance evidence

Verified locally October 23, 2026. The implementation plan records each phase;
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

Hosted CI verification is in progress; local acceptance is complete. This entry
will be replaced with the observed result before completion is reported.

Automated accessibility scans are a useful check, not a claim of comprehensive
accessibility conformance. Reference submissions are local simulations and reset
on reload. The default production JS bundle is about 521 kB minified / 170 kB gzip;
Vite emits its nonblocking 500 kB chunk advisory. Introduce route-level splitting
when actual app features warrant it. No backend, deployment, or publication is
included in this acceptance.
