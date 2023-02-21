import services from "@configs/axiosGlobalConfig"
import { IGame } from "@feature/game/interfaces/IGameService"

const getHomeSlide = () =>
  new Promise<IGame[]>((resolve, reject) => {
    services
      .get(`/game/banner/all`)
      .then((res) => {
        resolve(res.data.data)
      })
      .catch((err) => {
        reject(err)
      })
  })

export { getHomeSlide }
