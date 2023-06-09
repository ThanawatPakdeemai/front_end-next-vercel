import configZustandDevTools from "@utils/configDevtools"
import { create } from "zustand"
import { devtools } from "zustand/middleware"

interface IScrollToEndTypesStore {
  getScrollToEndScreen: boolean
  setScrollToEndScreen: (_toggle: boolean) => void
}

const useScrollToEndStore = create<IScrollToEndTypesStore>()(
  devtools(
    (set) => ({
      getScrollToEndScreen: false,
      setScrollToEndScreen: (_toggle: boolean) => {
        set(() => ({ getScrollToEndScreen: _toggle }))
      }
    }),
    configZustandDevTools("ScrollToEnd-Store")
  )
)

export default useScrollToEndStore
