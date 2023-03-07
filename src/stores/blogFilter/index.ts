import { create } from "zustand"
import { devtools } from "zustand/middleware"
import configZustandDevTools from "@utils/configDevtools"

interface ISearch {
  search: string
  category: string
  gameItem: string
  device: string
  setSearch: (_search: string) => void
  setCategory: (_category: string) => void
  setGameItem: (_gameItem: string) => void
  setDevice: (_device: string) => void
  clearSearch: () => void
  clearCategory: () => void
  clearGameItem: () => void
  clearDevice: () => void
}

const useFilterStore = create<ISearch>()(
  devtools(
    (set) => ({
      search: "",
      category: "all",
      gameItem: "all",
      device: "all",
      setSearch: (_search: string) => {
        set(() => ({ search: _search }), false, "FilterStore/SetSearch")
      },
      setCategory: (_category) => {
        set(() => ({ category: _category }), false, "FilterStore/SetCategory")
      },
      setGameItem: (_gameItem) => {
        set(() => ({ gameItem: _gameItem }), false, "FilterStore/SetGameItem")
      },
      setDevice: (_device) => {
        set(() => ({ device: _device }), false, "FilterStore/SetDevice")
      },
      clearSearch: () => {
        set(() => ({ search: "" }), false, "FilterStore/clearSearch")
      },
      clearCategory: () => {
        set(() => ({ category: "all" }), false, "FilterStore/clearCategory")
      },
      clearGameItem: () => {
        set(() => ({ gameItem: "all" }), false, "FilterStore/clearGameItem")
      },
      clearDevice: () => {
        set(() => ({ device: "all" }), false, "FilterStore/clearDevice")
      }
    }),
    configZustandDevTools("Search-Store")
  )
)

export default useFilterStore
