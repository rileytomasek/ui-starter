# Testing and visual verification

Use three layers with distinct responsibilities. Test behavior added by this
starter and the way components are integrated. Avoid duplicating upstream
component-library tests or writing assertions that merely mirror implementation.

## Vitest in Node

Use Node tests for meaningful pure logic: filtering helpers, command matching,
formatting rules, date conversions, or validation logic when the starter owns
them. Do not invent utilities simply to have unit tests, or test trivial wrappers
and static class strings.

## Vitest browser components

Use Vitest Browser Mode with `vitest-browser-react` and its Playwright provider.
Render components in a real browser and drive them through accessible roles,
names, and user interactions. React Testing Library with jsdom is not the initial
default. Keep Node and browser projects clearly separated in configuration.

Cover representative behavior and the integration risks:

- Forms: labels and descriptions, validation, field errors, pending submission,
  successful completion, failed submission, and recovery without lost input.
- Combobox: search, keyboard selection, no results, clearing, and applicable
  multi-selection behavior.
- Date picker: selected value, disabled dates, keyboard interaction, dismissal,
  and the documented date-only semantics.
- Dialogs and command palette: opening, focus placement, keyboard navigation,
  Escape, action execution, and focus restoration where appropriate.
- Data table: sorting, filtering, pagination, selection scope, and empty state.
- Code display: faithful text copying, feedback, unsupported-language fallback,
  and overflow behavior where practical to assert.
- Markdown: representative GFM rendering, shared code-block integration, and
  safe handling of raw HTML and unsafe URLs.

Exercise portals and real focus behavior. Use deterministic fixtures and scoped
mocks at external boundaries. Wait for observable outcomes instead of arbitrary
timeouts. Share setup that removes repetition, without hiding what a test does.

## Playwright application flows

Keep a smaller end-to-end suite for behavior that depends on the assembled app:

- Both shells render and navigate correctly; direct URLs and active navigation
  work, including mobile sidebar behavior.
- The command shortcut opens the palette and a destination action navigates.
- System theme follows the OS, a manual choice persists across reload, returning
  to System resumes automatic switching, and initial rendering uses the expected
  theme without a visible wrong-theme flash.
- One complete example flow exercises form validation, submission, and recovery
  or confirmation in its page context.

Do not repeat every component case here. Use the built app when checking build
integration. Since the gallery is excluded from production by default, run its
example flows against an explicit gallery preview build or the development
server, and state which target was tested. Separately verify that the default
production build excludes gallery routes and example modules. Keep fixtures
independent of the production app.
Run the main suites in Chromium and a small Firefox/WebKit smoke suite for
navigation, themes, and a representative form interaction. Commands and CI
responsibilities are owned by [Code quality](quality.md).

## Accessibility and visual review

Include automated accessibility checks for representative pages and interaction
states. Also manually review keyboard navigation, visible focus, focus trapping
and restoration, accessible names, contrast, and reduced-motion behavior.
Automated scans alone do not establish accessibility conformance.

Render and review both themes at narrow mobile, intermediate, and desktop
widths. Use long labels, wrapped text, dense tables, empty content, errors, and
loading states. Check composition, alignment, density, readability, overflow,
fixed-header offsets, and overlay placement against the interface-design skill.

Introduce a small set of screenshot baselines after the visual defaults are
stable. Review intentional changes rather than blindly updating snapshots.
Do not block initial work on a broad visual-regression service or extensive
snapshot matrix.

## Setup finalization verification

Test the finalizer against disposable repository fixtures. Cover preview without
mutation, missing required choices, a successful application transition, modified
example conflicts, explicit retention, unrelated file preservation, partial
failure/retry, and checks failing before completion. Verify dependency/import/link
cleanup and that one-off tooling is removed only after successful verification.
These tests protect a file-removal workflow; do not run them destructively on the
upstream starter checkout.

Also exercise a real consuming copy through setup and finalization. Run its
normal checks and inspect the app. Use a fresh agent task to verify that retained
instructions describe the app, support a representative change, and do not lead
back into starter setup. This can satisfy the existing agent-authoring acceptance
exercise rather than requiring a duplicate evaluation framework.

## Reporting verification

Report the checks actually run and their outcomes. Keep runtime tests, automated
accessibility checks, and human visual review distinct. An unavailable browser
or unreviewed theme remains unverified. The current repository is specification
only, so all runtime acceptance remains pending.
