import { IFormatMessageService } from "@interfaces/IHelper"

interface IId {
  id: string
  _id: string
}

export interface IGameRatingServ {
  percent: number
  count: {
    like: number
    dislike: number
  }
}

export interface IGameRatingData extends IId {
  is_active: boolean
  _id: string
  createdAt: Date
  current_time: Date
  player_id: string
  game_id: string
  type: boolean
  id: string
}

export interface IRatingServ extends IFormatMessageService {
  data: IGameRatingData | null
}
