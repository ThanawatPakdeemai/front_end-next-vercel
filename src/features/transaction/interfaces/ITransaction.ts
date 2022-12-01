import { IFormatService } from "@src/interfaces/IHelper"

interface IType {
  type: string
}

interface IItemId {
  item_id: string
}

export interface ITransMetaData extends IType, IItemId {
  transtraction_hash: string
  marketplace_id: string
  seller_id: string | null
  price?: number
  item_amount?: number
  seller_type: string
  selling_type: string
  order_id: null | string
  buyer_id?: string
  buy_price?: number | string
  qty?: number
}

export interface ITransData extends IType {
  createdAt: Date
  updatedAt: Date
  current_time: Date
  player_id: string
  player_wallet_address: string
  date_time: Date
  amount: number
  fee: number
  transaction_hash: string
  id: string
}

export interface ITransactionWalletData extends ITransData, IItemId {
  item_name?: string
  item_qty: number
  item_price: number
  meta_data?: ITransMetaData
}

export interface ITransWalletService extends IFormatService {
  data: ITransactionWalletData[]
}

interface IParamTrans {
  _playerId: string
  _type: string
}

export interface ICreateTransWallet extends IParamTrans {
  _dateTime: string
  _amount: number
  _fee: number
  _txHash: string
}

export interface IGetTransWallet extends IParamTrans {
  _limit: string
  _page: string
}
