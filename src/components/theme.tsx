import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react"
export type ThemeMode = "light" | "dark" | "system"
const ThemeContext = createContext<{
  mode: ThemeMode
  resolved: "light" | "dark"
  setMode: (mode: ThemeMode) => void
} | null>(null)
const media = () => window.matchMedia("(prefers-color-scheme: dark)")
const subscribe = (callback: () => void) => {
  const query = media()
  query.addEventListener("change", callback)
  return () => {
    query.removeEventListener("change", callback)
  }
}
function stored(): ThemeMode {
  try {
    const value = localStorage.getItem("app.theme")
    if (value === "light" || value === "dark") return value
  } catch {
    /* Use System without storage. */
  }
  return "system"
}
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, update] = useState<ThemeMode>(stored)
  const dark = useSyncExternalStore(
    subscribe,
    () => media().matches,
    () => false,
  )
  const systemMode = dark ? "dark" : "light"
  const resolved = mode === "system" ? systemMode : mode
  useLayoutEffect(() => {
    document.documentElement.classList.toggle("dark", resolved === "dark")
    document.documentElement.style.colorScheme = resolved
  }, [resolved])
  const setMode = useCallback((next: ThemeMode) => {
    update(next)
    try {
      localStorage.setItem("app.theme", next)
    } catch {
      /* Keep an in-memory choice. */
    }
  }, [])
  const context = useMemo(() => ({ mode, resolved, setMode }), [mode, resolved, setMode])
  return <ThemeContext.Provider value={context}>{children}</ThemeContext.Provider>
}
export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) throw new Error("Use ThemeProvider around appearance controls")
  return context
}
