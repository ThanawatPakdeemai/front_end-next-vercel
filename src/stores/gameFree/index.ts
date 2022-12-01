import { IGame } from "@src/features/game/interfaces/IGameService"
import create from "zustand"

export interface IUseGameItemStore {
  data: IGame[]
  setGameFree: (_data: IGame[]) => void
  clearGameFree: () => void
}

const uesGameFreeStore = create<IUseGameItemStore>((set) => ({
  data: [],
  setGameFree: (data) => set((state) => ({ ...state, data })),
  clearGameFree: () => set(() => ({ data: [] }))
}))

export default uesGameFreeStore
