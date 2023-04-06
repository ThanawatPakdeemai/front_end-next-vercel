import services from "@configs/axiosGlobalConfig"
import {
  IShareToEarnAction,
  IShareToEarnResponse
} from "@feature/authentication/interfaces/IAuthService"

export const shareToEarnAction = ({
  player_id,
  game_id,
  code
}: IShareToEarnAction) =>
  new Promise<IShareToEarnResponse>((resolve, reject) => {
    const data = {
      player_id,
      game_id,
      code
    }
    services
      .post<IShareToEarnResponse>("/share_to_earn/share-action/", { ...data })
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => reject(error))
  })

export const shareToEarnActionTracking = ({
  player_id,
  game_id,
  code
}: IShareToEarnAction) =>
  new Promise<IShareToEarnResponse>((resolve, reject) => {
    const data = {
      player_id,
      game_id,
      code
    }
    services
      .post<IShareToEarnResponse>("/share_to_earn/tracking", { ...data })
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => reject(error))
  })
