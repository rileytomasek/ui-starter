import { AxeBuilder } from "@axe-core/playwright"
import { expect, test } from "@playwright/test"
const base = "http://127.0.0.1:4174/__gallery/layouts/header/settings"
test("form failure preserves edits and supports retry; dialog restores focus", async ({ page }) => {
  await page.goto(`${base}?scenario=failure`)
  await page.getByRole("textbox", { name: /Project name/u }).fill("Weekly research")
  await page.getByRole("button", { name: "Save project", exact: true }).click()
  await expect(page.getByText(/Your input is preserved/u)).toBeVisible()
  await expect(page.getByRole("textbox", { name: /Project name/u })).toHaveValue("Weekly research")
  await page.getByRole("button", { name: "Save project", exact: true }).click()
  await expect(page.getByText("Project saved.")).toBeVisible()
  await page.getByRole("button", { name: "Edit in dialog" }).click()
  await expect(page.getByRole("dialog")).toBeVisible()
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([])
  await page.keyboard.press("Escape")
  await expect(page.getByRole("button", { name: "Edit in dialog" })).toBeFocused()
})
test("archive confirmation remains open after failure and retries", async ({ page }) => {
  await page.goto(`${base}?scenario=failure`)
  await page.getByRole("button", { name: "Archive project", exact: true }).click()
  await page.getByRole("button", { name: "Confirm archive" }).click()
  await expect(page.getByText("Archiving failed. Try again.")).toBeVisible()
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([])
  await page.getByRole("button", { name: "Confirm archive" }).click()
  await expect(page.getByText("Project archived.")).toBeVisible()
  await expect(page.getByRole("alertdialog")).toHaveCount(0)
})
