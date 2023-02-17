import configZustandDevTools from "@utils/configDevtools"
import create from "zustand"
import { devtools } from "zustand/middleware"

interface ILoadingStore {
  open: boolean
  message: string | undefined
  setOpen: (_message?: string) => void
  setClose: () => void
}

const useLoadingStore = create<ILoadingStore>()(
  devtools(
    (set) => ({
      open: false,
      message: "Loading in progress...",
      setOpen: (_message) => {
        set(
          () => ({
            open: true,
            message: _message || "Loading in progress..."
          }),
          false,
          "LoadingStore/setOpen"
        )
      },
      setClose: () => {
        set(() => ({ open: false }), false, "LoadingStore/setClose")
      }
    }),
    configZustandDevTools("Loading-Store")
  )
)

export default useLoadingStore
