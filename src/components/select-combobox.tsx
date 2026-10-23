import type { Ref } from "react"
import {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxEmpty,
  ComboboxChips,
  ComboboxChip,
  ComboboxChipsInput,
  ComboboxValue,
  useComboboxAnchor,
} from "@/components/ui/combobox"
export type Option = { value: string; label: string }
type Shared = {
  id: string
  options: Option[]
  disabled?: boolean
  invalid?: boolean
  describedBy?: string
  onBlur?: () => void
  inputRef?: Ref<HTMLInputElement>
}
export function SelectCombobox({
  id,
  options,
  value,
  onChange,
  disabled,
  invalid,
  describedBy,
  onBlur,
  inputRef,
}: Shared & { value: string; onChange: (value: string) => void }) {
  return (
    <Combobox
      items={options}
      value={options.find((x) => x.value === value) ?? null}
      onValueChange={(item) => onChange(item?.value ?? "")}
      itemToStringLabel={(item) => item.label}
      itemToStringValue={(item) => item.value}
      disabled={disabled}
    >
      <ComboboxInput
        id={id}
        ref={inputRef}
        onBlur={onBlur}
        aria-invalid={invalid}
        aria-describedby={describedBy}
        showClear
        placeholder="Search options…"
      />
      <ComboboxContent>
        <ComboboxEmpty>No options found.</ComboboxEmpty>
        <ComboboxList>
          {(item: Option) => (
            <ComboboxItem key={item.value} value={item}>
              {item.label}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}
export function MultiCombobox({
  id,
  options,
  value,
  onChange,
  disabled,
  invalid,
  describedBy,
  onBlur,
  inputRef,
}: Shared & { value: string[]; onChange: (value: string[]) => void }) {
  const anchor = useComboboxAnchor()
  return (
    <Combobox
      multiple
      items={options}
      value={options.filter((x) => value.includes(x.value))}
      onValueChange={(items) => onChange(items.map((x) => x.value))}
      itemToStringLabel={(item) => item.label}
      itemToStringValue={(item) => item.value}
      disabled={disabled}
    >
      <ComboboxChips ref={anchor}>
        <ComboboxValue>
          {(items: Option[]) =>
            items.map((item) => (
              <ComboboxChip
                key={item.value}
                aria-label={item.label}
                removeLabel={`Remove ${item.label}`}
              >
                {item.label}
              </ComboboxChip>
            ))
          }
        </ComboboxValue>
        <ComboboxChipsInput
          id={id}
          ref={inputRef}
          onBlur={onBlur}
          aria-invalid={invalid}
          aria-describedby={describedBy}
          placeholder="Add topics…"
        />
      </ComboboxChips>
      <ComboboxContent anchor={anchor}>
        <ComboboxEmpty>No options found.</ComboboxEmpty>
        <ComboboxList>
          {(item: Option) => (
            <ComboboxItem key={item.value} value={item}>
              {item.label}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}
