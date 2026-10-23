import type { ProjectRow } from "./project-table"
export const projects: ProjectRow[] = [
  {
    id: "interface",
    name: "Interface research",
    owner: "Maya Chen",
    status: "In progress",
    records: 128,
    updated: "Oct 23",
  },
  {
    id: "onboarding",
    name: "Onboarding experience",
    owner: "Alex Morgan",
    status: "In review",
    records: 64,
    updated: "Oct 22",
  },
  {
    id: "search",
    name: "Search and discovery",
    owner: "Sam Rivera",
    status: "In progress",
    records: 256,
    updated: "Oct 22",
  },
  {
    id: "accessibility",
    name: "Accessibility review",
    owner: "Maya Chen",
    status: "Planned",
    records: 42,
    updated: "Oct 21",
  },
  {
    id: "navigation",
    name: "Navigation patterns",
    owner: "Alex Morgan",
    status: "In review",
    records: 87,
    updated: "Oct 20",
  },
  {
    id: "mobile",
    name: "Mobile workflows",
    owner: "Sam Rivera",
    status: "In progress",
    records: 93,
    updated: "Oct 19",
  },
  {
    id: "content",
    name: "Content organization",
    owner: "Maya Chen",
    status: "Planned",
    records: 0,
    updated: "Oct 18",
  },
  {
    id: "delivery",
    name: "Delivery health",
    owner: "Alex Morgan",
    status: "In progress",
    records: 1240,
    updated: "Oct 17",
  },
]
export const guide = `## A shared approach to research

Good research makes decisions easier. Keep the question, evidence, and next step close together.

### Before you begin

- Define the decision this work should inform.
- Gather representative examples.
  - Include common workflows and edge cases.
  - Record where each observation came from.
- [x] Agree on a review date.
- [ ] Share findings with the team.

> Keep the first useful observation near the top. Detail belongs where it helps someone act.

### Compare the evidence

| Signal | What to record | Why it matters |
| --- | --- | --- |
| Frequency | How often a task happens | Helps prioritize the work |
| Friction | Where people pause or backtrack | Reveals unclear interactions |
| Recovery | What happens after an error | Shows whether the workflow is resilient |

### Keep records portable

Use a small typed contract and preserve calendar dates as strings.

\`\`\`typescript
interface Observation {
  id: string
  summary: string
  reviewDate: string // YYYY-MM-DD
}

const observation: Observation = {
  id: "obs-104",
  summary: "Participants looked for search in the header.",
  reviewDate: "2026-11-12",
}
\`\`\`

Use \`reviewDate\` for a calendar day. ~~Store everything as a timestamp~~ Choose the representation that matches the meaning.

Read the [research handbook](https://example.com/handbook) for additional context.[^source]

[^source]: This is a local reference document for the component examples.
`
