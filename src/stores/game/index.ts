import { GameAllId, IGame } from "@src/features/game/interfaces/IGameService"
import create from "zustand"

export interface IUseGameItemStore {
  data: null
  dataId: []
  onSetGameData: (_data: IGame[]) => void
  onClearGameData: () => void
  onSetGameID: (_dataAiiID: GameAllId[]) => void
  onClearGameID: () => void
  getGame: () => void
}

const useGameStore = create<IUseGameItemStore>((set, get) => ({
  data: null,
  dataId: [],
  onSetGameData: () => set((state) => ({ data: state.data })),
  onClearGameData: () => set(() => ({ data: null })),
  onSetGameID: () => set((state) => ({ dataId: state.dataId })),
  onClearGameID: () => set(() => ({ dataId: [] })),
  getGame: () => get().data
}))

export default useGameStore
