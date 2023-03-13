import { create } from "zustand"
import { devtools } from "zustand/middleware"
import configZustandDevTools from "@utils/configDevtools"

interface ISearch {
  search: string
  setSearch: (_search: string) => void
  clearSearch: () => void
}

const useFilterEvents = create<ISearch>()(
  devtools(
    (set) => ({
      search: "",
      setSearch: (_search: string) => {
        set(() => ({ search: _search }), false, "FilterEvent/SetSearch")
      },
      clearSearch: () => {
        set(() => ({ search: "" }), false, "FilterEvent/clearSearch")
      }
    }),
    configZustandDevTools("Events-Store")
  )
)

export default useFilterEvents
