import { useId, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Field,
  FieldLabel,
  FieldError,
  FieldDescription,
  FieldGroup,
  FieldSet,
  FieldLegend,
} from "@/components/ui/field"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { SelectCombobox, MultiCombobox } from "@/components/select-combobox"
import { DatePicker } from "@/components/date-picker"
import { dateFromValue } from "@/lib/date-only"
export const owners = [
  { value: "maya", label: "Maya Chen" },
  { value: "alex", label: "Alex Morgan" },
  { value: "sam", label: "Sam Rivera" },
]
export const topics = [
  { value: "research", label: "Research" },
  { value: "design", label: "Design systems" },
  { value: "delivery", label: "Delivery" },
]
const schema = z.object({
  name: z.string().trim().min(3, "Enter at least 3 characters."),
  description: z.string().max(600, "Keep the description under 600 characters."),
  email: z.email("Enter a valid email address."),
  owner: z.string().min(1, "Choose an owner."),
  topics: z.array(z.string()),
  reviewDate: z.string().refine((v) => !v || !!dateFromValue(v), "Choose a valid calendar date."),
  priority: z.string(),
  digest: z.boolean(),
})
export type ProjectValues = z.infer<typeof schema>
export const initialProject: ProjectValues = {
  name: "Interface research",
  description: "Understand how teams organize and review their work.",
  email: "research@example.com",
  owner: "maya",
  topics: ["research"],
  reviewDate: "2026-11-12",
  priority: "normal",
  digest: true,
}
export function ProjectForm({
  submit,
  onSaved,
}: {
  submit: (values: ProjectValues) => Promise<void>
  onSaved?: () => void
}) {
  const id = useId(),
    [notice, setNotice] = useState("")
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isDirty },
    setError,
    clearErrors,
    reset,
  } = useForm<ProjectValues>({
    resolver: zodResolver(schema),
    defaultValues: initialProject,
    mode: "onSubmit",
    reValidateMode: "onChange",
  })
  const error = (name: keyof ProjectValues) =>
    errors[name] && <FieldError id={`${id}-${name}-error`}>{errors[name]?.message}</FieldError>
  return (
    <form
      noValidate
      onSubmit={handleSubmit(async (values) => {
        setNotice("")
        clearErrors("root")
        try {
          await submit(values)
          reset(values)
          setNotice("Project saved.")
          onSaved?.()
        } catch {
          setError("root", {
            message: "We couldn't save your changes. Your input is preserved. Try again.",
          })
        }
      })}
      className="space-y-8"
    >
      <FieldSet disabled={isSubmitting}>
        <FieldLegend>Project details</FieldLegend>
        <FieldGroup>
          <Field data-invalid={!!errors.name}>
            <FieldLabel htmlFor={`${id}-name`}>
              Project name <span aria-hidden="true">*</span>
            </FieldLabel>
            <Input
              id={`${id}-name`}
              {...register("name")}
              aria-required="true"
              aria-invalid={!!errors.name}
              aria-describedby={`${id}-name-help ${id}-name-error`}
            />
            <FieldDescription id={`${id}-name-help`}>
              Use a name your team will recognize.
            </FieldDescription>
            {error("name")}
          </Field>
          <Field>
            <FieldLabel htmlFor={`${id}-description`}>Description</FieldLabel>
            <Textarea
              id={`${id}-description`}
              {...register("description")}
              aria-invalid={!!errors.description}
              aria-describedby={`${id}-description-error`}
            />
            {error("description")}
          </Field>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field data-invalid={!!errors.email}>
              <FieldLabel htmlFor={`${id}-email`}>
                Contact email <span aria-hidden="true">*</span>
              </FieldLabel>
              <Input
                id={`${id}-email`}
                type="email"
                {...register("email")}
                aria-required="true"
                aria-invalid={!!errors.email}
                aria-describedby={`${id}-email-error`}
              />
              {error("email")}
            </Field>
            <Controller
              name="priority"
              control={control}
              render={({ field }) => (
                <Field>
                  <FieldLabel htmlFor={`${id}-priority`}>Priority</FieldLabel>
                  <Select
                    items={[
                      { value: "normal", label: "Normal" },
                      { value: "high", label: "High" },
                      { value: "low", label: "Low" },
                    ]}
                    value={field.value}
                    onValueChange={(value) => field.onChange(value ?? "normal")}
                  >
                    <SelectTrigger id={`${id}-priority`} ref={field.ref} onBlur={field.onBlur}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
              )}
            />
          </div>
        </FieldGroup>
      </FieldSet>
      <FieldSet disabled={isSubmitting}>
        <FieldLegend>People and review</FieldLegend>
        <FieldGroup>
          <Controller
            name="owner"
            control={control}
            render={({ field }) => (
              <Field data-invalid={!!errors.owner}>
                <FieldLabel htmlFor={`${id}-owner`}>
                  Owner <span aria-hidden="true">*</span>
                </FieldLabel>
                <SelectCombobox
                  id={`${id}-owner`}
                  options={owners}
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  inputRef={field.ref}
                  disabled={isSubmitting}
                  invalid={!!errors.owner}
                  describedBy={`${id}-owner-error`}
                />
                {error("owner")}
              </Field>
            )}
          />
          <Controller
            name="topics"
            control={control}
            render={({ field }) => (
              <Field>
                <FieldLabel htmlFor={`${id}-topics`}>Topics</FieldLabel>
                <MultiCombobox
                  id={`${id}-topics`}
                  options={topics}
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  inputRef={field.ref}
                  disabled={isSubmitting}
                />
              </Field>
            )}
          />
          <Controller
            name="reviewDate"
            control={control}
            render={({ field }) => (
              <Field>
                <FieldLabel htmlFor={`${id}-reviewDate`}>Review date</FieldLabel>
                <DatePicker
                  id={`${id}-reviewDate`}
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  inputRef={field.ref}
                  disabled={isSubmitting}
                  min="2026-01-01"
                />
                <FieldDescription>
                  Choose the next day your team will review this project.
                </FieldDescription>
              </Field>
            )}
          />
          <Controller
            name="digest"
            control={control}
            render={({ field }) => (
              <Field orientation="horizontal">
                <Checkbox
                  id={`${id}-digest`}
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={isSubmitting}
                />
                <FieldLabel htmlFor={`${id}-digest`}>Send a weekly activity summary</FieldLabel>
              </Field>
            )}
          />
        </FieldGroup>
      </FieldSet>
      {errors.root && <FieldError>{errors.root.message}</FieldError>}
      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving…" : "Save project"}
        </Button>
        <Button
          type="button"
          variant="outline"
          disabled={isSubmitting || !isDirty}
          onClick={() => {
            reset()
            setNotice("")
          }}
        >
          Reset changes
        </Button>
        <output className="text-sm">{notice}</output>
      </div>
    </form>
  )
}
