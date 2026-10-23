import { DatePicker } from "@/components/date-picker"
import { MultiCombobox, SelectCombobox } from "@/components/select-combobox"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field"

import { useController, useFormContext } from "react-hook-form"
import { ProjectFieldError } from "./project-form-error"
import { owners, topics, type ProjectValues } from "./project-form-model"
export function ProjectPeople({ id }: { id: string }) {
  const {
    formState: { isSubmitting },
  } = useFormContext<ProjectValues>()
  return (
    <FieldSet disabled={isSubmitting}>
      <FieldLegend>People and review</FieldLegend>
      <FieldGroup>
        <ProjectOwner id={id} />
        <ProjectTopics id={id} />
        <ProjectReviewDate id={id} />
        <ProjectDigest id={id} />
      </FieldGroup>
    </FieldSet>
  )
}

function ProjectOwner({ id }: { id: string }) {
  const {
    control,
    formState: { errors, isSubmitting },
  } = useFormContext<ProjectValues>()
  const { field } = useController({ name: "owner", control })
  return (
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
      <ProjectFieldError id={id} name="owner" />
    </Field>
  )
}

function ProjectTopics({ id }: { id: string }) {
  const {
    control,
    formState: { isSubmitting },
  } = useFormContext<ProjectValues>()
  const { field } = useController({ name: "topics", control })
  return (
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
  )
}

function ProjectReviewDate({ id }: { id: string }) {
  const {
    control,
    formState: { isSubmitting },
  } = useFormContext<ProjectValues>()
  const { field } = useController({ name: "reviewDate", control })
  return (
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
      <FieldDescription>Choose the next day your team will review this project.</FieldDescription>
    </Field>
  )
}

function ProjectDigest({ id }: { id: string }) {
  const {
    control,
    formState: { isSubmitting },
  } = useFormContext<ProjectValues>()
  const { field } = useController({ name: "digest", control })
  return (
    <Field orientation="horizontal">
      <Checkbox
        id={`${id}-digest`}
        checked={field.value}
        onCheckedChange={field.onChange}
        disabled={isSubmitting}
      />
      <FieldLabel htmlFor={`${id}-digest`}>Send a weekly activity summary</FieldLabel>
    </Field>
  )
}
