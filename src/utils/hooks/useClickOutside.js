import { useState, useCallback, useRef, useEffect } from "react"

// eslint-disable-next-line import/prefer-default-export
export function useClickOutside(handler) {
  const ref = useRef(null)
  const [state, setState] = useState({
    hasClickedOutside: false,
  })
  const handleEvent = useCallback(
    (e) => {
      if (ref && ref.current) {
        if (ref.current.contains(e.target)) {
          setState({ hasClickedOutside: false })
        } else {
          setState({ hasClickedOutside: true })
          if (handler != null) {
            handler(e)
          }
        }
      }
    },
    [handler]
  )

  useEffect(() => {
    if (window.PointerEvent) {
      document.addEventListener("pointerdown", handleEvent)
    } else {
      document.addEventListener("mousedown", handleEvent)
      document.addEventListener("touchstart", handleEvent)
    }

    return () => {
      if (window.PointerEvent) {
        document.removeEventListener("pointerdown", handleEvent)
      } else {
        document.removeEventListener("mousedown", handleEvent)
        document.removeEventListener("touchstart", handleEvent)
      }
    }
  }, [handleEvent])

  return [ref, state.hasClickedOutside]
}
