import { expect, test } from "@playwright/test"
const base = "http://127.0.0.1:4174/__gallery/layouts"
for (const shell of ["header", "sidebar"]) {
  test(`${shell} groups search, status, and pagination`, async ({ page }) => {
    await page.goto(`${base}/${shell}/collection`)
    const statuses = page.getByRole("group", { name: "Project status", exact: true })
    await page.getByRole("button", { name: "Next", exact: true }).click()
    await expect(page.getByText("Page 2 of 2")).toBeVisible()
    await statuses.getByRole("button", { name: "Planned", exact: true }).click()
    await expect(page.getByText("Page 1 of 1")).toBeVisible()
    await expect(page.getByText("0 selected across all pages · 2 projects")).toBeVisible()
    await page.getByRole("textbox", { name: "Filter projects" }).fill("Interface")
    await expect(page.getByText("No projects match your filter.")).toBeVisible()
    await page.getByRole("button", { name: "Clear project filter" }).click()
    await expect(page.getByRole("textbox", { name: "Filter projects" })).toBeFocused()
    await expect(page.getByText("0 selected across all pages · 2 projects")).toBeVisible()
    await statuses.getByRole("button", { name: "Planned", exact: true }).click()
    await expect(statuses.getByRole("button", { name: "Planned", exact: true })).toHaveAttribute(
      "aria-pressed",
      "true",
    )
    await page.keyboard.press("Home")
    await expect(statuses.getByRole("button", { name: "All", exact: true })).toBeFocused()
    await page.keyboard.press("Space")
    await expect(page.getByText("0 selected across all pages · 8 projects")).toBeVisible()
  })
  test(`${shell} switches detail tabs with the keyboard`, async ({ page }) => {
    await page.goto(`${base}/${shell}/detail`)
    await expect(page.getByRole("tabpanel", { name: "Overview", exact: true })).toBeVisible()
    await page.getByRole("tab", { name: "Overview", exact: true }).focus()
    await page.keyboard.press("ArrowRight")
    await page.keyboard.press("Enter")
    await expect(page.getByRole("tabpanel", { name: "Research guide", exact: true })).toBeVisible()
    await expect(page.getByRole("heading", { name: "A shared approach to research" })).toBeVisible()
    await page.keyboard.press("ArrowLeft")
    await page.keyboard.press("Enter")
    await expect(page.getByRole("tabpanel", { name: "Overview", exact: true })).toBeVisible()
  })
}
