# Setup and transition to an application

The starter must have a clear setup phase followed by an explicit transition to
an application repository. After setup, a fresh coding agent should understand
and work on the application without encountering instructions to configure a
starter again. This is required product behavior, not a manual cleanup suggestion.

This document specifies future tooling and documentation. No setup or cleanup
command exists yet. The current specification repository retains its planning
material; cleanup applies to consuming application copies, not the upstream
starter repository.

## Setup entry point

Before setup is complete, README and AGENTS.md must state that clearly and point
to one focused guide under `docs/starter/`. That guide must work without prior
conversation context and explain prerequisites, the configuration sequence,
verification, and how to finalize. Record the choices in a small explicit setup
record that the finalizer can validate; its schema and location are implementation
choices. Do not derive configuration from scattered prose or chat history.

Distinguish maintained starter defaults from app-specific choices. The starter
uses the confirmed router, package manager, forms, Markdown, and testing stack
in [Scope](spec.md#confirmed-implementation-decisions). Consuming agents should
reuse those decisions unless the app has a concrete reason to change them.

The application setup sequence must cover:

1. Establish the app's name, purpose, intended users, and package identity.
2. Configure the visual foundation: colors, fonts, density, radii, and icons.
3. Select a shell and define the app's initial destinations and page structure.
4. Decide which examples, gallery content, and optional capabilities to retain.
5. Run the app, inspect the chosen appearance and relevant responsive states,
   and run the documented checks.
6. Review and apply finalization, then verify the resulting application context.

Reuse decisions already provided by the user. Required unresolved information
must be reported explicitly; non-interactive execution must not silently invent
an app's purpose or overwrite existing choices.

Explain which shadcn settings can change through tokens and source edits after
generation. A primitive-base change requires deliberate component migration;
editing `components.json` or rerunning generation is not a universal restyling
operation. Link to the actual supported customization recipes.

## Separate temporary and retained material

Use explicit ownership and paths so removal is predictable. `docs/starter/` is
the intended home for temporary setup guidance, starter rationale, original
specifications, and setup-only decisions in the implemented starter. The current
specification files need not be moved before implementation; classify and place
them deliberately when building the distributable starter.

| Temporary material | Retained application material |
| --- | --- |
| Setup guides, checklist/record, original starter specs and rationale | App-specific architecture, usage, customization, testing, and extension guides |
| Unselected examples, fixtures, demo destinations, starter branding | Shared components, chosen layouts, providers, tokens, and actual app routes |
| Setup-oriented README and AGENTS.md content | App-specific README and AGENTS.md |
| One-off setup tooling and cleanup manifest after successful finalization | Normal application development and verification commands |
| Gallery content not explicitly retained | Useful gallery/examples explicitly retained and described as application development tools |

Keep the interface-design skill and its provenance, plus relevant optional
recipes such as charts. Preserve the MIT license, copyright notice, and needed
third-party attribution and licensing notices, including those for Carbon icons.
Move any necessary provenance or enduring conventions out of temporary guides
before deleting them. No retained instructions may link to removed material.

Essential ongoing knowledge belongs in retained docs, not only in a temporary
setup guide. Retained docs must describe the actual app and its conventions.
Avoid scattering starter identity or setup reminders throughout source files.

## Finalization command

Provide one discoverable command, `pnpm setup:finalize`, with a
non-mutating preview and an explicit apply mode. Define and document the
preview/apply flags when implemented. Support non-interactive operation
using the recorded choices and explicit resolutions for any conflicts.

The finalizer must:

- Validate required configuration and identify unresolved choices before mutation.
- Show the exact files, scripts, routes, imports, and dependencies it will change.
- Produce app-specific README and AGENTS.md describing purpose, code locations,
  conventions, and verification; preserve app-specific edits and requirements.
- Remove temporary guides, original starter specifications, discarded examples,
  sample destinations, branding, and setup-only tooling.
- Update affected navigation, imports, scripts, dependencies, and the lockfile.
  Remove a dependency only if retained app code and tooling no longer require it.
- Retain the chosen foundations and relevant application documentation, including
  the design skill and its provenance.
- Run the appropriate checks and report remaining work or failures precisely.

Use an explicit cleanup manifest of known paths and transformations. Do not
perform repository-wide deletion or replacement based on words like "starter"
or "template". Constrain operations to the consuming repository and validate
paths. Preserve unrelated files and modifications.

Detect examples or instructions modified since the shipped baseline. Surface
those conflicts before removal or replacement and require an explicit keep,
migrate, or remove resolution. Once the intent is known, the apply operation
should not repeatedly ask for the same decision. Keep retained examples and
related docs consistent with the resulting application.

Changes must be reviewable in Git. Establish a recoverable baseline before
cleanup; do not silently commit, reset, or discard unrelated work. Handle partial
failure predictably: repeated apply attempts must not duplicate changes, erase
new app work, or recreate removed scaffolding. Keep recovery instructions and
needed tooling available until checks succeed. Remove one-off tooling only on
successful completion; document the final command lifecycle rather than claiming
a removed package script can still be rerun.

## Completed application state

Finalization is complete only when configuration, cleanup, rewritten guidance,
and verification succeed. A failed check must not leave the repo labeled as
fully finalized. Report how to resume or recover after an interrupted attempt.

The resulting README and AGENTS.md must explain what the app does, where changes
belong, the conventions to use, and how to verify work. Remove active setup
instructions, unresolved starter choices, original template specifications, and
obsolete links. A retained gallery must not reopen starter setup or define the
app as a template.

Do not leave an in-repository archive of removed starter instructions. Keep them
recoverable through the established Git history or baseline. Attribution and
provenance can remain factual without becoming active setup guidance.

Verify the result in a fresh agent task using only the finalized repository.
The agent must identify the app's purpose, make a representative page/component
change, and run the relevant checks without being redirected to template setup.
The finalization tests and acceptance criteria are specified in
[Testing](testing.md) and [Acceptance](acceptance.md).
