import { Icon } from "@/components/icon"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTitle, PopoverTrigger } from "@/components/ui/popover"
import { dateFromValue, dateToValue, formatDate } from "@/lib/date-only"
import { useRef, useState, type Ref } from "react"
import CalendarIcon from "~icons/carbon/calendar"
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
}: DatePickerProps) {
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
        <DateCalendar
          value={value}
          min={min}
          onChange={(next) => {
            onChange(next)
            setOpen(false)
          }}
        />
      </Popover>
      {value && (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          disabled={disabled}
          onClick={() => {
            onChange("")
          }}
          aria-label="Clear date"
        >
          Clear
        </Button>
      )}
    </div>
  )
}

type DatePickerProps = {
  id: string
  value: string
  onChange: (value: string) => void
  disabled?: boolean
  invalid?: boolean
  describedBy?: string
  inputRef?: Ref<HTMLButtonElement>
  onBlur?: () => void
  min?: string
}

function DateCalendar({
  value,
  min,
  onChange,
}: Pick<DatePickerProps, "value" | "min" | "onChange">) {
  const popup = useRef<HTMLDivElement>(null)
  const minimum = dateFromValue(min ?? "")
  return (
    <PopoverContent
      align="start"
      ref={popup}
      initialFocus={() =>
        popup.current?.querySelector<HTMLElement>(
          '[data-slot="calendar"] button[data-selected-single="true"]:not(:disabled), [data-slot="calendar"] button[tabindex="0"]:not(:disabled)',
        ) ?? true
      }
    >
      <PopoverTitle>Choose a date</PopoverTitle>
      <Calendar
        mode="single"
        selected={dateFromValue(value)}
        defaultMonth={dateFromValue(value) ?? dateFromValue(min ?? "")}
        disabled={minimum === undefined ? undefined : { before: minimum }}
        onSelect={(date) => {
          onChange(date ? dateToValue(date) : "")
        }}
      />
    </PopoverContent>
  )
}
