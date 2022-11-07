import type { IDetailUsedItems } from "./gameSummary"

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
  detail_used_items: IDetailUsedItems
}
