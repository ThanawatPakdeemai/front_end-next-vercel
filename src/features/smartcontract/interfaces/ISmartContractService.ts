import { IFormatService } from "@src/interfaces/IHelper"

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
  last: string
  averagePrice: string
  takerFeeRate: string
  makerFeeRate: string
  takerCoefficient: string
  makerCoefficient: string
}

export interface ICurrentNakaResponse {
  data: ICurrentNakaData
}

export interface IGetNakaServices extends IFormatService {
  data: number
}
