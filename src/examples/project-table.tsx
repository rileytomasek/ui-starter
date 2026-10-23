import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type RowSelectionState,
  type SortingState,
  type VisibilityState,
} from "@tanstack/react-table"
import { useMemo, useState } from "react"
import { projectColumns } from "./project-table-columns"
import { ProjectTableContent } from "./project-table-content"
import { ProjectTablePagination, ProjectTableToolbar } from "./project-table-controls"
import type { ProjectRow } from "./project-table-model"
export type { ProjectRow } from "./project-table-model"
export function ProjectTable({
  rows,
  onOpen,
  loading = false,
}: {
  rows: ProjectRow[]
  onOpen: (row: ProjectRow) => void
  loading?: boolean
}) {
  const [sorting, setSorting] = useState<SortingState>([]),
    [filter, setFilter] = useState(""),
    [visibility, setVisibility] = useState<VisibilityState>({}),
    [selection, setSelection] = useState<RowSelectionState>({})
  const columns = useMemo(() => projectColumns(onOpen), [onOpen])
  const table = useReactTable({
    data: rows,
    columns,
    getRowId: (row) => row.id,
    state: { sorting, globalFilter: filter, columnVisibility: visibility, rowSelection: selection },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFilter,
    onColumnVisibilityChange: setVisibility,
    onRowSelectionChange: setSelection,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 6 } },
  })
  return (
    <div className="space-y-4">
      <ProjectTableToolbar table={table} loading={loading} />
      <ProjectTableContent table={table} loading={loading} />
      <ProjectTablePagination table={table} loading={loading} />
    </div>
  )
}
