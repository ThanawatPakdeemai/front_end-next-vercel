import create from "zustand"
import { devtools } from "zustand/middleware"
import configZustandDevTools from "@utils/configDevtools"

interface ISearch {
  search: string
  setSearch: (_search: string) => void
}

const useSearchStore = create<ISearch>()(
  devtools(
    (set) => ({
      search: "",
      setSearch: (_search: string) => {
        set(() => ({ search: _search }), false, "SearchStore/SetSearch")
      }
    }),
    configZustandDevTools("Search-Store")
  )
)

export default useSearchStore
