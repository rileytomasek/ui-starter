import { defineConfig, devices } from "@playwright/test"
export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: process.env.CI === "true",
  retries: process.env.CI === "true" ? 1 : 0,
  reporter: "list",
  use: {
    baseURL: "http://127.0.0.1:4173",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "firefox", use: { ...devices["Desktop Firefox"] }, testMatch: /smoke.spec.ts/u },
    { name: "webkit", use: { ...devices["Desktop Safari"] }, testMatch: /smoke.spec.ts/u },
  ],
  webServer: [
    {
      command: "pnpm build && pnpm preview --port 4173 --strictPort",
      url: "http://127.0.0.1:4173",
      reuseExistingServer: process.env.CI !== "true",
    },
    {
      command:
        "pnpm build:gallery && pnpm exec vite preview --outDir dist-gallery --host 127.0.0.1 --port 4174 --strictPort",
      url: "http://127.0.0.1:4174",
      reuseExistingServer: process.env.CI !== "true",
    },
  ],
})
