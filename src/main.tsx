import { StrictMode, Suspense, lazy } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter, Route, Routes } from "react-router"
import App from "./App"
import { ThemeProvider } from "@/components/theme"
import { TooltipProvider } from "@/components/ui/tooltip"
import "./index.css"
const Gallery =
  import.meta.env.DEV || import.meta.env.MODE === "gallery"
    ? lazy(() => import("./gallery/Gallery"))
    : null
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <TooltipProvider>
        <BrowserRouter>
          <Suspense fallback={<p className="p-6 text-sm">Loading…</p>}>
            <Routes>
              {Gallery && <Route path="/__gallery/*" element={<Gallery />} />}
              <Route path="/*" element={<App />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </StrictMode>,
)
