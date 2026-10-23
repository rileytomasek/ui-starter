# UI Starter

This repository currently contains a specification, not an implemented app.
Read [README.md](README.md) and [Scope and decisions](docs/spec.md) first.
Do not claim that planned commands, components, or checks already exist.

## Working agreements

- This starter is for agent-authored apps. Prioritize reliable agent discovery,
  changes, and verification over human developer convenience when they conflict.
  Preserve end-user UX and accessibility. Follow the
  [authoring priority](docs/spec.md#authoring-priority).

- Follow the [confirmed stack](docs/spec.md), including IBM Carbon icons and
  MIT licensing. Select and record delegated implementation details without
  reopening settled choices. Distinguish required behavior from verified code.
- Track implementation in [Implementation plan](docs/implementation-plan.md).
  Update task checkboxes and phase evidence with each completed change; leave
  incomplete or unverified work unchecked.
- For UI creation, changes, or reviews, read and apply
  [.agents/skills/interface-design/SKILL.md](.agents/skills/interface-design/SKILL.md).
- Follow [Customization](docs/customization.md). Reuse the shared tokens,
  components, variants, icon conventions, and layouts before adding alternatives.
- Install UI components through the shadcn CLI; do not handwrite replacements
  or recreate them from memory. Follow the
  [component source contract](docs/components.md#component-source-and-installation).
- Keep components understandable and their familiar APIs available. Add shared
  abstractions when a concrete repeated need warrants them.
- Keep examples realistic, functional, and easy for a consuming app to remove.
- Follow [Setup transition](docs/setup-transition.md) when implementing setup and
  finalization. Preserve the upstream spec; consuming apps must end with
  app-specific instructions and no active starter setup guidance.
- Follow [Code quality](docs/quality.md) and [Testing](docs/testing.md). Once
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

## Current verification

For this Markdown-only stage, check local links, consistency with the decision
record, source provenance, and coverage of the agreed scope. Runtime acceptance
in [docs/acceptance.md](docs/acceptance.md) remains pending until implementation.

The upstream design skill is pinned. Review its diff before updating it and
record the new revision in [Sources](docs/sources.md).
