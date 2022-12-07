import configZustandDevTools from "@utils/configDevtools"
import create from "zustand"
import { devtools } from "zustand/middleware"

interface ILoginTypesStore {
  loginTypes: {
    types: string | null
  }
  getLoginTypes: () => string | null
  setLoginTypes: (_type: string) => void
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
      }
    }),
    configZustandDevTools("LoginTypes-Store")
  )
)

export default useLoginTypeStore
