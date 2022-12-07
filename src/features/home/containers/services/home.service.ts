import services from "@configs/axiosGlobalConfig"
import { IGame } from "@feature/game/interfaces/IGameService"
import { IPointCurrentResponse } from "@feature/home/interfaces/IHomeService"

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

const getPriceCurrent = () =>
  new Promise<IPointCurrentResponse>((resolve, reject) => {
    services
      .get(`/price/current`)
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject(err)
      })
  })

export { getHomeSlide, getPriceCurrent }
