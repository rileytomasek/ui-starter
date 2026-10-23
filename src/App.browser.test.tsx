import { expect, test } from "vitest"
import { render } from "vitest-browser-react"
import App from "./App"
test("saves through the installed button", async () => {
  const screen = await render(<App />)
  await screen.getByRole("button", { name: "Save changes" }).click()
  await expect.element(screen.getByRole("status")).toHaveTextContent("Changes saved.")
})
