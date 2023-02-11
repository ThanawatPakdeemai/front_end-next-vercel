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
}

const useFilterStore = create<ISearch>()(
  devtools(
    (set) => ({
      search: "",
      category: "",
      gameItem: "",
      device: "",
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
      }
    }),
    configZustandDevTools("Search-Store")
  )
)

export default useFilterStore
