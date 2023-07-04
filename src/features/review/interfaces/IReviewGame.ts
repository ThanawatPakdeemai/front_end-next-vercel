import { IFormatMessageService, IFormatService } from "@interfaces/IHelper"

interface IId {
  id: string
  _id: string
}

interface IReviewPlayerData extends IId {
  address: string
  avatar: string
  email: string
  username: string
}

export interface IReviewList {
  id: string
  createdAt: Date
  review_comment: string
  review_rate: string
  status: string
  player_info: {
    id: string
    username: string
    avatar: string
  }
}

export interface IReviewGameData extends IId {
  createdAt: Date
  current_time: Date
  game_id: string
  is_active: boolean
  review_comment: string
  review_rate: string
  status: string
  player_id: IReviewPlayerData
}

export interface IReviewListServ extends IFormatService {
  message: string
  data: Array<IReviewGameData>
}

export interface IReviewGameServ extends IFormatMessageService {
  data: IReviewGameData | null
}
