import services from "@configs/axiosGlobalConfig"
import CONFIGS from "@configs/index"
import { IWebBecomeDev } from "@feature/become-developer/interfaces/IWebBecome"

export const getWebBecomeDeveloper = () =>
  new Promise<IWebBecomeDev>((resolve, reject) => {
    services
      .get<IWebBecomeDev>(`/web/web-become-dev/all`)
      .then((reponse) => {
        // eslint-disable-next-line no-console
        console.log("test-reponse", reponse)

        resolve(reponse.data)
      })
      .catch((error) => reject(error))
  })

export const linkToTelegram = (data: any) =>
  new Promise<any>((resolve, reject) => {
    services
      .put<any>(`${CONFIGS.BASE_URL.API}/profile/link-profile-telegram/`, data)
      .then((res) => {
        resolve(res.data)
      })
      .catch((error: Error) => {
        reject(error)
      })
  })
