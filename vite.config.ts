import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { resolve } from "node:path"
import { FileSystemIconLoader } from "unplugin-icons/loaders"
import Icons from "unplugin-icons/vite"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  optimizeDeps: {
    include: [
      "@base-ui/react",
      "react-hook-form",
      "@hookform/resolvers/zod",
      "zod",
      "react-markdown",
      "remark-gfm",
      "@tanstack/react-table",
      "react-day-picker",
      "@base-ui/react/alert-dialog",
      "@base-ui/react/avatar",
      "@base-ui/react/button",
      "@base-ui/react/checkbox",
      "@base-ui/react/collapsible",
      "@base-ui/react/dialog",
      "@base-ui/react/input",
      "@base-ui/react/menu",
      "@base-ui/react/merge-props",
      "@base-ui/react/popover",
      "@base-ui/react/select",
      "@base-ui/react/separator",
      "@base-ui/react/tabs",
      "@base-ui/react/tooltip",
      "@base-ui/react/use-render",
      "cmdk",
      "react-router",
    ],
  },
  plugins: [
    react(),
    tailwindcss(),
    Icons({
      compiler: "jsx",
      jsx: "react",
      customCollections: { local: FileSystemIconLoader("./src/assets/icons") },
    }),
  ],
  resolve: {
    alias: {
      "@": resolve(import.meta.dirname, "./src"),
    },
  },
})
