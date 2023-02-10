export interface IResponseCouponData {
  item_name: string
  item_price: number
  image: string
  item_size: string
  collect_qty: number
}

export interface IResponseCoupon {
  status: boolean
  data: IResponseCouponData[]
  message: string
}
