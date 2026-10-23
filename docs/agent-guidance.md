# Agent guidance

The starter includes a concise root [AGENTS.md](../AGENTS.md) and one repository
skill: [interface-design](../.agents/skills/interface-design/SKILL.md). They should
help agents find and apply the shared system without duplicating its manuals.

## Ownership

| Location | Responsibility |
| --- | --- |
| `AGENTS.md` | Entry point, working agreements, navigation to authoritative docs, verification expectations |
| `.agents/skills/interface-design/SKILL.md` | Design judgment, composition, density, interaction states, and rendered refinement |
| `docs/spec.md` | Agreed scope and unresolved decisions |
| `docs/foundations.md`, `docs/components.md`, `docs/layouts.md` | Expected product behavior and composition |
| `docs/documentation.md` | Required usage guides, optional recipes, and their maintenance |
| `docs/customization.md` | How consuming apps adapt the foundation |
| `docs/quality.md`, `docs/testing.md` | Actual commands once implemented and verification strategy |

Keep AGENTS.md short enough to remain useful on every task. As implementation
lands, add a small map of the actual source directories and link to the command
contract. Do not leave proposed commands described as working commands.

## Design-skill provenance

The checked-in skill is an exact copy of the reviewed gist revision recorded
in [Sources](sources.md). It is available offline and reviewable in Git. Do not
download and execute a changing remote skill on each task.

Update it only through an intentional change: fetch the intended revision,
review the diff, check consistency with repository guidance, and update source
revision and content hash. If local changes become necessary, explicitly label
the file as adapted and record those differences; do not claim byte-for-byte
upstream provenance after editing it.

The skill owns design principles. The repository docs own integration choices.
Do not duplicate the complete skill in AGENTS.md or the specifications. User
instructions and authorized task scope still govern the work.

## Expected agent workflow

Read the scope and relevant guidance, inspect the existing components, and reuse
tokens, variants, icons, and layouts. Make the smallest complete change that
satisfies the task. Review realistic rendered content and applicable interaction
states, then run the relevant checks. Report unresolved decisions and unavailable
verification candidly.

When a task changes behavior, configuration, commands, or component APIs, update
the affected guides, examples, instructions, and acceptance criteria in the same
task. Search for stale names and removed behavior before declaring completion.
Keep a single authoritative explanation and link to it.

Do not add more skills by default. A future skill should address a concrete,
repeated workflow that is not already covered by these documents. Backend,
deployment, and orchestration skills remain outside this starter's initial scope.
