# Development

Use Node 24.10.0 (the Node 24 LTS line) and pnpm 11.14.0. Run `pnpm install`, then
`pnpm exec playwright install chromium firefox webkit`. Linux CI also needs
`--with-deps`. Run `pnpm dev` and open the printed local URL.

`pnpm check` runs format, lint, strict TypeScript, Vitest, and production build.
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

## Design lint boundaries

Application compositions enable all five selected shadcn design rules. Installed
UI source and installed highlighter hooks keep upstream arbitrary positioning,
state variants, and component-internal styling; only no-arbitrary-values,
no-restyle, and no-unknown-classes are disabled for those exact paths. Raw colors
and static-class rules still apply. Do not broaden exceptions to app code.
Typeset and the pinned design skill are excluded from formatting to preserve
upstream provenance; the pnpm lockfile is managed by pnpm.

Later phases add the gallery, shells, reference features, and setup finalization.
The implementation plan records what is actually available.

Additional exact-path lint exceptions preserve upstream behavior: InputGroup and
Calendar pass runtime classes through public APIs; Label associates controls at
its call site; CodeBlock makes scrollable content keyboard-focusable; InputGroup's
click enhancement focuses its already keyboard-operable input. Installed compound
components use group/link semantics. use-mobile synchronizes a media query in an
effect. These exceptions do not apply to application compositions.
