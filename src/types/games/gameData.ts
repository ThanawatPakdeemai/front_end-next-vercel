import type { IGameItem } from "./gameItem"
import type { IRewardPaymentRate } from "./gameReward"

interface ICategory {
  name: string
  id: string
}

interface IGameHowto {
  title: string
  details: string
}

export interface IGameMap {
  map_name: string
  map_id: number
}

export interface IGameDevice {
  key: string
  name: string
  supported: boolean
}

export interface IGameBrowser {
  key: string
  name: string
  supported: boolean
}

// Game type information
export interface IGame {
  number_of_played: number
  date_start_event: string | Date
  date_end_event: string | Date
  play_to_earn_status: string
  play_to_earn: boolean
  howto: IGameHowto
  item: IGameItem[]
  name: string
  story: string
  tournament: boolean
  is_active: boolean
  max_players: number
  play_time: number
  hot_game_status: boolean
  hot_game_no: number
  banner_status: boolean
  banner_no: number
  version: string
  developer: string
  category: ICategory
  game_type: string
  type_code: string
  game_url: string
  path: string
  image_waiting: string
  image_sum: string
  image_room: string
  image_banner: string
  image_reward: string
  image_main: string
  image_background: string
  banner_description: string
  game_free_status: boolean
  game_free_url: string
  image_category_list: string
  image_free_to_earn_icon: string
  image_home_banner: string
  image_list: string
  min_player: number
  map: IGameMap[]
  socket_info: {
    url_room: string
    url_lobby: string
  }
  id: string
  device_support: IGameDevice[]
  browser_support: IGameBrowser[]
  num: number
  title: string
  image: string
  _id: string
  reward_payment_rate: IRewardPaymentRate[]
}

// Game all response
export interface IGameAllResponse {
  status: boolean
  data: IGame[]
}

// Game item type
export interface IQty {
  qty: number
}

export interface DevicesTypes {
  key: string
  name: string
  supported: boolean
}

export interface Inventory {
  item_id: string
  qty: number
}

export interface IGameTimer {
  start_time: Date
  end_time: Date
}

export interface IGameReward {
  _id: string
  room_id: string
  player_id: string
  current_score: number
  avatar: string
  user_name: string
  naka_for_player: number
  tx_address: string
}

export interface IGameID {
  idGame?: string
}

export interface IGameObjectStatistics {
  reward_naka?: number
  player_number?: number
  invest?: number
  numnber_game_play?: number
  cost_per_game_doller?: string
  cost_per_game_naka?: string
  profit_potential_max?: string
  profit_potential_min?: string
}

export interface IGameAll {
  num: number
  title: string
  image: string
}

export interface IShowGameAll {
  data: IGameAll[]
}

export interface IGameComing {
  num: number
  title: string
  image: string
}
