/* eslint-disable no-new */
import services from "@configs/axiosGlobalConfig"
import { IGolds } from "@feature/profile/interfaces/IProfileService"

export const getGolds = (_address: string) =>
  new Promise<IGolds>((resolve, reject) => {
    const data = { address: _address }
    services
      .post<IGolds>(`/profile/get/gold`, { ...data })
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => reject(error))
  })
