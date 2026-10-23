import { Icon, IconButton } from "@/components/icon"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { type ColumnDef } from "@tanstack/react-table"
import Sort from "~icons/carbon/arrows-vertical"
import More from "~icons/carbon/overflow-menu-horizontal"

import type { ProjectRow } from "./project-table-model"
export function projectColumns(onOpen: (row: ProjectRow) => void): ColumnDef<ProjectRow>[] {
  return [
    selectionColumn,
    nameColumn(onOpen),
    ownerColumn,
    statusColumn,
    recordsColumn,
    updatedColumn,
    actionsColumn(onOpen),
  ]
}

const selectionColumn: ColumnDef<ProjectRow> = {
  id: "select",
  enableHiding: false,
  header: ({ table }) => (
    <Checkbox
      aria-label="Select this page"
      checked={table.getIsAllPageRowsSelected()}
      indeterminate={table.getIsSomePageRowsSelected()}
      onCheckedChange={(checked) => {
        table.toggleAllPageRowsSelected(checked)
      }}
    />
  ),
  cell: ({ row }) => (
    <Checkbox
      aria-label={`Select ${row.original.name}`}
      checked={row.getIsSelected()}
      onCheckedChange={(checked) => {
        row.toggleSelected(checked)
      }}
    />
  ),
}
function nameColumn(onOpen: (row: ProjectRow) => void): ColumnDef<ProjectRow> {
  return {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        size="sm"
        onClick={() => {
          column.toggleSorting(column.getIsSorted() === "asc")
        }}
      >
        Project
        <Icon as={Sort} />
      </Button>
    ),
    cell: ({ row }) => (
      <Button
        variant="link"
        onClick={() => {
          onOpen(row.original)
        }}
      >
        {row.original.name}
      </Button>
    ),
  }
}
const ownerColumn: ColumnDef<ProjectRow> = { accessorKey: "owner", header: "Owner" }
const statusColumn: ColumnDef<ProjectRow> = {
  accessorKey: "status",
  header: "Status",
  cell: ({ row }) => <Badge variant="secondary">{row.original.status}</Badge>,
}
const recordsColumn: ColumnDef<ProjectRow> = {
  accessorKey: "records",
  header: ({ column }) => (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => {
        column.toggleSorting(column.getIsSorted() === "asc")
      }}
    >
      Records
      <Icon as={Sort} />
    </Button>
  ),
  cell: ({ row }) => (
    <span className="block text-right tabular-nums">
      {row.original.records.toLocaleString("en-US")}
    </span>
  ),
}
const updatedColumn: ColumnDef<ProjectRow> = { accessorKey: "updated", header: "Updated" }
function actionsColumn(onOpen: (row: ProjectRow) => void): ColumnDef<ProjectRow> {
  return {
    id: "actions",
    header: () => <span className="sr-only">Actions</span>,
    enableHiding: false,
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger
          render={<IconButton icon={More} label={`Actions for ${row.original.name}`} />}
        />
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() => {
              onOpen(row.original)
            }}
          >
            View project
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  }
}
