import services from "@configs/axiosGlobalConfig"
import { IBadgeResponse } from "@feature/badge/interfaces/IBadgeService"

const getBadgeplayerId = (player_id: string) =>
  new Promise<IBadgeResponse>((resolve, reject) => {
    if (player_id) {
      services
        .get(`/badge/collected/${player_id}`)
        .then((res) => {
          resolve(res.data)
        })
        .catch((err) => {
          reject(err)
        })
    }
  })

export { getBadgeplayerId }
