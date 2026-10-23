import { expect, test } from "@playwright/test"
test("production app renders and saves", async ({ page }) => {
  await page.goto("/")
  await expect(page.getByRole("heading", { name: "Workspace" })).toBeVisible()
  await page.getByRole("button", { name: "Save changes" }).click()
  await expect(page.getByRole("status")).toHaveText("Changes saved.")
})

test("theme and representative form work across browsers", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "dark" })
  await page.goto("/")
  await expect(page.locator("html")).toHaveClass(/dark/)
  await page.emulateMedia({ colorScheme: "light" })
  await expect(page.locator("html")).not.toHaveClass(/dark/)
  await page.goto("http://127.0.0.1:4174/__gallery/layouts/header/settings")
  await page.getByRole("textbox", { name: /Project name/ }).fill("Cross-browser review")
  await page.getByRole("button", { name: "Save project", exact: true }).click()
  await expect(page.getByText("Project saved.")).toBeVisible()
})
