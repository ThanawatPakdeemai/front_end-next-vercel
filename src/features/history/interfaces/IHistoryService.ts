/* eslint-disable no-undef */
/* eslint-disable no-use-before-define */
import { IGetType, TRoomStatus } from "@feature/game/interfaces/IGameService"

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
  game_detail: IGameDetail
  _id: string
  room_id: string
  detail: string
  room_status: TRoomStatus
  is_active: boolean
  player_id: string
  createdAt: string
  updatedAt: string
  game_name: string
  path: string
  detail_used_items: IDetailUsedItems
  game_type: string
  game_mode: IGetType
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

export interface IGameDetail {
  _id: string
  howto: Howto
  game_free_status: boolean
  score_rank: any[]
  hot_game_status: boolean
  hot_game_no: number
  banner_status: boolean
  banner_no: number
  banner_description: string
  tournament: boolean
  browser_support: BrowserSupport[]
  device_support: DeviceSupport[]
  coming_soon: boolean
  item: string[]
  item_default: string
  play_to_earn: boolean
  play_to_earn_status: string
  date_start_event: any
  date_end_event: any
  reward_item_amount: number
  reward_payment_rate: RewardPaymentRate[]
  repeat_event_status: boolean
  repeat_event_delay_minute: number
  number_of_played: number
  event_number: number
  createdAt: string
  updatedAt: string
  min_player: number
  meta_data_list: any[]
  must_try_status: boolean
  must_try_no: number
  category_list: string[]
  current_time: string
  map: Map[]
  check_cheat_list: CheckCheatList[]
  season_pass_reward_list: any[]
  name: string
  story: string
  is_active: boolean
  max_players: number
  play_time: number
  version: string
  developer: string
  category: string
  game_type: string
  type_code: string
  game_url: string
  path: string
  image_main: string
  image_list: string
  image_room: string
  image_category_list: string
  image_waiting: string
  image_reward: string
  image_banner: string
  image_sum: string
  image_home_banner: string
  image_background: string
  __v: number
  game_mode: string
  is_NFT: boolean
  data_play: any
  history: any[]
  encode_type: string
  pdf_url: string
  is_installment: boolean
  media_list: any[]
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
