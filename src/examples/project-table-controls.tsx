import { PageToolbar } from "@/components/page"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"

import type { Table as TableInstance } from "@tanstack/react-table"
import type { ProjectRow } from "./project-table-model"
type Props = { table: TableInstance<ProjectRow>; loading: boolean }
export function ProjectTableToolbar({ table }: Props) {
  return (
    <PageToolbar>
      <div className="w-full sm:w-72">
        <Input
          aria-label="Filter projects"
          placeholder="Filter projects…"
          value={String(table.getState().globalFilter ?? "")}
          onChange={(e) => {
            table.setGlobalFilter(e.target.value)
          }}
        />
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger render={<Button variant="outline" />}>Columns</DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {table
            .getAllColumns()
            .filter((c) => c.getCanHide())
            .map((c) => (
              <DropdownMenuCheckboxItem
                key={c.id}
                checked={c.getIsVisible()}
                onCheckedChange={(value) => {
                  c.toggleVisibility(value)
                }}
              >
                {c.id[0].toUpperCase() + c.id.slice(1)}
              </DropdownMenuCheckboxItem>
            ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </PageToolbar>
  )
}
export function ProjectTablePagination({ table, loading }: Props) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
      <p className="text-muted-foreground">
        {Object.values(table.getState().rowSelection).filter(Boolean).length} selected across all
        pages · {table.getFilteredRowModel().rows.length} projects
      </p>
      <div className="flex items-center gap-2">
        <span className="text-muted-foreground">
          Page {table.getState().pagination.pageIndex + 1} of {Math.max(1, table.getPageCount())}
        </span>
        <Button
          variant="outline"
          size="sm"
          disabled={!table.getCanPreviousPage() || loading}
          onClick={() => {
            table.previousPage()
          }}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          disabled={!table.getCanNextPage() || loading}
          onClick={() => {
            table.nextPage()
          }}
        >
          Next
        </Button>
      </div>
    </div>
  )
}
