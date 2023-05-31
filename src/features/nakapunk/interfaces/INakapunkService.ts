import {
  IMarketData,
  INFTDesc,
  INFTData,
  IPlayerId
} from "@feature/marketplace/interfaces/IMarketService"
import { ITransData } from "@feature/transaction/interfaces/ITransaction"
import { IFormatService, IInfoFormatServ } from "@interfaces/IHelper"

export interface IPunkMetaData extends INFTDesc {
  item_id: string
}

export interface IPurchasePunkData extends ITransData, IPlayerId {
  token_address: string
  token_name: string
  item_qty: number
  item_price: number
  meta_data: IPunkMetaData[]
}

export interface IPunkData extends INFTData {
  marketplaces_data: IMarketData | null
}

export interface IPunkPriceServ extends IFormatService {
  data: number
}

export interface IPurchasePunkServ extends IFormatService {
  data: IPurchasePunkData
}

export interface IPunkListServ extends IInfoFormatServ {
  data: IPunkData[]
}
