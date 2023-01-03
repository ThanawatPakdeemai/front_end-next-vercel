import {
  IGameItem,
  IGameItemList
} from "@feature/gameItem/interfaces/IGameItemService"
import { IFormatService } from "@interfaces/IHelper"

export type TGameType = "singleplayer" | "multiplayer" | "storymode"
export type TTypeCode =
  | "single_01"
  | "single_02"
  | "multi_01"
  | "multi_02"
  | "story_01"

export interface IGetGameByTypesProps {
  _type: "play-to-earn" | "free-to-earn" | "story-mode"
  _limit: number
  _page: number
  _categoryId?: string
  _deviceSup?: string
  _itemId?: string
  _search?: string
}

export interface IGameHowTo {
  title: string
  details: string
}

export interface IGameSocketInfo {
  url_room?: string
  url_lobby?: string
}

export interface IGameSupport {
  key: string
  name: string
  supported: boolean
}

interface IGameBase {
  _id: string
  player_id: string
}

export interface IGameCurrentPlayerItemStatus extends IGameBase {
  timestamp_burn: Date
  socket_id: string
}

export interface IGameRewards extends IGameBase {
  wallet_address: string
  naka_for_player: number
}

export interface IGameRewardPaymentRate {
  no: number | string
  item_reward_amount: number | string
}

export interface IGameMetaData {
  item_key: string
  item_name: string
  type: string
  image: null | string
  mini_image: null | string
  active_display: boolean
  default_value: number | null
  max_value: number
}

export interface IGameMap {
  _id: string
  map_id: number
  map_name: string
}

export interface IGameCategory {
  name: string
  id: string
  slug: string
}

export interface IGame {
  _id: string
  howto: IGameHowTo
  socket_info?: IGameSocketInfo
  game_free_status: boolean
  hot_game_status: boolean
  hot_game_no: number | null
  banner_status: boolean
  banner_no: number | null
  banner_description: string
  tournament?: boolean
  browser_support: IGameSupport[]
  device_support: IGameSupport[]
  item: IGameItemList[]
  play_to_earn: boolean
  play_to_earn_status?: "end" | "free" | "in_progress"
  date_start_event?: Date | null
  date_end_event?: Date | null
  reward_item_amount?: number
  reward_payment_rate?: IGameRewardPaymentRate[]
  repeat_event_status?: boolean
  repeat_event_delay_minute?: number | null
  number_of_played?: number
  event_number?: number
  min_player: number
  meta_data_list?: IGameMetaData[]
  map?: IGameMap[]
  name: string
  story: string
  is_active: boolean
  max_players: number
  play_time: number
  version: string
  developer: string
  category: IGameCategory
  game_type: TGameType
  type_code: TTypeCode
  game_url: string
  path: string
  image_main: string
  image_list: string
  image_room: string
  image_banner: string
  image_category_list: string
  image_reward: string
  image_waiting: string
  image_background: string
  image_sum: string
  id: string
  image_home_banner: string
  game_free_url?: string
  image_free_to_earn_icon?: string
}

export interface IGameRewardByPlayer extends IGameBase {
  claim_status: boolean
  item_amount: number
  event_number: number
  score: number
  is_active: boolean
  item_id: string
  game_id: string
  createdAt: Date
  updatedAt: Date
  current_time: Date
  __v?: number
}

export interface IGameService extends IFormatService {
  data: IGame
}

export interface IGameCurrentPlayer extends IGameBase {
  status: string
  item_burn: boolean
  transaction_status: boolean
  avatar: string
  username: string
  timestamp: Date
  rank: string
}

export interface IGameHistoryUserPlay extends IGameBase {
  status: string
  timestamp: Date
  qty: number
}

export interface GameAllId {
  id: string | null | undefined
  name: string | null | undefined
  img: string | null | undefined
}

export interface IGameRoom {
  start_time: Date
  end_time: Date
  amount_current_player: number
  amount_send_reward: number
  createdAt: Date
  updatedAt: Date
  _id: string
  current_player: IGameCurrentPlayer[]
  rewards: IGameRewards[]
  game_id: string
  max_players: number
  rank_id: string
  amount_played: number
  is_active: boolean
  status: string
  room_number: number
  stage_id: number
  id: string
}

export interface IGameRoomService extends IGameRoom {
  rank_name: string
}

export interface IGameRoomDetail extends IGameRoom {
  room_status: string
  mutiplayer: boolean
  tournament: boolean
  user_create: boolean
  no_limit_time: boolean
  room_lock: boolean
  current_player_item_status: IGameCurrentPlayerItemStatus[]
  history_user_play: IGameHistoryUserPlay[]
  current_time: Date
  item_id: string
}

export interface IGameUsedItemsDetail extends IGameItem {
  model_id: number
}
export interface IGameUsedItem {
  _id: string
  item_id: string
  qty: number
}

export interface IGameAllState {
  data: IGame[]
}

export interface IGameSummary extends IGameBase {
  tx_address: string
  naka_for_player: number
  room_id: string
  current_score: number
  used_items: IGameUsedItem[]
  avatar: string
  user_name: string
  start_time: Date
  end_time: Date
  room_number: number
  wallet_address: string
  room_status: string
  detail_used_items: IGameUsedItemsDetail
}

export interface IGameReport {
  reward_naka: number
  player_number: number
  invest: number
  numnber_game_play: number
  cost_per_game_doller: string
  cost_per_game_naka: string
  profit_potential_min: number
  profit_potential_max: number
}

export interface IGameCategoryDetail extends IGameCategory {
  _id: string
  createdAt: Date
  updatedAt: Date
  detail: string
  slug: string
  color_code: string
  image_list: string
  image_banner: string
  is_active: boolean
}

export interface IGameRoomDetailService {
  gameRoomDetail: IGameRoomDetail[]
}

export interface IGameReportService extends IFormatService {
  data: IGameReport
}

export interface IGamePlayToEarnService extends IFormatService {
  data: IGameRewardByPlayer
}

export interface IGameClaimEarnedRewardService extends IFormatService {
  data: string
}

export interface IGameCategoryService extends IFormatService {
  data: IGameCategoryDetail[]
}

export interface IGetAllGameRooms {
  _gameId: string
  _email: string
  _itemId: string
}

export interface IGetPlayerInRoom {
  _roomId: string
  _playerId: string
  _type: string
}

export interface IClaimEarnedRewardByPlayerId {
  _playerId: string
  _rewardId: string
}
