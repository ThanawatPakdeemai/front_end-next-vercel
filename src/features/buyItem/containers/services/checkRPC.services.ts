import services from "@configs/axiosGlobalConfig"
import { ICurrencyCheckResponse } from "@feature/buyItem/interfaces/ICurrencyCheck"

export const currencyBSC = () =>
  new Promise<ICurrencyCheckResponse>((resolve, reject) => {
    services
      .get("/polygon/check-rpc-polygon/bsc")
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject(err)
      })
  })

export const currencyBSCTestnet = () =>
  new Promise<ICurrencyCheckResponse>((resolve, reject) => {
    services
      .get("/polygon/check-rpc-polygon/bsc-testnet")
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject(err)
      })
  })

export const currencyPolygon = () =>
  new Promise<ICurrencyCheckResponse>((resolve, reject) => {
    services
      .get("/check-rpc-polygon/polygon")
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject(err)
      })
  })

export const currencyPolygonTestnet = () =>
  new Promise<ICurrencyCheckResponse>((resolve, reject) => {
    services
      .get("/polygon/check-rpc-polygon/polygon-testnet")
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
