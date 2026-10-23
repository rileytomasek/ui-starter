# Code quality

Use Oxlint for linting, Oxfmt for formatting, and TypeScript for strict type
checking. The pinned versions and actual configuration are recorded in the lockfile and
[development guide](../development.md). Do not add ESLint or Prettier as parallel default
toolchains.

## Oxlint and shadcn rules

Integrate `@shadcn/lint` through Oxlint's supported JavaScript plugin mechanism.
Verify the selected versions together. Use the strict Charlie Labs-derived configuration and all structural limits
recorded in [Development](../development.md#strict-lint-contract). Type-aware
safety checks apply to app code, installed components, tests, and tooling. Fix
violations instead of adding exemptions or raising limits.

The following design rules are enabled alongside the strict general rules:

| Rule                     | Intended purpose                                                      |
| ------------------------ | --------------------------------------------------------------------- |
| `no-raw-colors`          | Encourage semantic theme colors                                       |
| `no-unknown-classes`     | Catch invalid utility names against the actual stylesheet             |
| `require-static-classes` | Keep utility classes statically discoverable                          |
| `no-arbitrary-values`    | Prefer the shared scale where it expresses the design                 |
| `no-restyle`             | Encourage variants instead of repeatedly overriding shared components |

Verify exact rule names and options against the selected release. Component
implementations, consumer compositions, and generated integrations may require
different scopes. For example, positioning calculations and Shiki output may
legitimately use runtime styles, while ordinary application colors should use
tokens. Document narrow exceptions with a reason. Do not globally disable a rule
because one integration needs an exception, or force opaque abstractions merely
to satisfy lint.

## Oxfmt

Format supported source and documentation files consistently. Enable Oxfmt's
Tailwind sorting explicitly and point it at the actual stylesheet and utility
functions such as `cn` and `clsx` where supported. Verify the final configuration
with the selected release. Do not add a Prettier Tailwind plugin.

Keep generated outputs and dependency folders outside formatter scope. Preserve
the exact pinned upstream design skill, or explicitly record a reviewed local
adaptation instead of silently reformatting it and claiming it is unchanged.

## Types and code structure

Enable strict TypeScript checking. Run it separately from Vite's build and the
linter; a successful bundle does not establish type correctness. Prefer familiar
React composition, small modules, and explicit state ownership. Share logic when
it repeats or enforces a meaningful contract, not to create a generic framework
around every example.

Checks must support unattended agent execution: provide non-interactive,
finite commands with meaningful exit codes and actionable file-level diagnostics.
Keep watch mode explicit. Document required environment and setup failures so
an agent can distinguish a code failure from a missing prerequisite. Prefer
one discoverable command contract to undocumented IDE-only actions.

## Required command contract

The package manifest implements these commands with pnpm 11.14.0.
[Development](../development.md) owns current prerequisites and lint exceptions.
Gallery and finalization commands are implemented; see the getting-started guide.

| Required command    | Responsibility                                                              |
| ------------------- | --------------------------------------------------------------------------- |
| `pnpm dev`          | Run the Vite development app and UI gallery                                 |
| `pnpm build`        | Produce the production app bundle                                           |
| `pnpm preview`      | Serve the built app locally                                                 |
| `pnpm format`       | Apply Oxfmt formatting                                                      |
| `pnpm format:check` | Check formatting without mutation                                           |
| `pnpm lint`         | Run Oxlint and the configured shadcn rules                                  |
| `pnpm typecheck`    | Run strict TypeScript checks                                                |
| `pnpm test`         | Run Vitest Node and browser component projects once                         |
| `pnpm test:watch`   | Run the relevant Vitest projects interactively                              |
| `pnpm test:e2e`     | Run the small Playwright application suite                                  |
| `pnpm check`        | Run formatting check, lint, docs links, types, Vitest, and production build |

The required setup finalization command is specified in
[Setup transition](setup-transition.md#finalization-command). It belongs to the
temporary setup workflow; remove its package script when successful finalization
removes the tooling. Keep ordinary app checks available afterwards.

Document browser installation and local prerequisites alongside the actual
scripts. An optional Vitest UI command is useful only if added deliberately;
the Vitest UI dashboard is distinct from testing rendered UI components.

## CI

Use a reproducible install with the chosen lockfile and runtime. CI must run
the aggregate checks and the Playwright application suite, installing the
required browser binaries. Browser component tests are part of Vitest; do not
accidentally run the same suite twice under separate labels.

Run the main suites in Chromium, with a small Firefox and WebKit smoke suite
covering navigation, themes, and a representative form interaction. Retain useful
failure output,
including browser traces or screenshots where appropriate. Keep the suite small
and reliable; do not introduce a blanket coverage percentage as a substitute
for [meaningful acceptance](acceptance.md).
