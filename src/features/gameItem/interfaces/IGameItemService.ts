import { IFormatService } from "@interfaces/IHelper"
import { ReactNode } from "react"

export interface IGameItem {
  name: string
  detail: string
  price: number
  image: string
  item_id_smartcontract: number
  min_item: number
  image_icon: string | ReactNode
  image_icon_color: string
  item_size: string
}

export interface IGameItemList extends IGameItem {
  _id: string
}

export interface IGameItemListData extends IGameItemList {
  crate_date: string | Date
  current_time: string | Date
  is_active: boolean
  model_id: number
  craft_time: number
  id: string
  default: boolean
  qty: number
}

export interface IGameItemListService extends IFormatService {
  data: IGameItemListData[]
}

export interface IGameItemService extends IFormatService {
  data: IGameItemListData
}

export interface IGameItemBalanceService extends IFormatService {
  data: number
}

export interface IGetGameItemsByGameId {
  _playerId: string
  _gameId: string
}

export interface IGetGameItemsBalanceByItemId {
  _address: string
  _itemIdSmartContract: string
}
