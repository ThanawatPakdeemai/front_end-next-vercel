import services from "@src/configs/axiosGlobalConfig"
import { IResponseCoupon } from "../../interfaces/ICoupon"

const redeemCode = (coupon_code: string) =>
  new Promise<IResponseCoupon>((resolve, reject) => {
    if (coupon_code) {
      services
        .get(`/coupon/redeem/${coupon_code}`)
        .then((res) => {
          resolve(res.data)
        })
        .catch((err) => {
          reject(err)
        })
    }
  })

export { redeemCode }
