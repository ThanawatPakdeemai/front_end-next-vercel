import create from "zustand"
import { devtools } from "zustand/middleware"
import configZustandDevTools from "@utils/configDevtools"
import { IQuestData } from "@feature/quest/interfaces/IQuestService"

interface IQuestStore {
  data: IQuestData | null
  open: boolean
  missionType: string
  setMissionType: (_missionType: string) => void
  setOpen: () => void
  setClose: () => void
  getQuestStore: () => IQuestData | null
  setQuestStore: (_quest: IQuestData) => void
  clearQuestStore: () => void
}
const useQuestStore = create<IQuestStore>()(
  devtools(
    (set, get) => ({
      data: null,
      open: false,
      missionType: "main",
      setMissionType: (_missionType: string) => {
        set(
          () => ({ missionType: _missionType }),
          false,
          "QuestStore/SetMissionType"
        )
      },
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
