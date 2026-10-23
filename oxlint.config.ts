import { defineConfig } from "oxlint"
import design from "./config/oxlint-design.ts"
// Adapted from charlie-labs/ch-pr oxlint.config.ts; see docs/development.md.

const basePlugins = [
  "jsx-a11y",
  "import",
  "oxc",
  "promise",
  "react",
  "typescript",
  "unicorn",
] as const

export default defineConfig({
  extends: [design],
  ignorePatterns: [
    "dist-gallery/**",
    "test-results/**",
    "playwright-report/**",
    ".react-router/**",
    ".wrangler/**",
    "build/**",
    "coverage/**",
    "dist/**",
    "worker-configuration.d.ts",
  ],
  plugins: [...basePlugins],
  categories: {
    correctness: "error",
    suspicious: "error",
    pedantic: "error",
    perf: "error",
  },
  options: {
    typeAware: true,
  },
  rules: {
    complexity: [
      "error",
      {
        max: 10,
        variant: "classic",
      },
    ],
    "max-depth": [
      "error",
      {
        max: 3,
      },
    ],
    "max-lines": [
      "error",
      {
        max: 300,
        skipBlankLines: true,
        skipComments: true,
      },
    ],
    "max-lines-per-function": [
      "error",
      {
        max: 60,
        skipBlankLines: true,
        skipComments: true,
        IIFEs: true,
      },
    ],
    "max-nested-callbacks": [
      "error",
      {
        max: 3,
      },
    ],
    "max-params": [
      "error",
      {
        max: 4,
      },
    ],
    "max-statements": [
      "error",
      {
        max: 25,
      },
    ],
    "no-nested-ternary": "error",
    "no-param-reassign": "error",
    "no-restricted-imports": [
      "warn",
      {
        paths: [
          {
            name: "react",
            importNames: ["useEffect"],
            message:
              "Avoid useEffect when possible; use it only to synchronize with an external system.",
          },
        ],
      },
    ],
    "no-restricted-properties": [
      "warn",
      {
        object: "React",
        property: "useEffect",
        message:
          "Avoid useEffect when possible; use it only to synchronize with an external system.",
      },
    ],
    "require-await": "off",
    "typescript/ban-ts-comment": [
      "error",
      {
        minimumDescriptionLength: 10,
        "ts-check": false,
        "ts-expect-error": "allow-with-description",
        "ts-ignore": true,
        "ts-nocheck": true,
      },
    ],
    "typescript/consistent-type-assertions": [
      "error",
      {
        assertionStyle: "never",
      },
    ],
    "typescript/no-confusing-void-expression": "error",
    "typescript/no-deprecated": "error",
    "typescript/no-explicit-any": "error",
    "typescript/no-floating-promises": "error",
    "typescript/no-misused-promises": "error",
    "typescript/no-non-null-assertion": "error",
    "typescript/no-unnecessary-condition": "error",
    "typescript/no-unnecessary-type-assertion": "error",
    "typescript/no-unsafe-argument": "error",
    "typescript/no-unsafe-assignment": "error",
    "typescript/no-unsafe-call": "error",
    "typescript/no-unsafe-enum-comparison": "error",
    "typescript/no-unsafe-member-access": "error",
    "typescript/no-unsafe-return": "error",
    "typescript/no-unsafe-type-assertion": "error",
    "typescript/only-throw-error": "error",
    "typescript/prefer-readonly-parameter-types": "off",
    "typescript/promise-function-async": "off",
    "typescript/require-await": "error",
    "typescript/strict-boolean-expressions": "error",
    "typescript/switch-exhaustiveness-check": "error",
    "typescript/use-unknown-in-catch-callback-variable": "error",
    "react/exhaustive-deps": "error",
    "react/jsx-max-depth": [
      "error",
      {
        max: 5,
      },
    ],
    "react/no-array-index-key": "error",
    "react/no-danger": "error",
    "react/no-unstable-nested-components": [
      "error",
      {
        allowAsProps: false,
      },
    ],
    // Current Oxlint exposes compiler checks through the correctness category.
    "react/react-in-jsx-scope": "off",
    "react/rules-of-hooks": "error",
    "import/no-commonjs": [
      "error",
      {
        allowConditionalRequire: false,
        allowPrimitiveModules: false,
        allowRequire: false,
      },
    ],
    "import/no-cycle": "error",
    "import/no-duplicates": "error",
    "import/no-namespace": "error",
    "import/no-unassigned-import": [
      "error",
      {
        allow: ["**/*.css", "@testing-library/jest-dom/vitest"],
      },
    ],
    "unicorn/no-abusive-eslint-disable": "error",
  },
  overrides: [
    {
      files: ["**/*.test.{ts,tsx}"],
      plugins: [...basePlugins, "vitest"],
      rules: {
        "vitest/no-conditional-expect": "error",
        "vitest/no-disabled-tests": "error",
        "vitest/no-focused-tests": "error",
        "vitest/valid-expect": "error",
        "vitest/valid-expect-in-promise": "error",
      },
    },
  ],
})
