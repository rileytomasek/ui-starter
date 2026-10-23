import { DatePicker } from "@/components/date-picker"
import { SelectCombobox } from "@/components/select-combobox"
import "@/index.css"
import { useState } from "react"
import { expect, test, vi } from "vitest"
import { render } from "vitest-browser-react"
import { userEvent } from "vitest/browser"
import { ProjectForm } from "./project-form"
test("form validates, preserves input after failure, and retries", async () => {
  const submit = vi
    .fn()
    .mockRejectedValueOnce(new Error("offline"))
    .mockImplementation(async () => {})
  const s = await render(<ProjectForm submit={submit} />)
  await s.getByRole("textbox", { name: /Project name/u }).fill("")
  await s.getByRole("button", { name: "Save project", exact: true }).click()
  await expect.element(s.getByText("Enter at least 3 characters.")).toBeVisible()
  expect(submit).not.toHaveBeenCalled()
  await s.getByRole("textbox", { name: /Project name/u }).fill("Research update")
  await s.getByRole("button", { name: "Save project", exact: true }).click()
  await expect.element(s.getByText(/Your input is preserved/u)).toBeVisible()
  await expect
    .element(s.getByRole("textbox", { name: /Project name/u }))
    .toHaveValue("Research update")
  await s.getByRole("button", { name: "Save project", exact: true }).click()
  await expect.element(s.getByText("Project saved.")).toBeVisible()
  expect(submit).toHaveBeenCalledTimes(2)
})
test("combobox searches, clears, and supports multiple selection", async () => {
  const s = await render(<ProjectForm submit={async () => {}} />)
  await s.getByRole("combobox", { name: /Owner/u }).fill("Alex")
  await userEvent.keyboard("{ArrowDown}{Enter}")
  await expect.element(s.getByRole("combobox", { name: /Owner/u })).toHaveValue("Alex Morgan")
  await s.getByRole("button", { name: "Clear selection" }).click()
  await s.getByRole("combobox", { name: /Owner/u }).fill("nothing-matches")
  await expect.element(s.getByText("No options found.")).toBeVisible()
  await userEvent.keyboard("{Escape}")
  await s.getByRole("combobox", { name: "Topics" }).fill("Design")
  await s.getByRole("option", { name: "Design systems" }).click()
  await s.getByRole("button", { name: "Remove Research" }).click()
  await expect.element(s.getByRole("button", { name: "Remove Design systems" })).toBeVisible()
})
test("pending submission prevents repeated saves", async () => {
  let finish!: () => void
  const submit = vi.fn(
    () =>
      new Promise<void>((resolve) => {
        finish = resolve
      }),
  )
  const s = await render(<ProjectForm submit={submit} />)
  await s.getByRole("button", { name: "Save project", exact: true }).click()
  await expect.element(s.getByRole("button", { name: "Saving…" })).toBeDisabled()
  finish()
  await expect.element(s.getByText("Project saved.")).toBeVisible()
  expect(submit).toHaveBeenCalledTimes(1)
})
function DateExample() {
  const [value, setValue] = useState("2026-11-12")
  return (
    <>
      <DatePicker id="date" value={value} onChange={setValue} min="2026-11-12" />
      <output>{value}</output>
    </>
  )
}
test("date picker disables earlier dates and clears", async () => {
  const s = await render(<DateExample />)
  await s.getByRole("button", { name: "Nov 12, 2026" }).click()
  await expect.element(s.getByRole("button", { name: /November 11/u })).toBeDisabled()
  await expect.element(s.getByRole("button", { name: /November 12/u })).toHaveFocus()
  await userEvent.keyboard("{ArrowRight}{Enter}")
  await expect.element(s.getByRole("status")).toHaveTextContent("2026-11-13")
  await s.getByRole("button", { name: "Clear date" }).click()
  await expect.element(s.getByRole("status")).toHaveTextContent("")
})

test("disabled combobox cannot accept input", async () => {
  const s = await render(
    <>
      <label htmlFor="locked">Owner</label>
      <SelectCombobox
        id="locked"
        options={[{ value: "maya", label: "Maya Chen" }]}
        value="maya"
        onChange={() => {}}
        disabled
      />
    </>,
  )
  await expect.element(s.getByRole("combobox", { name: "Owner" })).toBeDisabled()
})
