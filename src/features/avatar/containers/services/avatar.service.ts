import services from "@configs/axiosGlobalConfig"
import { IGetAvatar } from "../../interfaces/IAvatarService"

export const getAllAvatar = () =>
  new Promise<IGetAvatar>((resolve, reject) => {
    services
      .get(`/setting/type/avatar`)
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        if (error instanceof Error) {
          reject(error.message)
        }
      })
  })
