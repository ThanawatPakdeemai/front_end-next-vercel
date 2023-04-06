import { IGame } from "@feature/game/interfaces/IGameService"

export interface IGetAllEventsProps {
  limit: number
  skip: number
  sort: string
  search: string
}

export interface IGamesToPlay {
  _id: string
  name: string
  game_type: string
  game_url: string
  path: string
  image_banner: string
  image_category_list: string
  image_sum: string
  image_main: string
  image_reward: string
  image_list: string
  image_home_banner: string
  image_waiting: string
  image_background: string
  image_room: string
}

export interface IGetEventResponseData {
  _id: string
  status: string
  reward_share_rate: number[]
  score_rank?: number[]
  games_to_play: IGame[]
  createdAt: Date
  updatedAt: Date
  name: string
  event_detail: string
  reward: number | string
  is_active: boolean
  date_start: Date
  date_end?: Date
  banner_image: string
  __v?: number
  event_type: "share_and_play" | "top_score_championship"
  date_end1?: Date
  min_score?: number
}

export interface IGetEventResponseInfo {
  pages: number
  limit: number
  currentCount: number
  totalCount: number
}

export interface IGetEventResponse {
  status: boolean
  data: IGetEventResponseData[]
  info: IGetEventResponseInfo
}

export interface IPlayerData {
  player_id: string
  username: string
  wallet_address: string
  email: string
  avatar: string
  country: string
  score_event: number
  data_type: string
}

export interface INewDataPlayerScore {
  player_id: string
  player_data: IPlayerData[]
  score_event: number
  username: string
  country: string
  email: string
  wallet_address: string
  avatar: string
  prize_pool_percent: number
  reward_for_player: number
  game_score: number
  game_play_count: number
  share_score: number
}

export interface IResponseLeaderBoardData {
  new_data_player_score: INewDataPlayerScore[]
  player_count: number
  transaction_count: number
}

export interface IResponseLeaderBoard {
  status: boolean
  data: IResponseLeaderBoardData
}

export interface IResponseSummaryData {
  _id: string
  username: string
  country: string
  amount_play: number
  max_score: number
}

export interface IResponseTopScoreSummaryDataData {
  data: IResponseSummaryData[]
  player_count: number
  transaction_count: number
}

export interface IResponseTopScoreSummaryData {
  status: boolean
  message: string
  data: IResponseTopScoreSummaryDataData
}
export interface IResponseTopScoreSummary {
  status: boolean
  data: IResponseTopScoreSummaryData
}
