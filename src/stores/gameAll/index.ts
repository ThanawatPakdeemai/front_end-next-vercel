import { IGameAllState } from "@src/features/game/interfaces/IGameService"
import create from "zustand"

export interface IUesGameAllStore {
  data: IGameAllState[]
  dataActive: IGameAllState[]
  onSetGameAll: (_data: IGameAllState[]) => void
  getGameInFo: () => IGameAllState[]
  onClearGameAll: () => void
  onSetGameAllActive: () => void
  onClearGameAllActiv: (_dataActive: IGameAllState[]) => void
}

const uesGameAllStore = create<IUesGameAllStore>((set, get) => ({
  data: [],
  dataActive: [],
  getGameInFo: () => get().data,
  onSetGameAll: () => set((state) => ({ data: state.data })),
  onClearGameAll: () => set(() => ({ data: [] })),
  onSetGameAllActive: () => set((state) => ({ dataActive: state.data })),
  onClearGameAllActiv: () => set(() => ({ dataActive: [] }))
}))

export default uesGameAllStore
