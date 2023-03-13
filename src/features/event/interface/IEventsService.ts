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
  games_to_play: IGamesToPlay[]
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
