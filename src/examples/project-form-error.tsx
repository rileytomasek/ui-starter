import { FieldError } from "@/components/ui/field"
import { useFormContext } from "react-hook-form"
import type { ProjectValues } from "./project-form-model"
export function ProjectFieldError({ id, name }: { id: string; name: keyof ProjectValues }) {
  const {
    formState: { errors },
  } = useFormContext<ProjectValues>()
  return errors[name] === undefined ? null : (
    <FieldError id={`${id}-${name}-error`}>{errors[name]?.message}</FieldError>
  )
}
