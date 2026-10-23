# UI Starter

Implementation and acceptance are complete; consult [acceptance evidence](docs/starter/release.md) for verification scope.
For a new consuming copy, setup is incomplete: follow [Getting started](docs/starter/getting-started.md).
Read [README.md](README.md) and [Scope and decisions](docs/starter/spec.md) first.
Use [Development](docs/development.md) for actual commands and source locations.
Use both skills through the UI workflow below.

## UI workflow

1. Read [interface-design](.agents/skills/interface-design/SKILL.md) before UI work
   and reread it before rendered review. It owns composition, hierarchy, density,
   and visual direction; repository guides own integration choices.
2. Implement with shared tokens and CLI-installed components, then render and
   exercise affected screens in the relevant themes, viewports, and states.
3. Apply [ui-review](.agents/skills/ui-review/SKILL.md) to the changed UI plus its
   primitive/theme context before completion. It adds concrete accessibility and
   consistency checks; it does not override interface-design or the shared system.
4. Fix confirmed in-scope defects, run relevant checks, and inspect the result.
   For review-only requests, report findings without editing. Report unavailable
   verification explicitly. Scale review to the change; do not use numeric scores
   as completion gates. Neither skill requires a hosted service.

## Working agreements

- This starter is for agent-authored apps. Prioritize reliable agent discovery,
  changes, and verification over human developer convenience when they conflict.
  Preserve end-user UX and accessibility. Follow the
  [authoring priority](docs/starter/spec.md#authoring-priority).

- Follow the [confirmed stack](docs/starter/spec.md), including IBM Carbon icons and
  MIT licensing. Select and record delegated implementation details without
  reopening settled choices. Distinguish required behavior from verified code.
- Track implementation in [Implementation plan](docs/starter/implementation-plan.md).
  Update task checkboxes and phase evidence with each completed change; leave
  incomplete or unverified work unchecked.
- Follow [Customization](docs/starter/customization.md). Reuse the shared tokens,
  components, variants, icon conventions, and layouts before adding alternatives.
- Install UI components through the shadcn CLI; do not handwrite replacements
  or recreate them from memory. Follow the
  [component source contract](docs/starter/components.md#component-source-and-installation).
- Follow the [strict lint contract](docs/development.md#strict-lint-contract). Fix
  violations through typed boundaries and cohesive extraction, never new ignores,
  suppressions, compressed formatting, or raised limits. Review effect warnings
  for a concrete external synchronization.
- Keep components understandable and their familiar APIs available. Add shared
  abstractions when a concrete repeated need warrants them.
- Keep examples realistic, functional, and easy for a consuming app to remove.
- Follow [Setup transition](docs/starter/setup-transition.md) when implementing setup and
  finalization. Preserve the upstream spec; consuming apps must end with
  app-specific instructions and no active starter setup guidance.
- Follow [Code quality](docs/starter/quality.md) and [Testing](docs/starter/testing.md). Once
  implemented, run the actual relevant commands and fix failures. Do not weaken
  checks or add blanket ignores to conceal a problem.
- Review rendered UI changes in supported themes and relevant viewport sizes,
  including applicable keyboard and interaction states. Report unavailable
  checks as unverified.
- Update affected specs, guides, agent instructions, examples, and acceptance
  criteria in the same task as changes to behavior or configuration. Search
  consumers for stale names and commands. Link to the authoritative explanation
  instead of duplicating it.
- Preserve unrelated work. Keep backend, authentication, deployment, and other
  app-specific expansion within the task's authorized scope.

## Verification

Run `pnpm check` and `pnpm test:e2e` for applicable changes. The implementation plan records completed phases; the acceptance evidence records
verified coverage and practical limits.
The design skill is excluded from formatting to retain its pinned contents.

The interface-design skill is pinned unchanged; ui-review is a locally adapted
Rams skill. Review upstream diffs deliberately, preserve attribution and license,
and record revisions/adaptations in [Sources](docs/sources.md).
