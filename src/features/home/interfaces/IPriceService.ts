export interface IPrice {
  averagePrice: string
  buy: string
  changePrice: string
  changeRate: string
  high: string
  last: string
  low: string
  makerCoefficient: string
  makerFeeRate: string
  sell: string
  symbol: string
  takerCoefficient: string
  takerFeeRate: string
  time: number
  vol: string
  volValue: string
}

export interface IPriceData {
  data: IPrice
}
export interface IResponsePrice {
  data: IPriceData
}
