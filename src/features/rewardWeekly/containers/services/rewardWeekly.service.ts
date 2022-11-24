import services from "@src/configs/axiosGlobalConfig"
import { BASE_URL } from "@src/constants/site"
import { IRewardWeekly } from "../../interfaces/IRewardWeeklyService"

export const getWeeklyPoolPlayer = (weekly_pool_id: string) =>
  new Promise<IRewardWeekly>((resolve, reject) => {
    services
      .get<IRewardWeekly>(
        `${BASE_URL.api}/weekly-pool/get_player_reward_weekly/${weekly_pool_id}`
      )
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => reject(error))
  })

export const getRewardGamePool = (pool_id: string) =>
  new Promise((resolve, reject) => {
    services
      .get<IRewardWeekly>(
        `${BASE_URL.api}/weekly-pool/get_player_reward_game_pool/${pool_id}`
      )
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => reject(error))
  })
