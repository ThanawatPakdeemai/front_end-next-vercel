import { IGame } from "@src/types/games"

export interface IInfo {
  pages: number
  limit: number
  currentCount: number
  totalCount: number
}

export interface IResponseFavoriteGame {
  status: boolean
  data: IGame[]
  message?: string
  info: IInfo
}
