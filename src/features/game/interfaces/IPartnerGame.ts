import { IInfo } from "@interfaces/IHelper"

export interface IGenres {
  _id: string
  name: string
  slug: string
}

export interface IShortDetail {
  developer: string
  publisher: string
  release_date: Date
  network_icon: string
  network_name: string
}

export interface ISocial {
  web: string
  twitter: string
  facebook: string
  discord: string
  telegram: string
  medium: string
  tiktok: string
}

export type TMediaType = "video" | "image"
export interface IMediaList {
  path: string
  _id: string
  media_type: TMediaType
}

export interface IPartnerGameData {
  _id: string
  name: string
  slug: string
  description: string
  genres: IGenres[]
  id: string
  image_thumbnail: string | undefined
  short_detail: IShortDetail
  game_in_system: boolean
  game_object_id: null
  how_to_play: string
  game_url: string
  social: ISocial
  item_and_nft: any[]
  image_banner: string
  media_list: IMediaList[]
}

export type IGameCards = IPartnerGameData[]

export interface IGetPartnerGameService {
  _limit: number
  _page: number
  _search?: string
  info?: IInfo
  data?: IGameCards
}
