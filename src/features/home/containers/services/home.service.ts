import services from "@configs/axiosGlobalConfig"
import {
  IHomeSlideResponse,
  IPointCurrentResponse
} from "@features/home/interfaces/IHomeService"

const getHomeSlide = () =>
  new Promise<IHomeSlideResponse>((resolve, reject) => {
    services
      .get(`/game/banner/all`)
      .then((res) => {
        resolve(res.data)
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
