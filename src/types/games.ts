// Game all response
export interface IGameAllResponse {
  status: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[] // IGame[]
}

// Game type information
export interface IGame {
  number_of_played: number
  date_start_event: string | Date
  date_end_event: string | Date
  play_to_earn_status: string
  play_to_earn: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  howto: any // IGameHowto
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  item: any[] // IGameItem[]
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  category: any // ICategory
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  map: any[] // IGameMap[]
  socket_info: {
    url_room: string
    url_lobby: string
  }
  id: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  device_support: any[] // IGameDevice[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  browser_support: any[] // IGameBrowser[]
  num: number
  title: string
  image: string
  _id: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  reward_payment_rate: any[] // IRewardPaymentRate[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  meta_data_list: any[] // IGameStoryModeData[]
  play_total_count?: number
}

export interface IGameStoryModeData {
  item_key: string
  item_name: string
  type: string
  image: string
  mini_image: string
  active_display: boolean
  default_value: number
  max_value: number
}

// interface IRewardPaymentRate {
//   item_reward_amount: number
//   no: number
// }
// interface ICategory {
//   name: string
//   id: string
// }

// interface IGameHowto {
//   title: string
//   details: string
// }

export interface IGameItem {
  crate_date: Date
  _id: string
  name: string
  detail: string
  is_active: boolean
  price: number
  image: string
  item_id_smartcontract: number
  min_item: number
  image_icon: string
  image_icon_color: string
  max_item?: number
  current_time: Date
  item_size: string
  id: string
  default: boolean
  amount: number
  item_per_price?: number
  total?: string | number
  index: number
  qty: number
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  detail_used_items: any // IDetailUsedItems
}

// Game featured type
export interface IGameFeatured {
  title: string
  cover: string
  to: string
  gameName: string
  category_name: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  item?: any // ItemTypes
  play_total_count?: number
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  deviceSupport?: any
  id: string
}

// Game item type
export interface IQty {
  qty: number
}

// Game room type response
export interface IGameRoomResponse {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  gameRoomDetail: any[] // IGameRoom[]
}

export interface ItemTypes {
  _id: string
  name: string
  detail: string
  price: number
  image: string
  item_id_smartcontract: number
  min_item: number
  image_icon: string
  image_icon_color: string
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type DevicesSupportTypes = any // DevicesTypes[]

export interface DevicesTypes {
  key: string
  name: string
  supported: boolean
}

// Game room type
export interface IGameRoom {
  start_time: string
  end_time: string
  room_status: string
  amount_current_player: number
  amount_send_reward: number
  mutiplayer: boolean
  tournament: boolean
  user_create: boolean
  createdAt: string
  updatedAt: string
  no_limit_time: boolean
  _id: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  current_player: any[] // CurrentPlayer[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  current_player_item_status: any[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  history_user_play: any[] // HistoryUserPlay[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rewards: any[]
  current_time: string
  game_id: string
  max_players: number
  rank_id: string
  amount_played: number
  is_active: boolean
  status: string
  room_number: number
  stage_id: number
  id: string
  rank_name: string
  room_no: number
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  create_room_detail: any
}

export interface CurrentPlayer {
  status: "played" | "playing"
  item_burn: boolean
  transaction_status: boolean
  _id: string
  player_id: string
  avatar: string
  username: string
  timestamp: Date
  rank: string
}

export interface HistoryUserPlay {
  status: "played" | "playing"
  _id: string
  player_id: string
  timestamp: Date
  qty: number
}

export interface IRoom {
  _id: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  item: any // IRoomItem
}

export interface IRoomItem {
  item_id: string
  qty: number
}

// Wating Room type
export interface IWatingRoom {
  start_time: Date
  end_time: Date
  amount_current_player: number
  amount_send_reward: number
  createdAt: Date
  updatedAt: Date
  _id: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  current_player: any // IPlayerInfo[]
  rewards: []
  game_id: string
  max_players: number
  rank_id: string
  amount_played: number
  is_active: boolean
  status: string
  room_number: number
  room_no: number
  id: string
}

// Game Summary
export interface IGameSummary {
  _id: string
  tx_address: string
  room_id: string
  player_id: string
  current_score: number
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  used_items: any // Inventory[]
  avatar: string
  user_name: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  inventory: any[] // Inventory[]
  start_time: Date
  end_time: Date
  room_number: number
  wallet_address: string
  room_status: string
  naka_for_player: number
  id_room: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  detail_used_items: any // IDetailUsedItems
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
  item_id_smartcontract: number
}

export interface Inventory {
  item_id: string
  qty: number
}

export interface IGameTimer {
  start_time: Date
  end_time: Date
}
export interface IPlayerInfo {
  tag?: string
  owner?: boolean
  ready?: boolean
  // Custom
  isActive: boolean
  // Default
  status: string
  item_burn: boolean
  transaction_status: boolean
  _id: string
  player_id: string
  avatar: string
  username: string
  timestamp: string
  rank: string
}

// Game reward
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

export interface IRoomCard {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _id: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  start_time: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  end_time: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  current_player: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  amount_current_player: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  room_number: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  max_players: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  create_room_detail: any
}

export interface IGameAll {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  num: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  title: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image: any
}

export interface IShowGameAll {
  data: IGameAll[]
}

export interface IGameComing {
  num: number
  title: string
  image: string
}

export interface IPlayToEarnReward {
  status: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any // IPlayToEarnRewardData[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  info: any // IPlayToEarnRewardInfo
}

export interface IPlayToEarnRewardData {
  claim_status: boolean
  item_amount: number
  event_number: number
  score: number
  is_active: boolean
  _id: string
  player_id: string
  item_id: string
  game_id: string
  createdAt: Date
  updatedAt: Date
  current_time: Date
  __v: number
  game_item_name?: string
  game_item_image?: string
  game_name?: string
  game_image?: string
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IPlayToEarnRewardInfo {}

// Game Story Mode
export interface IGameStoryModeResponse {
  status: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any // IGameStoryMode
}

export interface IGameStoryMode {
  _id: string
  player_id: string
  game_id: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  meta_data: any // IGameStoryModeMetaData
  level: number
  exp: number
  total_exp: number
}

export interface IGameStoryModeMetaData {
  money: string
  diamond: string
  heart: string
  heart_regen_time: null
  current_level: string
}

export interface IResponseGameUpdatedPlaying {
  status: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any // IResponseGameUpdatedPlayingData
}

export interface IResponseGameUpdatedPlayingData {
  play_total_count: number
  _id: string
  history: History[]
  createdAt: Date
  updatedAt: Date
  game_id: string
}

export interface IResponseGameUpdatedPlayingHistory {
  play_count: number
  _id: string
  player_id: string
}
