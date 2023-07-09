import configZustandDevTools from "@utils/configDevtools"
import { create } from "zustand"
import { devtools } from "zustand/middleware"

interface ILoginTypesStore {
  getClickLoginFacebook: boolean
  setClickLoginFacebook: (_toggle: boolean) => void
  getClickLoginTypes: string
  setClickLoginTypes: (_toggle: string) => void
}

const useLoginTypeStore = create<ILoginTypesStore>()(
  devtools(
    (set) => ({
      getClickLoginFacebook: false,
      getClickLoginTypes: "",
      setClickLoginFacebook: (_toggle: boolean) => {
        set(() => ({ getClickLoginFacebook: _toggle }))
      },
      setClickLoginTypes: (_types: string) => {
        set(() => ({ getClickLoginTypes: _types }))
      }
    }),
    configZustandDevTools("LoginTypes-Store")
  )
)

export default useLoginTypeStore
