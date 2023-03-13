import { IFormatService } from "@interfaces/IHelper"

export interface ICurrentNakaData {
  time: number
  symbol: string
  buy: string
  sell: string
  changeRate: string
  changePrice: string
  high: string
  low: string
  vol: string
  volValue: string
  last: string | number
  averagePrice: string
  takerFeeRate: string
  makerFeeRate: string
  takerCoefficient: string
  makerCoefficient: string
}

export interface ICurrentNakaResponse {
  data: ICurrentNakaData
}

export interface IBurnItem {
  player_id: string
  item_id: string
  room_id: string
  qty: number
}

export interface IGetNakaServices extends IFormatService {
  data: number
}

export interface IBurnItemResponse {
  status: boolean
}

export interface IGetBalanceOf {
  _address: string
  _item_id: number
}
