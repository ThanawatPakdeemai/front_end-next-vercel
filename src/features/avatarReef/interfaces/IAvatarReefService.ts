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

export interface IRedeemAvatarReefServ extends IFormatService {
  data: IAvatarReefData
}

interface IMyAvatarReefData extends Omit<INFTData, "wallet_address"> {}

export interface IMyAvatarReefServ extends IInfoFormatServ {
  data: IMyAvatarReefData[]
}
