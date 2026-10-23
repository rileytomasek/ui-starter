import { expect, test } from "vitest"
import { render } from "vitest-browser-react"
import App from "./App"
import { MemoryRouter } from "react-router"
import { TooltipProvider } from "./components/ui/tooltip"
import { ThemeProvider } from "./components/theme"
test("saves through the installed button", async () => {
  const screen = await render(
    <ThemeProvider>
      <TooltipProvider>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </TooltipProvider>
    </ThemeProvider>,
  )
  await screen.getByRole("button", { name: "Save changes" }).click()
  await expect.element(screen.getByRole("status")).toHaveTextContent("Changes saved.")
})
