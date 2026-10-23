import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog"
import { FieldError } from "@/components/ui/field"
import { ProjectForm, type ProjectValues } from "./project-form"
export function ProjectDialogs({
  submit,
  archive,
}: {
  submit: (values: ProjectValues) => Promise<void>
  archive: () => Promise<void>
}) {
  const [edit, setEdit] = useState(false),
    [confirm, setConfirm] = useState(false),
    [pending, setPending] = useState(false),
    [error, setError] = useState(""),
    [archived, setArchived] = useState(false)
  return (
    <div className="flex flex-wrap gap-2">
      <Dialog open={edit} onOpenChange={setEdit}>
        <DialogTrigger render={<Button variant="outline" />}>Edit in dialog</DialogTrigger>
        <DialogContent className="max-h-dvh overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit project</DialogTitle>
            <DialogDescription>Update the details and review date.</DialogDescription>
          </DialogHeader>
          <ProjectForm submit={submit} onSaved={() => setEdit(false)} />
        </DialogContent>
      </Dialog>
      <AlertDialog
        open={confirm}
        onOpenChange={(value) => {
          if (!pending) setConfirm(value)
        }}
      >
        <AlertDialogTrigger render={<Button variant="destructive" disabled={archived} />}>
          Archive project
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Archive this project?</AlertDialogTitle>
            <AlertDialogDescription>
              It will leave the active list. You can restore it later.
            </AlertDialogDescription>
          </AlertDialogHeader>
          {error && <FieldError>{error}</FieldError>}
          <AlertDialogFooter>
            <AlertDialogCancel disabled={pending}>Cancel</AlertDialogCancel>
            <Button
              variant="destructive"
              disabled={pending}
              onClick={async () => {
                setPending(true)
                setError("")
                try {
                  await archive()
                  setArchived(true)
                  setConfirm(false)
                } catch {
                  setError("Archiving failed. Try again.")
                } finally {
                  setPending(false)
                }
              }}
            >
              {pending ? "Archiving…" : "Confirm archive"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <output className="text-sm">{archived ? "Project archived." : ""}</output>
    </div>
  )
}
