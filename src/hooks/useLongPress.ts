import { useState, useEffect } from "react"

// eslint-disable-next-line @typescript-eslint/no-empty-function
export default function useLongPress(callback = () => {}, ms = 300) {
  const [startLongPress, setStartLongPress] = useState(false)

  useEffect(() => {
    let cancel = false
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let timerId: any
    if (startLongPress) {
      if (cancel) return
      timerId = setTimeout(callback, ms)
    } else {
      if (cancel) return
      clearTimeout(timerId)
    }

    return () => {
      cancel = true
      clearTimeout(timerId)
    }
  }, [callback, ms, startLongPress])

  useEffect(() => {
    if (startLongPress) {
      callback()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startLongPress])

  return {
    onMouseDown: () => setStartLongPress(true),
    onMouseUp: () => setStartLongPress(false),
    onMouseLeave: () => setStartLongPress(false)
    /**
     * HIDE this because this code effect to mobile.
     */
    // onTouchStart: () => setStartLongPress(true),
    // onTouchEnd: () => setStartLongPress(false),
  }
}
