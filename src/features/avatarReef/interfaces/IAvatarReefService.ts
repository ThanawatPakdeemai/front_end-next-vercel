import {
  INFTData,
  INFTDesc
} from "@feature/marketplace/interfaces/IMarketService"
import { ITransactionWalletData } from "@feature/transaction/interfaces/ITransaction"
import { IFormatService, IInfoFormatServ } from "@interfaces/IHelper"

export interface IAvatarReefMetaData extends INFTDesc {
  item_id: string
  chain: string
}

export interface IAvatarReefData
  extends Omit<ITransactionWalletData, "item_id" | "meta_data"> {
  token_address: string
  token_name: string
  status: string
  meta_data: IAvatarReefMetaData[]
}

export interface Attribute {
  trait_type: string
  value: string
}

export interface History {
  _id: string
  event: string
  seller: string
  buyer: string
  price: number
  timestamp: Date
}

export interface IAvatarData extends Omit<INFTData, "_id"> {
  id: string
  attributes: Attribute[]
  createdAt: Date
  updatedAt: Date
  current_time: Date
  dna: string
  is_active: boolean
  chain: string
  nft_address: string
}

export interface IRedeemAvatarReefServ extends IFormatService {
  data: IAvatarReefData
}

interface IMyAvatarReefData extends Omit<INFTData, "wallet_address" | "_id"> {
  id: string
}

export interface IMyAvatarReefServ extends IInfoFormatServ {
  data: IMyAvatarReefData[]
}
