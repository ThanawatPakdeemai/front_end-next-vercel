import { IInfo } from "@interfaces/IHelper"

export interface IGenres {
  _id: string
  name: string
  slug: string
}
export interface IPartnerGameData {
  _id: string
  name: string
  slug: string
  description: string
  genres: IGenres[]
  id: string
  image_category_list: string | undefined
  image_thumbnail: string | undefined
}

export type IGameCards = IPartnerGameData[]

export interface IGetPartnerGameService {
  _limit: number
  _page: number
  _search?: string
  info?: IInfo
  data?: IGameCards
}
