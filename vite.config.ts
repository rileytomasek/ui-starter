import { resolve } from "node:path"
import tailwindcss from "@tailwindcss/vite"
import Icons from "unplugin-icons/vite"
import { FileSystemIconLoader } from "unplugin-icons/loaders"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
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
