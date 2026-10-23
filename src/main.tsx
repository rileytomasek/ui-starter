import { ThemeProvider } from "@/components/theme"
import { TooltipProvider } from "@/components/ui/tooltip"
import { StrictMode, Suspense, lazy } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter, Route, Routes } from "react-router"
import App from "./App"
import "./index.css"
const Gallery =
  import.meta.env.DEV || import.meta.env.MODE === "gallery"
    ? lazy(() => import("./gallery/Gallery"))
    : null
const root = document.querySelector("#root")
if (root === null) throw new Error("Missing application root")
createRoot(root).render(
  <StrictMode>
    <ThemeProvider>
      <TooltipProvider>
        <BrowserRouter>
          <ApplicationRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </StrictMode>,
)

function ApplicationRoutes() {
  return (
    <Suspense fallback={<p className="p-6 text-sm">Loading…</p>}>
      <Routes>
        {Gallery && <Route path="/__gallery/*" element={<Gallery />} />}
        <Route path="/*" element={<App />} />
      </Routes>
    </Suspense>
  )
}
