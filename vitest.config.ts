import { defineConfig, mergeConfig } from "vitest/config"
import { playwright } from "@vitest/browser-playwright"
import vite from "./vite.config.ts"
export default mergeConfig(
  vite,
  defineConfig({
    test: {
      passWithNoTests: true,
      projects: [
        {
          extends: true,
          test: {
            name: "node",
            environment: "node",
            include: ["src/**/*.test.ts", "scripts/**/*.test.ts"],
          },
        },
        {
          extends: true,
          test: {
            name: "browser",
            include: ["src/**/*.browser.test.tsx"],
            browser: {
              enabled: true,
              headless: true,
              provider: playwright(),
              instances: [{ browser: "chromium" }],
            },
          },
        },
      ],
    },
  }),
)
