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
  room_id: string
  detail: string
  room_status: string
  is_active: boolean
  player_id: string
  createdAt: string
  updatedAt: string
  game_name: string
  path: string
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
