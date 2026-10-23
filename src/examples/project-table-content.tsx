import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { flexRender, type Header, type Table as TableInstance } from "@tanstack/react-table"
import type { ProjectRow } from "./project-table-model"
type Props = { table: TableInstance<ProjectRow>; loading: boolean }
function ProjectHeader({ header }: { header: Header<ProjectRow, unknown> }) {
  const sorted = header.column.getIsSorted()
  const order =
    sorted === false ? undefined : ({ asc: "ascending", desc: "descending" } as const)[sorted]
  return (
    <TableHead scope="col" aria-sort={order}>
      {header.isPlaceholder
        ? null
        : flexRender(header.column.columnDef.header, header.getContext())}
    </TableHead>
  )
}
function ProjectRows({ table, loading }: Props) {
  const rows = table.getRowModel().rows
  if (!loading && rows.length > 0)
    return (
      <>
        {rows.map((row) => (
          <TableRow key={row.id} data-state={row.getIsSelected() ? "selected" : undefined}>
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </>
    )
  const empty =
    table.getCoreRowModel().rows.length > 0
      ? "No projects match your filter."
      : "No projects yet. Add your first project to get started."
  return (
    <TableRow>
      <TableCell colSpan={table.getVisibleLeafColumns().length}>
        {loading ? "Loading projects…" : empty}
      </TableCell>
    </TableRow>
  )
}
export function ProjectTableContent({ table, loading }: Props) {
  return (
    <Table aria-label="Projects" aria-busy={loading}>
      <TableHeader>
        {table.getHeaderGroups().map((group) => (
          <TableRow key={group.id}>
            {group.headers.map((header) => (
              <ProjectHeader key={header.id} header={header} />
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        <ProjectRows table={table} loading={loading} />
      </TableBody>
    </Table>
  )
}
