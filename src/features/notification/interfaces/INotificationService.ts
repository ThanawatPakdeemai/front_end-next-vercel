import { TGameType } from "@feature/game/interfaces/IGameService"
import { IFormatService } from "@interfaces/IHelper"

export type RewardType =
  | "REWARD_WEEKLY"
  | "REWARD"
  | "REWARD_ITEM"
  | "RETURN_ITEM"
  | "REWARD_GAME_POOL"
  | "GAME_FREE"

export interface INotificaionGameID {
  _id: string
  name: string
  path: string
  id: string
}

export interface INotificaionPlayerID {
  _id: string
  email: string
  avatar: string
  username: string
  id: string
}

export interface INotificaionRoomID {
  start_time: Date
  end_time: Date
  room_status: string
  _id: string
  max_players: number
  status: string
  id: string
}

export interface INotification {
  game_detail: any
  _id: string
  createdAt: Date
  room_id?: string | INotificaionRoomID
  game_id: string | INotificaionGameID
  game_type: TGameType
  player_id: string | INotificaionPlayerID
  detail: string
  read: boolean
  type: RewardType
  naka_for_player: number
  game_name: string
  path: string
  weekly_pool_id?: string
  pool_id?: string
  game_mode?: string
}

export interface INotificationResponse {
  status: boolean
  data: INotification
}

export interface INotificationService extends IFormatService {
  data: INotification[]
}
