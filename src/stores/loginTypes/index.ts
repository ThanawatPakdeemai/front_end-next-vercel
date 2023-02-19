import configZustandDevTools from "@utils/configDevtools"
import { create } from "zustand"
import { devtools } from "zustand/middleware"

interface ILoginTypesStore {
  getClickLoginFacebook: boolean
  setClickLoginFacebook: (_toggle: boolean) => void
}

const useLoginTypeStore = create<ILoginTypesStore>()(
  devtools(
    (set) => ({
      getClickLoginFacebook: false,
      setClickLoginFacebook: (_toggle: boolean) => {
        set(() => ({ getClickLoginFacebook: _toggle }))
      }
    }),
    configZustandDevTools("LoginTypes-Store")
  )
)

export default useLoginTypeStore
