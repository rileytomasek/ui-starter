import { test, expect } from "@playwright/test"
import AxeBuilder from "@axe-core/playwright"
const base = "http://127.0.0.1:4174/__gallery/layouts"
for (const shell of ["header", "sidebar"]) {
  test(`${shell} supports navigation, commands, and mobile`, async ({ page }) => {
    await page.goto(`${base}/${shell}/collection`)
    await expect(page.getByRole("heading", { name: "Projects", exact: true })).toBeVisible()
    await page.getByRole("button", { name: "Open commands" }).click()
    await expect(page.getByRole("dialog")).toBeVisible()
    await page.getByPlaceholder("Search pages and actions…").fill("Settings")
    await page.keyboard.press("Enter")
    await expect(page).toHaveURL(`${base}/${shell}/settings`)
    await expect(page.getByRole("dialog")).toHaveCount(0)
    await page.keyboard.press("Control+k")
    await expect(page.getByRole("dialog")).toBeVisible()
    await page.keyboard.press("Escape")
    await expect(page.getByRole("dialog")).toHaveCount(0)
    if (shell === "sidebar") {
      await page.getByRole("button", { name: "Toggle Sidebar" }).click()
      await page.reload()
      await expect(page.locator('[data-state="collapsed"]').first()).toBeVisible()
    }
    await page.setViewportSize({ width: 390, height: 844 })
    await page
      .getByRole("button", { name: shell === "header" ? "Open navigation" : "Toggle Sidebar" })
      .click()
    await expect(page.getByRole("dialog")).toBeVisible()
    await page.getByRole("dialog").getByRole("link", { name: "Guide", exact: true }).click()
    await expect(page).toHaveURL(`${base}/${shell}/reading`)
    await expect(page.getByRole("dialog")).toHaveCount(0)
    expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([])
  })
}
