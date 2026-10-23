# Implementation decisions and evidence

## Phase 1: verified foundation

The official shadcn/create CLI generated a disposable Vite app. Its source will
be carried into this repository in Phase 2; components were installed by the CLI,
not reconstructed. [Installation receipt](installation.json) records commands
and original source hashes. Later local adaptations must be documented.

- Preset: Nova, Base UI, neutral semantic palette, subtle menu accent.
- Radius: retain Nova's 0.625rem baseline; compact controls use its sizes.
- Fonts: self-hosted IBM Plex Sans (400/500/600) and IBM Plex Mono (400/500).
- Icons: IBM Carbon through @iconify-json/carbon and unplugin-icons.
  The CLI supports Lucide generation, so narrowly replace those imports after
  installation; do not change the primitive behavior. Keep components.json's
  supported iconLibrary value and run the documented adaptation for additions.
- Runtime: Node 24 LTS line; verified with 24.10.0. Package manager: pnpm 11.14.0.
- React 19.3, Vite 8.3, TypeScript 6.0, Tailwind 4, Base UI 1.9.
- React Router 8 declarative API; React Hook Form 7.90, Zod 4.6 and resolver 6.
- react-markdown 10.1 and remark-gfm 4.0.
- TanStack Table 8: retain the stable API used by the shadcn table recipe instead
  of adopting the new v9 table API during initial implementation.
- Vitest 5.0.5, vitest-browser-react 2.3, Playwright 1.64.1.
- Oxlint 1.89.0, @shadcn/lint 0.2.3, Oxfmt 0.74.0.

All required primitives and sidebar-07 installed successfully with CLI 4.22.1.
The CLI help's base-nova example is not a valid preset argument; use `--preset nova`
and `--base base`. Generated components.json correctly records `base-nova`.
Typeset was obtained from the official stylesheet endpoint described by its
builder; its source is separate from component CLI installation.

Verification in the disposable app: strict `tsc -b`, Vite production build,
Oxlint with all five selected design rules, and Oxfmt with stylesheet-aware
Tailwind sorting passed. A negative lint probe rejected raw colors and arbitrary
padding. Chromium, Firefox, and WebKit each rendered the installed Code Block
with actual Shiki tokens, loaded Typeset styles, rendered static Carbon and custom
SVG imports, and produced no page errors. This is compatibility evidence, not
acceptance of the eventual application UI.

The live design gist was reread and matches the pinned skill hash. Revisit that
skill at every UI phase and before rendered review.

## License custody

MIT covers starter-owned code. Preserve upstream MIT notices for shadcn source,
Apache-2.0 for Carbon icons, and OFL-1.1 for IBM Plex fonts. Phase 2 adds retained
notice files; finalization must preserve them. Source provenance stays available
in consuming apps after temporary starter specifications are removed.

## Phase 3: visual system

Installed UI icon imports now use Carbon via scripts/carbon-icons.mjs; no primitive
was replaced. Fonts are IBM Plex Sans/Mono. The light muted-foreground token was
lowered to oklch(0.50 0 0) after axe measured the upstream pair at 4.34:1.
The four light/dark mobile/desktop gallery scans now pass. Theme E2E verifies
live OS changes, persisted overrides, returning to System, and pre-React paint.
Gallery modules are compiled out of default production; the build asserts this.
