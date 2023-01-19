import { IInfo } from "@interfaces/IHelper"

export interface IGenres {
  _id: string
  name: string
  slug: string
}
export interface IGameCardDatas {
  _id: string
  name: string
  slug: string
  description: string
  genres: IGenres[]
  id: string
  image_thumbnail?: string
}

export type IGameCards = IGameCardDatas[]

export interface IGetPartnerGameService {
  _limit: number
  _page: number
  _search?: string
  info?: IInfo
  data?: IGameCards
}
