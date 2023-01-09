import { GameAllId, IGame } from "@src/features/game/interfaces/IGameService"
import configZustandDevTools from "@src/utils/configDevtools"
import create from "zustand"
import { devtools } from "zustand/middleware"

export interface IUseGameItemStore {
  data: IGame | null
  gameId: GameAllId[]
  onSetGameData: (_game: IGame) => void
  clearGameData: () => void
  setGameID: (_gameID: GameAllId[]) => void
  setGame: (game: IGame) => void
  clearGameID: () => void
  getGame: () => void
}

const useGameStore = create<IUseGameItemStore>()(
  devtools(
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
      setGame: (data) => {
        set(() => ({ data }))
      },
      clearGameID: () => {
        set(() => ({ gameId: [] }), false, "GameStore/clearGameID")
      },
      getGame: () => get().data
    }),
    configZustandDevTools("Game-Store")
  )
)

export default useGameStore
