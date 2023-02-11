import { IGameAllState } from "@src/features/game/interfaces/IGameService"
import configZustandDevTools from "@src/utils/configDevtools"
import { create } from "zustand"
import { devtools } from "zustand/middleware"

export interface IUesGameAllStore {
  data: IGameAllState[]
  gameActive: IGameAllState[]
  setGameAll: (_gameAll: IGameAllState[]) => void
  getGameInFo: () => IGameAllState[]
  clearGameAll: () => void
  setGameAllActive: (_gameActive: IGameAllState[]) => void
  clearGameAllActiv: () => void
}

const uesGameAllStore = create<IUesGameAllStore>()(
  devtools(
    (set, get) => ({
      data: [],
      gameActive: [],
      getGameInFo: () => get().data,
      setGameAll: (_gameAll) => {
        set(() => ({ data: _gameAll }), false, "GameAllStore/setGameAll")
      },
      clearGameAll: () => {
        set(() => ({ data: [] }), false, "GameAllStore/clearGameAll")
      },
      setGameAllActive: (_gameActive) => {
        set(
          () => ({ gameActive: _gameActive }),
          false,
          "GameAllStore/setGameAllActive"
        )
      },
      clearGameAllActiv: () => {
        set(() => ({ gameActive: [] }), false, "GameAllStore/clearGameAllActiv")
      }
    }),
    configZustandDevTools("GameAll-Store")
  )
)

export default uesGameAllStore
