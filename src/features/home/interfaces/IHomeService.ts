import { IGame } from "@feature/game/interfaces/IGameService"

export interface IHomeSlideResponse {
  status: boolean
  data: IGame[]
}

export interface IPointCurrent {
  averagePrice: string
  buy: string
  changePrice: string
  changeRate: number
  high: string
  last: string
  low: string
  makerCoefficient: string
  makerFeeRate: string
  sell: string
  symbol: string
  takerCoefficient: string
  takerFeeRate: string
  time: number
  vol: string
  volValue: string
}

export interface IPointCurrentResponse {
  status: boolean
  data: IPointCurrent
}

export interface IRoomAvaliableRoomList {
  amount_current_player: number
  room_number: number
  game_id: string
  item_id: string
  _id: string
  item_name: string
  item_size: string
  item_image: string
  game_name: string
  game_url: string
  game_type: string
  game_type_code: string
  game_free_to_earn: boolean
  game_path: string
  image_category_list: string
  chanel_type: string
}
export interface IRoomAvaliableItemList {
  item_name: string
  item_size: string
  item_image: string
  room_list: IRoomAvaliableRoomList[]
  room_list_url: string
}
export interface IRoomAvaliableData {
  game_id: string
  game_name: string
  game_type: string
  game_type_code: string
  game_free_play: boolean
  game_image: string
  game_url: string
  item_list: IRoomAvaliableItemList[]
}

export interface IRoomAvaliableDataChannel {
  chanel_type: string
  data: IRoomAvaliableData[]
}

export interface IRoomAvaliableResponse {
  status: boolean
  message: string
  data: IRoomAvaliableDataChannel[]
}
