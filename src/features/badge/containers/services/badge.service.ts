import services from "@configs/axiosGlobalConfig"
import { IBadgeResponse } from "@feature/badge/interfaces/IBadgeService"

const getBadgeplayerId = (_playerId: string) =>
  new Promise<IBadgeResponse>((resolve, reject) => {
    if (_playerId) {
      services
        .get(`/badge/collected/${_playerId}`)
        .then((res) => {
          resolve(res.data)
        })
        .catch((err) => {
          reject(err)
        })
    }
  })

export { getBadgeplayerId }
