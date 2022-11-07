import type { Inventory } from "./gameData"

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

// Game Summary
export interface IGameSummary {
  _id: string
  tx_address: string
  room_id: string
  player_id: string
  current_score: number
  used_items: Inventory[]
  avatar: string
  user_name: string
  inventory: Inventory[]
  start_time: Date
  end_time: Date
  room_number: number
  wallet_address: string
  room_status: string
  naka_for_player: number
  id_room: string
  detail_used_items: IDetailUsedItems
}
