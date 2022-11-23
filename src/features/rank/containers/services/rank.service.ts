import services from "@src/configs/axiosGlobalConfig"
import { BASE_URL } from "@src/constants/site"
import { IProfile } from "@src/features/profile/interfaces/IProfileService"
import Helper from "@src/utils/helper"
import { ELocalKey } from "@src/interfaces/ILocal"

const email = Helper.getLocalStorage(ELocalKey.email)

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
