import { defineConfig } from "oxlint"
export default defineConfig({
  jsPlugins: ["@shadcn/lint"],
  rules: {
    "shadcn/no-raw-colors": "error",
    "shadcn/no-unknown-classes": "error",
    "shadcn/require-static-classes": "error",
    "shadcn/no-arbitrary-values": "error",
    "shadcn/no-restyle": [
      "error",
      {
        allow: ["layout"],
      },
    ],
  },
  overrides: [
    {
      files: [
        "src/components/ui/**",
        "src/hooks/use-highlighted-code.ts",
        "src/lib/highlighter.tsx",
      ],
      rules: {
        "shadcn/no-arbitrary-values": "off",
        "shadcn/no-restyle": "off",
        "shadcn/no-unknown-classes": "off",
      },
    },
    {
      files: ["src/components/ui/**"],
      rules: {
        "jsx-a11y/prefer-tag-over-role": "off",
      },
    },
    {
      files: ["src/components/ui/input-group.tsx", "src/components/ui/calendar.tsx"],
      rules: {
        "shadcn/require-static-classes": "off",
      },
    },
    {
      files: ["src/components/ui/input-group.tsx"],
      rules: {
        "jsx-a11y/click-events-have-key-events": "off",
        "jsx-a11y/no-noninteractive-element-interactions": "off",
      },
    },
    {
      files: ["src/components/ui/label.tsx"],
      rules: {
        "jsx-a11y/label-has-associated-control": "off",
      },
    },
    {
      files: ["src/components/ui/code-block.tsx"],
      rules: {
        "jsx-a11y/no-noninteractive-tabindex": "off",
      },
    },
    // BEGIN EXAMPLE TABLE
    {
      files: ["src/examples/project-table.tsx"],
      rules: {
        "react/incompatible-library": "off",
      },
    },
    // END EXAMPLE TABLE
    {
      files: ["src/components/markdown.tsx"],
      rules: {
        "jsx-a11y/no-noninteractive-tabindex": "off",
      },
    },
  ],
})
