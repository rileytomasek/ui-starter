import "@/index.css"
import { expect, test, vi } from "vitest"
import { userEvent } from "vitest/browser"
import { render } from "vitest-browser-react"
import { CodeDisplay } from "@/components/code-display"
import { Markdown } from "@/components/markdown"
import { ProjectTable } from "./project-table"
import { projects } from "./fixtures"
test("copies original code and reports clipboard failures", async () => {
  const code = "first\n\nlast\n",
    copy = vi.spyOn(navigator.clipboard, "writeText").mockResolvedValue(undefined)
  const s = await render(<CodeDisplay code={code} language="unknown-language" lineNumbers />)
  await s.getByRole("button", { name: "Copy", exact: true }).click()
  expect(copy).toHaveBeenCalledWith(code)
  copy.mockRejectedValue(Error("denied"))
  await s.getByRole("button", { name: "Copied", exact: true }).click()
  await expect
    .element(s.getByRole("alert"))
    .toHaveTextContent("Copy failed. Select the code to copy it.")
  copy.mockRestore()
})
test("Markdown renders GFM and shared code with safe HTML and URL defaults", async () => {
  const s = await render(
    <Markdown
      source={
        "## Notes\n\n- [x] Reviewed\n\n~~old~~ and `inline`\n\n```unknown\nplain code\n```\n\n<script>alert(1)</script>\n\n[unsafe](javascript:alert(1))"
      }
    />,
  )
  await expect.element(s.getByRole("heading", { name: "Notes" })).toBeVisible()
  await expect.element(s.getByRole("button", { name: "Copy", exact: true })).toBeVisible()
  expect(document.querySelector("script:not([src]):not([type])")?.textContent ?? "").not.toContain(
    "alert(1)",
  )
  expect(s.getByText("unsafe").element().getAttribute("href")).not.toContain("javascript:")
})
test("table filters, sorts, paginates, and preserves selection", async () => {
  const open = vi.fn(),
    s = await render(<ProjectTable rows={projects} onOpen={open} />)
  await s.getByRole("button", { name: "Project", exact: true }).click()
  await expect
    .element(s.getByRole("columnheader", { name: /Project/ }))
    .toHaveAttribute("aria-sort", "ascending")
  await s.getByRole("button", { name: "Columns", exact: true }).click()
  await s.getByRole("menuitemcheckbox", { name: "Owner", exact: true }).click()
  await userEvent.keyboard("{Escape}")
  await expect
    .element(s.getByRole("columnheader", { name: "Owner", exact: true }))
    .not.toBeInTheDocument()
  await s.getByRole("checkbox", { name: "Select this page" }).click()
  await expect.element(s.getByText(/6 selected across all pages/)).toBeVisible()
  await s.getByRole("button", { name: "Next", exact: true }).click()
  await expect.element(s.getByText("Page 2 of 2")).toBeVisible()
  await s.getByRole("textbox", { name: "Filter projects" }).fill("Interface research")
  await s.getByRole("button", { name: "Interface research", exact: true }).click()
  expect(open).toHaveBeenCalledWith(projects[0])
  await s.getByRole("textbox", { name: "Filter projects" }).fill("no matches")
  await expect.element(s.getByText("No projects match your filter.")).toBeVisible()
})
