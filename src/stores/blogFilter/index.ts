import { create } from "zustand"
import { devtools } from "zustand/middleware"
import configZustandDevTools from "@utils/configDevtools"
import { TGameType } from "@feature/game/interfaces/IGameService"

interface ISearch {
  search: string
  category: string
  gameItem: string
  device: string
  game_type: TGameType
  setSearch: (_search: string) => void
  setCategory: (_category: string) => void
  setGameItem: (_gameItem: string) => void
  setDevice: (_device: string) => void
  setGameType: (_gameType: TGameType) => void
  clearSearch: () => void
  clearCategory: () => void
  clearGameItem: () => void
  clearDevice: () => void
  clearGameType: () => void
}

const useFilterStore = create<ISearch>()(
  devtools(
    (set) => ({
      search: "",
      category: "all",
      gameItem: "all",
      device: "all",
      game_type: "all",
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
      setGameType: (_gameType) => {
        set(() => ({ game_type: _gameType }), false, "FilterStore/SetDevice")
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
      },
      clearGameType: () => {
        set(() => ({ game_type: "all" }), false, "FilterStore/clearGameType")
      }
    }),
    configZustandDevTools("Search-Store")
  )
)

export default useFilterStore
