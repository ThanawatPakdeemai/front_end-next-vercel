import create from "zustand"
import { IGame } from "@src/features/game/interfaces/IGameService"

export interface IUseGameItemStore {
  data: IGame[]
  setGameFree: (_data: IGame[]) => void
  clearGameFree: () => void
}
