import services from "@src/configs/axiosGlobalConfig"
import { BASE_URL } from "@src/constants/site"
import { IProfile } from "@src/features/profile/interfaces/IProfileService"
import helper from "@src/utils/helper"

const email = helper.getLocalStorage("email")

const updateRank = (game_id: string) =>
  new Promise<IProfile>((resolve, reject) => {
    if (game_id) {
      services
        .get(`${BASE_URL.api}/profile/rank/${game_id}/${email}`)
        .then((res) => {
          resolve(res.data)
        })
        .catch((err) => {
          reject(err)
        })
    }
  })

export { updateRank }
