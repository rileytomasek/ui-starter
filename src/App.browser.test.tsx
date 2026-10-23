import "@/index.css"
import { MemoryRouter } from "react-router"
import { expect, test } from "vitest"
import { render } from "vitest-browser-react"
import App from "./App"
import { ThemeProvider } from "./components/theme"
import { TooltipProvider } from "./components/ui/tooltip"
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
