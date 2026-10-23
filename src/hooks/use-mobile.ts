import { useSyncExternalStore } from "react"
const query = () => window.matchMedia("(max-width: 767px)")
function subscribe(listener: () => void) {
  const media = query()
  media.addEventListener("change", listener)
  return () => {
    media.removeEventListener("change", listener)
  }
}
export function useIsMobile() {
  return useSyncExternalStore(
    subscribe,
    () => query().matches,
    () => false,
  )
}
