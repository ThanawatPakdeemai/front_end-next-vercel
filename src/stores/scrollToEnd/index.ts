import configZustandDevTools from "@utils/configDevtools"
import { create } from "zustand"
import { devtools } from "zustand/middleware"

interface IScrollToEndTypesStore {
  getScrollToEndScreen: boolean
  setScrollToEndScreen: (_toggle: boolean) => void
  getEndLimitApi: boolean
  setEndLimitApi: (_toggle: boolean) => void
  getCountCallApi: number
  setCountCallApi: (_count: number) => void
}

const useScrollToEndStore = create<IScrollToEndTypesStore>()(
  devtools(
    (set) => ({
      getScrollToEndScreen: false,
      setScrollToEndScreen: (_toggle: boolean) => {
        set(() => ({ getScrollToEndScreen: _toggle }))
      },
      getEndLimitApi: false,
      setEndLimitApi: (_toggle: boolean) => {
        set(() => ({ getEndLimitApi: _toggle }))
      },
      getCountCallApi: 0,
      setCountCallApi: (_count: number) => {
        set(() => ({ getCountCallApi: _count }))
      }
    }),
    configZustandDevTools("ScrollToEnd-Store")
  )
)

export default useScrollToEndStore
