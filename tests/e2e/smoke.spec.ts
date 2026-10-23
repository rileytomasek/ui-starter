import { expect, test } from "@playwright/test"
test("production app renders and saves", async ({ page }) => {
  await page.goto("/")
  await expect(page.getByRole("heading", { name: "Workspace" })).toBeVisible()
  await page.getByRole("button", { name: "Save changes" }).click()
  await expect(page.getByRole("status")).toHaveText("Changes saved.")
})
