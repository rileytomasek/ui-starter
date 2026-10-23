// Runs before styles/React so first paint matches the selected appearance.
;(() => {
  let mode = "system"
  try {
    const stored = localStorage.getItem("app.theme")
    if (["light", "dark", "system"].includes(stored)) mode = stored
  } catch {
    /* Storage may be unavailable. */
  }
  const dark =
    mode === "dark" || (mode === "system" && matchMedia("(prefers-color-scheme: dark)").matches)
  document.documentElement.classList.toggle("dark", dark)
  document.documentElement.style.colorScheme = dark ? "dark" : "light"
})()
