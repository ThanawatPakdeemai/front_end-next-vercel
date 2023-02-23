import { ITokenContract } from "@feature/contract/containers/hooks/useContractVaultBinance"
import { IGame } from "@feature/game/interfaces/IGameService"
import { IGameItemListData } from "@feature/gameItem/interfaces/IGameItemService"

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

export interface IGameItem {
  crate_date: string | Date
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
  current_time: string | Date
  model_id: number
  item_size: string
  id: string
  default: boolean
  amount: number
  item_per_price?: number
  total?: string | number
  index: number
  qty: number
  craft_time: number
  detail_used_items?: IDetailUsedItems
}

export interface IGameCategory {
  _id: string
  createdAt: string
  updatedAt: string
  name: string
  detail: string
  slug: string
  color_code: string
  image_list: string
  image_banner: string
  is_active: boolean
  id: string
}

export interface IFilterGames {
  limit: number
  skip: number
  sort: string
  search: string
  category: string
  item: string
  device: string
  game_type: string
  tournament: boolean
  nftgame: string
}

export interface IGameAllResponse {
  status: boolean
  data: IGame[]
  info?: {
    currentCount: number
    limit: number
    pages: number
    totalCount: number
  }
}
export interface IDevice {
  _id: string
  name: string
  supported: boolean
}

export interface IDropdownAll
  extends IGameCategory,
    IGameItem,
    IDevice,
    IGameItemListData,
    ITokenContract {}
