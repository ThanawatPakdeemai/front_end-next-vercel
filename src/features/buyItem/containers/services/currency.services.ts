// import services from "@configs/axiosGlobalConfig"
import CONFIGS from "@configs/index"
// import { ICurrencyCheckResponse } from "@feature/buyItem/interfaces/ICurrencyCheck"
import { ICurrencyResponse } from "@interfaces/ICurrency"

// export const currencyBSC = () =>
//   new Promise<ICurrencyCheckResponse>((resolve, reject) => {
//     services
//       .get("/polygon/check-rpc-polygon/bsc")
//       .then((res) => {
//         resolve(res.data)
//       })
//       .catch((err) => {
//         reject(err)
//       })
//   })

// export const currencyBSCTestnet = () =>
//   new Promise<ICurrencyCheckResponse>((resolve, reject) => {
//     services
//       .get("/polygon/check-rpc-polygon/bsc-testnet")
//       .then((res) => {
//         resolve(res.data)
//       })
//       .catch((err) => {
//         reject(err)
//       })
//   })

// export const currencyPolygon = () =>
//   new Promise<ICurrencyCheckResponse>((resolve, reject) => {
//     services
//       .get("/check-rpc-polygon/polygon")
//       .then((res) => {
//         resolve(res.data)
//       })
//       .catch((err) => {
//         reject(err)
//       })
//   })

// export const currencyPolygonTestnet = () =>
//   new Promise<ICurrencyCheckResponse>((resolve, reject) => {
//     services
//       .get("/polygon/check-rpc-polygon/polygon-testnet")
//       .then((res) => {
//         resolve(res.data)
//       })
//       .catch((err) => {
//         reject(err)
//       })
//   })

export const trickerPriceBNBExternal = async () => {
  const bnbPrice = (async () => {
    const response = await fetch(
      `${CONFIGS.BASE_URL.BINANCE_API}/api/v3/ticker/price`
    )
    const data: ICurrencyResponse[] = await response.json()
    return data
    // return data["nakamoto-games"].usd
  })()
  return bnbPrice
}
