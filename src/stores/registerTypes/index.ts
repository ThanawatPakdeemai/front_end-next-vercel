import configZustandDevTools from "@utils/configDevtools"
import { create } from "zustand"
import { devtools, persist } from "zustand/middleware"

interface IRegisterTypesStore {
  getClickRegisterTypes: string
  setClickRegisterTypes: (_toggle: string) => void
}

const useRegisterTypeStore = create<IRegisterTypesStore>()(
  devtools(
    persist(
      (set) => ({
        getClickRegisterTypes: "",
        setClickRegisterTypes: (_types: string) => {
          set(
            () => ({ getClickRegisterTypes: _types }),
            false,
            "TypeStores/UseTypesStore"
          )
        }
      }),
      configZustandDevTools("registerWith")
    )
  )
)

export default useRegisterTypeStore
