import services from "@configs/axiosGlobalConfig"
import {
  IRewardWeekly,
  IWeeklyPoolByGameIdResponse
} from "@feature/rewardWeekly/interfaces/IRewardWeeklyService"

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

export const getWeeklyPoolByGameId = (_gameId: string, _weekyId: string) =>
  new Promise<IWeeklyPoolByGameIdResponse>((resolve, reject) => {
    const body = _weekyId
      ? {
          pool_id: _weekyId
        }
      : {}
    services
      .post<IWeeklyPoolByGameIdResponse>(
        `/weekly-pool/get_player_reward_weekly/game/${_gameId}`,
        body
      )
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => reject(error))
  })
