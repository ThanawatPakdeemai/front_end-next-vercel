import { IGameItemList } from "@feature/gameItem/interfaces/IGameItemService"
import { GameAllId, IGame } from "@src/features/game/interfaces/IGameService"
import configZustandDevTools from "@src/utils/configDevtools"
import create from "zustand"
import { devtools, persist } from "zustand/middleware"

export interface IUseGameItemStore {
  data: IGame | null
  gameId: GameAllId[]
  onSetGameData: (_game: IGame) => void
  clearGameData: () => void
  setGameID: (_gameID: GameAllId[]) => void
  clearGameID: () => void
  getGame: () => void
  getItemSelected: () => void
  itemSelected: IGameItemList | null
  onSetGameItemSelectd: (_item: IGameItemList) => void
}

const useGameStore = create<IUseGameItemStore>()(
  devtools(
    persist(
      (set, get) => ({
        data: null,
        gameId: [],
        onSetGameData: (_game) => {
          set(() => ({ data: _game }), false, "GameStore/setGame")
        },
        clearGameData: () => {
          set(() => ({ data: null }), false, "GameStore/clearGameData")
        },
        setGameID: (_gameID) => {
          set(() => ({ gameId: _gameID }), false, "GameStore/setGameID")
        },
        clearGameID: () => {
          set(() => ({ gameId: [] }), false, "GameStore/clearGameID")
        },
        getGame: () => get().data,
        getItemSelected: () => get().itemSelected,
        itemSelected: null,
        onSetGameItemSelectd: (_item) => {
          set(
            () => ({ itemSelected: _item }),
            false,
            "GameStore/setGameItemSelected"
          )
        }
      }),
      configZustandDevTools("Game-Store")
    )
  )
)

export default useGameStore
