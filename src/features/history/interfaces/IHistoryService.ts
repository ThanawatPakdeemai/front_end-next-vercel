import { IGame, TRoomStatus } from "@feature/game/interfaces/IGameService"

export interface IGetHistory {
  player_id: string
  limit: number
  skip: number
}

export interface IDetailUsedItems {
  name: string
  item_size: string
  detail: string
  price: number
  image: string
  image_icon: string
  image_icon_color: string
  min_item: number
  model_id: number
}

export interface IHistory {
  _id: string
  createdAt: Date
  room_id: string
  player_id: string
  game_detail: IGame
  room_status: TRoomStatus
  detail_used_items: IDetailUsedItems
  game_type: string
  game_mode: string
}

export interface IHistoryInfo {
  currentCount: number
  limit: number
  pages: number
  totalCount: number
}

export interface IPlayloadHistory {
  data: IHistory[]
  info: IHistoryInfo
  status: boolean
}

export interface Howto {
  title: string
  details: string
}

export interface BrowserSupport {
  key: string
  name: string
  supported: boolean
}

export interface DeviceSupport {
  key: string
  name: string
  supported: boolean
}

export interface RewardPaymentRate {
  no: number
  item_reward_amount: number
}

export interface Map {
  _id: string
  map_name: string
  map_id: number
}

export interface CheckCheatList {
  _id: string
  cheat_condition: string
}
