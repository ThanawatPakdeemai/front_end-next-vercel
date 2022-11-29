import services from "@configs/axiosGlobalConfig"
import {
  IRewardWeekly,
  IWeeklyRewardObject
} from "@feature/rewardWeekly/interfaces/IRewardWeeklyService"

export const getWeeklyPoolPlayer = (weekly_pool_id: string) =>
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

export const getWeeklyReward = (game_id: string, weeklyId: any) =>
  new Promise<IWeeklyRewardObject>((resolve, reject) => {
    services
      .post(`/weekly-pool/get_player_reward_weekly/${game_id}`, {
        pool_id: weeklyId
      })
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => reject(error))
  })

export const getRewardGamePool = (pool_id: string) =>
  new Promise((resolve, reject) => {
    services
      .get<IRewardWeekly>(`/weekly-pool/get_player_reward_game_pool/${pool_id}`)
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => reject(error))
  })
