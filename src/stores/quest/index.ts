import create from "zustand"
import { devtools } from "zustand/middleware"
import configZustandDevTools from "@utils/configDevtools"
import { IQuestData } from "@feature/quest/interfaces/IQuestService"

interface IQuestStore {
  data: IQuestData | null
  open: boolean
  setOpen: () => void
  setClose: () => void
  getQuestStore: () => void
  setQuestStore: (_quest: IQuestData) => void
  clearQuestStore: () => void
}
const useQuestStore = create<IQuestStore>()(
  devtools(
    (set, get) => ({
      data: null,
      open: false,
      getQuestStore: () => get().data,
      setOpen: () => {
        set(() => ({ open: true }), false, "QuestStore/setFalse")
      },
      setClose: () => {
        set(() => ({ open: false }), false, "QuestStore/setClose")
      },
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
