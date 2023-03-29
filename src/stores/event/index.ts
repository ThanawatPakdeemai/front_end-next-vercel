import { create } from "zustand"
import { devtools } from "zustand/middleware"
import configZustandDevTools from "@utils/configDevtools"

interface ISearch {
  search: string
  setSearch: (_search: string) => void
  clearSearch: () => void
}

const useEventFilter = create<ISearch>()(
  devtools(
    (set) => ({
      search: "",
      setSearch: (_search: string) => {
        set(() => ({ search: _search }), false, "EventFilterStore/SetSearch")
      },
      clearSearch: () => {
        set(() => ({ search: "" }), false, "EventFilterStore/clearSearch")
      }
    }),
    configZustandDevTools("EventFilter-Store")
  )
)

export default useEventFilter
