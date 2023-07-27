import configZustandDevTools from "@utils/configDevtools"
import { create } from "zustand"
import { devtools, persist } from "zustand/middleware"

interface ILoginTypesStore {
  getClickLoginTypes: string
  setClickLoginTypes: (_toggle: string) => void
}

const useLoginTypeStore = create<ILoginTypesStore>()(
  devtools(
    persist(
      (set) => ({
        getClickLoginTypes: "",
        setClickLoginTypes: (_types: string) => {
          set(
            () => ({ getClickLoginTypes: _types }),
            false,
            "TypeStores/UseTypesStore"
          )
        }
      }),
      configZustandDevTools("loginWith")
    )
  )
)

export default useLoginTypeStore
