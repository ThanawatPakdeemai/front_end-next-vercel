import { GameAllId, IGame } from "@src/features/game/interfaces/IGameService"
import create from "zustand"
import { devtools } from "zustand/middleware"

export interface IUseGameItemStore {
  data: IGame | null
  gameId: GameAllId[]
  onSetGameData: (_game: IGame) => void
  clearGameData: () => void
  setGameID: (_gameID: GameAllId[]) => void
  clearGameID: () => void
  getGame: () => void
}

const useGameStore = create<IUseGameItemStore>()(
  devtools((set, get) => ({
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
    getGame: () => get().data
  }))
)

export default useGameStore
