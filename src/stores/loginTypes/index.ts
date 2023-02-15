import configZustandDevTools from "@utils/configDevtools"
import { create } from "zustand"
import { devtools } from "zustand/middleware"

interface ILoginTypesStore {
  loginTypes: {
    types: string | null
  }
  getLoginTypes: () => string | null
  setLoginTypes: (_type: string) => void
  getClickLoginFacebook: boolean
  setClickLoginFacebook: (_toggle: boolean) => void
}

const useLoginTypeStore = create<ILoginTypesStore>()(
  devtools(
    (set, get) => ({
      loginTypes: { types: null },
      getLoginTypes: () => get().loginTypes.types,
      setLoginTypes: (_type) => {
        set(
          () => ({ loginTypes: { types: _type } }),
          false,
          "LoginTypes/setLoginTypes"
        )
      },
      getClickLoginFacebook: false,
      setClickLoginFacebook: (_toggle: boolean) => {
        set(() => ({ getClickLoginFacebook: _toggle }))
      }
    }),
    configZustandDevTools("LoginTypes-Store")
  )
)

export default useLoginTypeStore
