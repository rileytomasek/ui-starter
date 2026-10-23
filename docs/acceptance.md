# Acceptance criteria

This checklist defines completion of the future starter implementation. All
runtime items are pending in this specification-only repository. The detailed
documents own behavior; this file provides observable acceptance checks.

## Foundation and reproducibility

- [ ] Resolve initialization choices in [the decision record](spec.md), with
  exact compatible versions and one package manager/lockfile.
- [ ] A fresh checkout installs, starts, typechecks, and produces a production
  build using documented commands.
- [ ] Record the shadcn/create preset and generation choices; component aliases,
  tokens, and stylesheet configuration match the actual implementation.
- [ ] A representative playground demonstrates coherent styling, realistic
  content, and relevant empty/loading/error states.
- [ ] Semantic tokens and variants govern normal application styling; justified
  integration exceptions are narrow and documented.
- [ ] Typeset styles compact and reading content consistently, including nested
  lists, tables, inline code, and the shared Code Block.
- [ ] Iconify icons compile through unplugin-icons to React SVG components, with
  consistent sizing and accessible usage; ordinary icons need no runtime fetch.

## Themes

- [ ] System is the default and tracks live OS changes.
- [ ] Light and Dark overrides persist; selecting System restores OS tracking.
- [ ] First paint uses the intended theme without a visible wrong-theme flash.
- [ ] Both themes cover prose, tables, forms, overlays, sidebar, and code syntax.
- [ ] Focus, selection, disabled states, and text remain readable in both modes.

## Components and examples

- [ ] Code Block uses shadcn's Shiki integration with language handling, faithful
  copy behavior and feedback, appropriate overflow, and a plain-text fallback.
- [ ] Markdown renders the documented GFM content using Typeset and shared code
  display, with explicit safe defaults for HTML and links.
- [ ] The TanStack Table example demonstrates sorting, filtering, pagination,
  selection, column visibility, row actions, and useful empty/loading states.
- [ ] The forms example demonstrates validation, descriptions, errors, pending,
  success, submission failure, and recovery, including the documented dialog
  and confirmation compositions.
- [ ] Combobox examples demonstrate keyboard search/selection, clearing,
  single/multiple selection, and empty state; async integration is documented.
- [ ] Date picker behavior, disabled dates, labels, keyboard use, and date-only
  versus timestamp boundaries are explicit and tested where custom logic exists.
- [ ] Sidebar supports desktop collapse and a usable mobile overlay with correct
  focus and dismissal behavior.
- [ ] Command palette supports the platform shortcut, search, keyboard operation,
  Escape, and real destination/actions shared with navigation.

## Shells and layouts

- [ ] A sidebar shell and a no-sidebar fixed-header shell both work with the
  shared navigation model.
- [ ] Active navigation, direct links, optional breadcrumbs, and page titles are
  consistent; placeholders do not masquerade as functional app features.
- [ ] Collection, detail, settings/form, and reading compositions are reusable
  examples that adapt to narrow screens without unnecessary abstractions.
- [ ] Header offsets, scrolling, long content, and overlays behave correctly.
- [ ] Keyboard users can reach and operate navigation and page content.

## Quality and verification

- [ ] Oxlint, selected shadcn rules, and Oxfmt are configured and pass against
  the actual project; Tailwind class sorting is enabled and verified.
- [ ] Strict TypeScript checking runs independently from the production build.
- [ ] Vitest Node tests cover meaningful custom logic where present.
- [ ] Vitest browser component tests use vitest-browser-react and the Playwright
  provider to cover the interaction risks specified in [Testing](testing.md).
- [ ] A small Playwright suite covers assembled navigation, themes, and a full
  example flow without duplicating the component suite.
- [ ] CI performs a reproducible install and runs the documented checks.
- [ ] Automated accessibility checks and manual keyboard/focus review are
  completed for representative pages and states; any limitations are recorded.
- [ ] Both themes and relevant viewport sizes receive rendered visual review.

## Documentation and handoff

- [ ] Customization recipes name real files and verified commands for tokens,
  preset, fonts, icons, themes, components, code highlighting, and navigation.
- [ ] An optional shadcn/Recharts recipe is documented; charts are not installed
  as a default dependency.
- [ ] The playground and examples can be removed using documented steps while
  preserving the foundations a consuming app needs.
- [ ] AGENTS.md and the pinned design skill are present, concise in their
  respective roles, and consistent with actual behavior and commands.
- [ ] All documentation links resolve; superseded instructions are removed or
  labeled as history; unresolved choices remain clearly identified.
- [ ] Publication, template status, and licensing are resolved before distributing
  the starter in a way that depends on those choices.
