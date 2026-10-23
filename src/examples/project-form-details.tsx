import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

import { useController, useFormContext } from "react-hook-form"
import { ProjectFieldError } from "./project-form-error"
import { type ProjectValues } from "./project-form-model"
export function ProjectDetails({ id }: { id: string }) {
  const {
    register,
    formState: { errors, isSubmitting },
  } = useFormContext<ProjectValues>()
  return (
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
          <ProjectFieldError id={id} name="name" />
        </Field>
        <Field>
          <FieldLabel htmlFor={`${id}-description`}>Description</FieldLabel>
          <Textarea
            id={`${id}-description`}
            {...register("description")}
            aria-invalid={!!errors.description}
            aria-describedby={`${id}-description-error`}
          />
          <ProjectFieldError id={id} name="description" />
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
            <ProjectFieldError id={id} name="email" />
          </Field>
          <ProjectPriority id={id} />
        </div>
      </FieldGroup>
    </FieldSet>
  )
}

function ProjectPriority({ id }: { id: string }) {
  const { control } = useFormContext<ProjectValues>()
  const {
    field: { ref, ...field },
  } = useController({ name: "priority", control })
  return (
    <Field>
      <FieldLabel htmlFor={`${id}-priority`}>Priority</FieldLabel>
      <Select
        items={[
          { value: "normal", label: "Normal" },
          { value: "high", label: "High" },
          { value: "low", label: "Low" },
        ]}
        value={field.value}
        onValueChange={(value) => {
          field.onChange(value ?? "normal")
        }}
      >
        <SelectTrigger id={`${id}-priority`} ref={ref} onBlur={field.onBlur}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="normal">Normal</SelectItem>
          <SelectItem value="high">High</SelectItem>
          <SelectItem value="low">Low</SelectItem>
        </SelectContent>
      </Select>
    </Field>
  )
}
