import { create } from "zustand"
import { devtools } from "zustand/middleware"
import configZustandDevTools from "@utils/configDevtools"
import { IGameRewardByPlayer } from "@feature/game/interfaces/IGameService"

interface IRewardFreeToEarnStore {
  data: IGameRewardByPlayer[]
  getRewardFreeToEarn: () => IGameRewardByPlayer[]
  setRewardFreeEarn: (_reward: IGameRewardByPlayer[]) => void
  clearRewardFreeEarn: () => void
}
const useRewardFreeToEarnStore = create<IRewardFreeToEarnStore>()(
  devtools(
    (set, get) => ({
      data: [],
      getRewardFreeToEarn: () => get().data,
      setRewardFreeEarn: (_reward) => {
        set(
          () => ({ data: _reward }),
          false,
          "RewardFreeToEarnStore/setRewardFreeEarn"
        )
      },
      clearRewardFreeEarn: () => {
        set(
          () => ({ data: [] }),
          false,
          "RewardFreeToEarnStore/clearRewardFreeEarn"
        )
      }
    }),
    configZustandDevTools("RewardFreeToEarn-Store")
  )
)

export default useRewardFreeToEarnStore
