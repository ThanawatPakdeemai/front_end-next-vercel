import services from "@src/configs/axiosGlobalConfig"
import { BASE_URL } from "@src/constants/site"
import { IBadgeResponse } from "../../interfaces/IBadge"

const getBadgeplayerId = (player_id: string) =>
  new Promise<IBadgeResponse>((resolve, reject) => {
    if (player_id) {
      services
        .get(`${BASE_URL.api}/badge/collected/${player_id}`)
        .then((res) => {
          resolve(res.data)
        })
        .catch((err) => {
          reject(err)
        })
    }
  })

export { getBadgeplayerId }
