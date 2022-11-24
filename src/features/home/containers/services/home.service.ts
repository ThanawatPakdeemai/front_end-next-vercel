import services from "@src/configs/axiosGlobalConfig"
import {
  IHomeSlideResponse,
  IPointCurrentResponse
} from "../../interfaces/IHomeService"
import { IPrice } from "../../interfaces/IPriceService"

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

const getNakaCurrent = () =>
  new Promise<IPrice | string>((resolve, reject) => {
    services
      .get(`/price/current`)
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
