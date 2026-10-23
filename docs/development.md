# Development

Use Node 24.10.0 (the Node 24 LTS line) and pnpm 11.14.0. Run `pnpm install`, then
`pnpm exec playwright install chromium firefox webkit`. Linux CI also needs
`--with-deps`. Run `pnpm dev` and open the printed local URL.

`pnpm check` runs format, lint, local documentation links, strict TypeScript, Vitest, and production build.
`pnpm test:e2e` runs the production application smoke suite in three browsers.
`pnpm test` is finite; `pnpm test:watch` explicitly watches. Build output is in
dist; `pnpm preview` serves it. Browser launch or missing browser binaries are
environment failures, not evidence that interactions passed.

## Source map

- src/components/ui: CLI-installed shadcn source; preserve upstream APIs.
- src/hooks and src/lib: shared integration logic, including installed Shiki code.
- src/index.css: semantic tokens; src/typeset.css: official Typeset stylesheet.
- src/App.tsx: application entry composition; src/main.tsx: React root.
- src/assets/icons: custom SVG inputs; use static ~icons/local/name imports.
- tests/e2e: application browser tests; *.browser.test.tsx: Vitest browser tests.
- docs/installation.json: original CLI commands and source hashes.

## Strict lint contract

`pnpm lint` uses [oxlint.config.ts](../oxlint.config.ts), adapted from
[Charlie Labs' configuration](https://github.com/charlie-labs/ch-pr/blob/e0c6d198c68470ae272689f882b738b57fda2a4b/oxlint.config.ts).
Correctness, suspicious, pedantic, and performance categories are errors, with
import, promise, React, TypeScript, Unicorn, Oxc, and accessibility plugins.
`oxlint-tsgolint` enables type-aware rules; do not remove it or disable type-aware
mode. The Node TypeScript project includes the build scripts and lint config.
Node 24 runs the scripts' erasable TypeScript directly.

| Constraint                                                       | Maximum |
| ---------------------------------------------------------------- | ------- |
| Classic cyclomatic complexity                                    | 10      |
| Block nesting                                                    | 3       |
| File lines, excluding blank lines/comments                       | 300     |
| Function lines, excluding blank lines/comments (including IIFEs) | 60      |
| Nested callbacks                                                 | 3       |
| Parameters                                                       | 4       |
| Statements per function                                          | 25      |
| JSX depth                                                        | 5       |

The config also forbids nested ternaries, parameter reassignment, unsafe type
assertions, explicit `any`, non-null assertions, unhandled/misused promises,
import cycles, namespace imports, unstable nested components, and array-index keys.
Split by responsibility and preserve public APIs; do not compress code, raise
limits, add suppression comments, or exclude files to evade these checks.
This applies to installed components too: retain their CLI provenance and refactor
locally without replacing primitives. New CLI additions must pass the same checks.

The upstream's retired `react/react-compiler` rule is replaced by current Oxlint's
[compiler correctness rules](https://oxc.rs/blog/2026-08-18-react-compiler-support).
The two effect-review rules retain upstream `warn` severity. `pnpm lint` reports
warnings visibly and fails on errors or unused disable directives. The six current
`useEffect` warnings are reviewed external synchronizations: command/sidebar
keyboard subscriptions, route/calendar DOM focus, clipboard-reset timers, and
asynchronous Shiki loading. Each has cleanup where needed. New effects require the
same review; derived state belongs in render, event-driven work in handlers, and
external snapshots in `useSyncExternalStore`. Mobile detection uses that snapshot API.

## Design lint boundaries

The retained [design config](../config/oxlint-design.ts) adds the five shadcn rules
and the existing narrow integration exceptions below. It does not relax the
structural or type-safety limits above.

Application compositions enable all five selected shadcn design rules. Installed
UI source and installed highlighter hooks keep upstream arbitrary positioning,
state variants, and component-internal styling; only no-arbitrary-values,
no-restyle, and no-unknown-classes are disabled for those exact paths. Raw colors
and static-class rules still apply. Do not broaden exceptions to app code.
Typeset and the pinned design skill are excluded from formatting to preserve
upstream provenance; the pnpm lockfile is managed by pnpm.

See [Components](components.md) and [Layouts](layouts.md) for reference features.
[Architecture](architecture.md) records current boundaries and app choices.

Additional exact-path lint exceptions preserve upstream behavior: InputGroup and
Calendar pass runtime classes through public APIs; Label associates controls at
its call site; CodeBlock makes scrollable content keyboard-focusable; InputGroup's
click enhancement focuses its already keyboard-operable input. Installed compound
components use group/link semantics. These exceptions do not apply to application compositions.

TanStack Table v8 returns mutable instance methods incompatible with React Compiler
optimization. The exact ProjectTable file disables react/incompatible-library; this
app does not enable React Compiler. Revisit that integration before enabling it.

Markdown table regions are keyboard-focusable so wide content can be scrolled.
The exact Markdown file permits tabindex on that labelled region.

## Choose the verification layer

Use Node tests for owned pure logic (date-only conversion is the current example).
Use `*.browser.test.tsx` with vitest-browser-react for component integration: import
the real stylesheet, render the relevant providers, and interact by accessible
roles/names. Browser files are separate from Node tests in vitest.config.ts.
Use Playwright for assembled routing, appearance, and page flows; gallery cases
run against the explicit preview on port 4174, production cases on 4173.
Do not start another server on those ports while testing. Chromium is primary;
Firefox/WebKit smoke cover navigation and theme; the reference suite also covers
a representative form when examples are retained.

`pnpm docs:check` checks local file links (not external availability or fragment IDs).
Rendered review is still required: automated axe checks do not establish full
accessibility conformance. Review focus, overlays, long content, loading/empty/error
states, mobile/intermediate/desktop widths, and reduced motion in both themes.

When installing a Base UI component, include its new package subpaths in
vite.config.ts optimizeDeps.include. This prevents dependency discovery from reloading
Vitest browser sessions midway through a test (Toggle/Toggle Group are included).
