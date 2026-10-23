import { Icon } from "@/components/icon"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import type { Table } from "@tanstack/react-table"
import { useRef } from "react"
import Close from "~icons/carbon/close"
import Search from "~icons/carbon/search"
import type { ProjectRow } from "./project-table-model"

type Props = { table: Table<ProjectRow> }
export function ProjectSearch({ table }: Props) {
  const input = useRef<HTMLInputElement>(null)
  const value = String(table.getState().globalFilter ?? "")
  return (
    <div className="w-full sm:w-64">
      <InputGroup>
        <InputGroupInput
          ref={input}
          aria-label="Filter projects"
          placeholder="Filter projects…"
          value={value}
          onChange={(event) => {
            table.setGlobalFilter(event.target.value)
          }}
        />
        <InputGroupAddon>
          <Icon as={Search} />
        </InputGroupAddon>
        {value && (
          <InputGroupAddon align="inline-end">
            <InputGroupButton
              size="icon-xs"
              aria-label="Clear project filter"
              onClick={() => {
                table.setGlobalFilter("")
                input.current?.focus()
              }}
            >
              <Icon as={Close} />
            </InputGroupButton>
          </InputGroupAddon>
        )}
      </InputGroup>
    </div>
  )
}

export function ProjectStatusFilter({ table }: Props) {
  const column = table.getColumn("status")
  const filter = column?.getFilterValue()
  const value = typeof filter === "string" ? filter : "All"
  return (
    <ToggleGroup
      aria-label="Project status"
      variant="outline"
      spacing={0}
      value={[value]}
      onValueChange={(values) => {
        const selected = values[0]
        if (typeof selected === "string")
          column?.setFilterValue(selected === "All" ? undefined : selected)
      }}
    >
      {["All", "In progress", "In review", "Planned"].map((status) => (
        <ToggleGroupItem key={status} value={status}>
          {status}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  )
}
