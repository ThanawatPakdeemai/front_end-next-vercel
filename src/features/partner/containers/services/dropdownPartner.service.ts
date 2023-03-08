import services from "@configs/axiosGlobalConfig"
import CONFIGS from "@configs/index"

const getGamePartner = () =>
  new Promise<any>((resolve, reject) => {
    services
      .get(`${CONFIGS.BASE_URL.API}/partner-game-content/all/genres`)
      .then((res) => {
        resolve(res)
      })
      .catch((error: Error) => {
        reject(error)
      })
  })

const filterGamePartner = (data) =>
  new Promise<any>((resolve, reject) => {
    services
      .post(`${CONFIGS.BASE_URL.API}/partner-game-content/all`, data)
      .then((res) => {
        resolve(res)
      })
      .catch((error: Error) => {
        reject(error)
      })
  })

export { getGamePartner, filterGamePartner }
