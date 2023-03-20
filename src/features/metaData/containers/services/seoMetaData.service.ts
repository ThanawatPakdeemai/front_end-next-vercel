import services from "@configs/axiosGlobalConfig"
import CONFIGS from "@configs/index"
import { ISeoResponse } from "@feature/metaData/interfaces/ISeoData"

const getSeoAll = () =>
  new Promise((resolve, reject) => {
    services
      .get(`${CONFIGS.BASE_URL.API}/seo/all`)
      .then((res) => {
        resolve(res.data)
      })
      .catch((error: Error) => {
        reject(error)
      })
  })

const getSeoByPath = (path) =>
  new Promise((resolve, reject) => {
    services
      .post<ISeoResponse>(`${CONFIGS.BASE_URL.API}/seo/url`, path)
      .then((res) => {
        resolve(res.data)
      })
      .catch((error: Error) => {
        reject(error)
      })
  })

export { getSeoAll, getSeoByPath }
