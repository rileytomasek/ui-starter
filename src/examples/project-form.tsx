import { Button } from "@/components/ui/button"
import { FieldError } from "@/components/ui/field"
import { zodResolver } from "@hookform/resolvers/zod"
import { useId, useState } from "react"
import { FormProvider, useForm, useFormContext } from "react-hook-form"
import { ProjectDetails } from "./project-form-details"
import { initialProject, schema, type ProjectValues } from "./project-form-model"
import { ProjectPeople } from "./project-form-people"
export { initialProject, owners, topics, type ProjectValues } from "./project-form-model"
type Props = { submit: (values: ProjectValues) => Promise<void>; onSaved?: () => void }
function useProjectForm({ submit, onSaved }: Props) {
  const [notice, setNotice] = useState("")
  const form = useForm<ProjectValues>({
    resolver: zodResolver(schema),
    defaultValues: initialProject,
    mode: "onSubmit",
    reValidateMode: "onChange",
  })
  const save = form.handleSubmit(async (values) => {
    setNotice("")
    form.clearErrors("root")
    try {
      await submit(values)
      form.reset(values)
      setNotice("Project saved.")
      onSaved?.()
    } catch {
      form.setError("root", {
        message: "We couldn't save your changes. Your input is preserved. Try again.",
      })
    }
  })
  const reset = () => {
    form.reset()
    setNotice("")
  }
  return { form, save, reset, notice }
}
export function ProjectForm(props: Props) {
  const id = useId()
  const { form, save, reset, notice } = useProjectForm(props)
  return (
    <FormProvider {...form}>
      <form
        noValidate
        onSubmit={(event) => {
          void save(event)
        }}
        className="space-y-8"
      >
        <ProjectDetails id={id} />
        <ProjectPeople id={id} />
        <ProjectFormActions notice={notice} reset={reset} />
      </form>
    </FormProvider>
  )
}
function ProjectFormActions({ notice, reset }: { notice: string; reset: () => void }) {
  const {
    formState: { errors, isSubmitting, isDirty },
  } = useFormContext<ProjectValues>()
  return (
    <>
      {errors.root && <FieldError>{errors.root.message}</FieldError>}
      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving…" : "Save project"}
        </Button>
        <Button type="button" variant="outline" disabled={isSubmitting || !isDirty} onClick={reset}>
          Reset changes
        </Button>
        <output className="text-sm">{notice}</output>
      </div>
    </>
  )
}
