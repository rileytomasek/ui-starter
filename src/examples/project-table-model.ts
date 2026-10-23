export type ProjectRow = {
  id: string
  name: string
  owner: string
  status: "In progress" | "In review" | "Planned"
  records: number
  updated: string
}
