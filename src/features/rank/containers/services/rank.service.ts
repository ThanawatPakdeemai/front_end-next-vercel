import services from "@configs/axiosGlobalConfig"
import { IProfile } from "@feature/profile/interfaces/IProfileService"
import Helper from "@utils/helper"
import { ELocalKey } from "@interfaces/ILocal"

const email = Helper.getLocalStorage(ELocalKey.email)

const updateRank = (game_id: string) =>
  new Promise<IProfile>((resolve, reject) => {
    if (game_id) {
      services
        .get(`/profile/rank/${game_id}/${email}`)
        .then((res) => {
          resolve(res.data)
        })
        .catch((err) => {
          reject(err)
        })
    }
  })

export { updateRank }
