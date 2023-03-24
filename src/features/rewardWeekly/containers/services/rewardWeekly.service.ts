import services from "@configs/axiosGlobalConfig"
import { IRewardWeekly } from "@feature/rewardWeekly/interfaces/IRewardWeeklyService"

export const getRewardByWeeklyPoolId = (weekly_pool_id: string) =>
  new Promise<IRewardWeekly>((resolve, reject) => {
    services
      .get<IRewardWeekly>(
        `/weekly-pool/get_player_reward_weekly/${weekly_pool_id}`
      )
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => reject(error))
  })

export const getGamePoolRewardByPoolId = (pool_id: string) =>
  new Promise<IRewardWeekly>((resolve, reject) => {
    services
      .get<IRewardWeekly>(`/game-pool/get_player_reward_game_pool/${pool_id}`)
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => reject(error))
  })
