import { useState, type Ref } from "react"
import CalendarIcon from "~icons/carbon/calendar"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Popover, PopoverTrigger, PopoverContent, PopoverTitle } from "@/components/ui/popover"
import { Icon } from "@/components/icon"
import { dateFromValue, dateToValue, formatDate } from "@/lib/date-only"
export function DatePicker({
  id,
  value,
  onChange,
  disabled = false,
  invalid = false,
  describedBy,
  inputRef,
  onBlur,
  min,
}: {
  id: string
  value: string
  onChange: (value: string) => void
  disabled?: boolean
  invalid?: boolean
  describedBy?: string
  inputRef?: Ref<HTMLButtonElement>
  onBlur?: () => void
  min?: string
}) {
  const [open, setOpen] = useState(false)
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          render={
            <Button
              id={id}
              ref={inputRef}
              variant="outline"
              disabled={disabled}
              aria-invalid={invalid}
              aria-describedby={describedBy}
              onBlur={onBlur}
            />
          }
        >
          <Icon as={CalendarIcon} />
          {formatDate(value)}
        </PopoverTrigger>
        <PopoverContent align="start">
          <PopoverTitle>Choose a date</PopoverTitle>
          <Calendar
            mode="single"
            selected={dateFromValue(value)}
            defaultMonth={dateFromValue(value) || dateFromValue(min || "")}
            disabled={min ? { before: dateFromValue(min)! } : undefined}
            onSelect={(date) => {
              onChange(date ? dateToValue(date) : "")
              setOpen(false)
            }}
          />
        </PopoverContent>
      </Popover>
      {value && (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          disabled={disabled}
          onClick={() => onChange("")}
          aria-label="Clear date"
        >
          Clear
        </Button>
      )}
    </div>
  )
}
