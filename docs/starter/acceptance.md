# Acceptance criteria

This checklist records acceptance of the implemented starter. See [evidence](release.md). The
implementation plan records incremental evidence; this checklist is reconciled
against the complete feature set in the final acceptance phase. The detailed
documents own behavior; this file provides observable acceptance checks.

## Agent authoring

- [x] README and AGENTS.md identify agents as the primary authors and link to
      the explicit priority rule for conflicts with human developer convenience.
- [x] From repository instructions alone, an agent in a fresh task can locate
      the relevant implementation, add a page using an existing layout/component,
      and run the relevant checks without undocumented human setup or prior chat.
- [x] That task also demonstrates finding a gallery example by stable URL and
      inspecting the rendered result. Record obstacles and correct the guidance or
      workflow before considering the starter complete.
- [x] Common extension recipes identify exact files, imports, contracts, working
      examples, verification commands, and observable success criteria.
- [x] Automated checks offer non-interactive execution and actionable failures;
      essential guidance is available in searchable local Markdown and source.
- [x] Agent-oriented choices preserve end-user usability, accessibility, visual
      quality, and responsiveness. No separate agent-evaluation framework is required
      for this initial practical acceptance exercise.

## Setup and application transition

- [x] One temporary setup entry point covers app identity, visual choices, shell,
      navigation, example retention, verification, and finalization. Established
      stack defaults are distinguished from app-specific choices.
- [x] Temporary guides/specifications live separately from retained app guidance;
      the consuming-copy finalizer leaves the upstream starter specification intact.
- [x] The finalizer supports a non-mutating preview and non-interactive apply with
      explicit configuration and resolutions for modified-file conflicts.
- [x] Cleanup uses bounded, known paths and transformations, preserves unrelated
      work, reconciles dependencies/imports/scripts, and leaves reviewable Git changes.
- [x] Failure/retry behavior is tested; completion is recorded only after checks
      pass, and setup tooling remains available until recovery no longer needs it.
- [x] Finalized README and AGENTS.md describe the app and link to retained docs;
      temporary instructions, starter specs, discarded fixtures, and obsolete links
      are removed. Skill provenance and required attribution remain available.
- [x] Gallery retention is explicit; any retained gallery is documented as an
      app development tool and remains excluded from production by default.
- [x] A fresh agent can work on the finalized app without prior chat context or
      being prompted to configure a template again. Removed starter history is not
      kept as an active archive inside the app.

## Foundation and reproducibility

- [x] Implement the confirmed stack in [the decision record](spec.md), recording
      the visual preset and exact compatible versions with pnpm and its lockfile.
- [x] A fresh checkout installs, starts, typechecks, and produces a production
      build using documented commands.
- [x] Record the shadcn/create preset and generation choices; component aliases,
      tokens, and stylesheet configuration match the actual implementation.
- [x] The UI gallery covers theme, typography, components, patterns, layouts,
      and icons using the actual components, tokens, and providers.
- [x] Searchable gallery navigation, stable example links, theme switching, and
      copyable usage snippets work with realistic content and interaction states.
- [x] Default production builds exclude gallery routes and example modules;
      consuming app behavior does not depend on them.
- [x] Semantic tokens and variants govern normal application styling; justified
      integration exceptions are narrow and documented.
- [x] Typeset styles compact and reading content consistently, including nested
      lists, tables, inline code, and the shared Code Block.
- [x] IBM Carbon icons from Iconify compile through unplugin-icons to React SVG
      components, with consistent sizing and accessible usage; ordinary icons need
      no runtime fetch.

## Themes

- [x] System is the default and tracks live OS changes.
- [x] Light and Dark overrides persist; selecting System restores OS tracking.
- [x] First paint uses the intended theme without a visible wrong-theme flash.
- [x] Both themes cover prose, tables, forms, overlays, sidebar, and code syntax.
- [x] Focus, selection, disabled states, and text remain readable in both modes.

## Components and examples

- [x] UI components originate from shadcn CLI installation with the configured
      preset/base; installation commands and sources are recorded and no handwritten
      replacements or manually reconstructed primitives are used.
- [x] Custom code composes the installed components; any local source adaptations
      are narrow, documented, and preserve their interaction/accessibility behavior.
- [x] Finalized app instructions retain the CLI-installation requirement and
      working component-addition recipe.

- [x] Code Block uses shadcn's Shiki integration with language handling, faithful
      copy behavior and feedback, appropriate overflow, and a plain-text fallback.
- [x] Markdown renders the documented GFM content using Typeset and shared code
      display, with explicit safe defaults for HTML and links.
- [x] The TanStack Table example demonstrates sorting, filtering, pagination,
      selection, column visibility, row actions, and useful empty/loading states.
- [x] The forms example demonstrates validation, descriptions, errors, pending,
      success, submission failure, and recovery, including the documented dialog
      and confirmation compositions.
- [x] Combobox examples demonstrate keyboard search/selection, clearing,
      single/multiple selection, and empty state; async integration is documented.
- [x] Date picker behavior, disabled dates, labels, keyboard use, and date-only
      versus timestamp boundaries are explicit and tested where custom logic exists.
- [x] Sidebar supports desktop collapse and a usable mobile overlay with correct
      focus and dismissal behavior.
- [x] Command palette supports the platform shortcut, search, keyboard operation,
      Escape, and real destination/actions shared with navigation.

## Shells and layouts

- [x] A sidebar shell and a no-sidebar fixed-header shell both work with the
      shared navigation model.
- [x] Active navigation, direct links, optional breadcrumbs, and page titles are
      consistent; placeholders do not masquerade as functional app features.
- [x] Collection, detail, settings/form, and reading compositions are reusable
      examples that adapt to narrow screens without unnecessary abstractions.
- [x] Header offsets, scrolling, long content, and overlays behave correctly.
- [x] Keyboard users can reach and operate navigation and page content.

## Quality and verification

- [x] Oxlint, selected shadcn rules, and Oxfmt are configured and pass against
      the actual project; Tailwind class sorting is enabled and verified.
- [x] Strict TypeScript checking runs independently from the production build.
- [x] Vitest Node tests cover meaningful custom logic where present.
- [x] Vitest browser component tests use vitest-browser-react and the Playwright
      provider to cover the interaction risks specified in [Testing](testing.md).
- [x] A small Playwright suite covers assembled navigation, themes, and a full
      example flow without duplicating the component suite.
- [ ] CI performs a reproducible pnpm install and runs the main checks in
      Chromium plus the small Firefox/WebKit smoke suite.
- [x] Automated accessibility checks and manual keyboard/focus review are
      completed for representative pages and states; any limitations are recorded.
- [x] Both themes and relevant viewport sizes receive rendered visual review.

## Documentation and handoff

- [x] The README indexes task-oriented `docs/` guides covering getting started,
      architecture, usage, customization, extension, gallery maintenance, and tests
      as defined in [Documentation requirements](documentation.md).
- [x] Optional recipes distinguish installed defaults, preferred additions, and
      app-specific choices, with official references and verified setup examples.

- [x] Customization recipes name real files and verified commands for tokens,
      preset, fonts, icons, themes, components, code highlighting, and navigation.
- [x] An optional shadcn/Recharts recipe is documented; charts are not installed
      as a default dependency.
- [x] The playground and examples can be removed using documented steps while
      preserving the foundations a consuming app needs.
- [x] AGENTS.md and the pinned design skill are present, concise in their
      respective roles, and consistent with actual behavior and commands.
- [x] All documentation links resolve; superseded instructions are removed or
      labeled as history; implementation parameters and compatibility gaps are explicit.
- [x] MIT license and package metadata are present; required third-party notices,
      including Carbon's Apache-2.0 notices, survive finalization. The GitHub template
      copy workflow is documented; private visibility remains until publication
      is requested.
