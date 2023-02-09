import create from "zustand"
import { devtools } from "zustand/middleware"
import configZustandDevTools from "@utils/configDevtools"
import { IQuestData } from "@feature/quest/interfaces/IQuestService"

interface IQuestStore {
  data: IQuestData | null
  getQuestStore: () => void
  setQuestStore: (_quest: IQuestData) => void
  clearQuestStore: () => void
}
const useQuestStore = create<IQuestStore>()(
  devtools(
    (set, get) => ({
      data: null,
      getQuestStore: () => get().data,
      setQuestStore: (_quest) => {
        set(() => ({ data: _quest }), false, "QuestStore/setQuestStore")
      },
      clearQuestStore: () => {
        set(() => ({ data: null }), false, "QuestStore/clearQuestStore")
      }
    }),
    configZustandDevTools("RewardFreeToEarn-Store")
  )
)

export default useQuestStore
