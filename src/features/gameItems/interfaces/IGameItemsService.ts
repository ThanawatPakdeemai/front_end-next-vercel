import { IFormatService } from "@src/interfaces/IHelper"

export interface IGameItem {
  name: string
  detail: string
  price: number
  image: string
  item_id_smartcontract: number
  min_item: number
  image_icon: string
  image_icon_color: string
  item_size: string
}

export interface IGameItemList extends IGameItem {
  _id: string
}

export interface IGameItemListData extends IGameItem {
  crate_date: Date
  _id: string
  current_time: Date
  is_active: boolean
  model_id?: number
  craft_time?: number
  id: string
  default: boolean
  qty: number
}

export interface IGameItemsListService extends IFormatService {
  data: IGameItemListData[]
}

export interface IGameItemService extends IFormatService {
  data: IGameItemListData
}

export interface IGameItemBalanceService extends IFormatService {
  data: number
}
