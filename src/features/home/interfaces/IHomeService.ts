import { IGame } from "@features/game/interfaces/IGameService"

export interface IHomeSlideResponse {
  status: boolean
  data: IGame[]
}

export interface IPointCurrent {
  averagePrice: string
  buy: string
  changePrice: string
  changeRate: number
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

export interface IPointCurrentResponse {
  status: boolean
  data: IPointCurrent[]
}
