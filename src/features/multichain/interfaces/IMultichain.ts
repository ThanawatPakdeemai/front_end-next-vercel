import { IFormatMessageService, IFormatService } from "@src/interfaces/IHelper"

export interface IMessage {
  message: string
}

interface IMultiOrderPrice {
  busd_price: number
  naka_price: number
  naka_amount: number
  total_price: number
}

interface ILimitPage {
  _limit: number
  _page: number
}

export interface IMultiHistory extends IMultiOrderPrice {
  _id: string
  transaction_hash: string
  history_type: string
}

export interface IMultiOrder extends IMultiOrderPrice {
  id: string
  order_id: string
  order_type: string
  wallet_address: string
}

export interface IMultiTrustOrder extends IMultiOrder {
  trusted_order: boolean
}

export interface IMultiData extends IMultiOrder {
  is_active: boolean
  histories: IMultiHistory[]
  created_at: Date
  updated_at: Date
  chain_name: string
}

export interface IMultiOrderServ extends IFormatMessageService {
  data: IMultiData
}

export interface IMultiOrderListDataServ extends IFormatService, IMessage {
  data: IMultiData[]
}

export interface IMultiOrderListServ extends IFormatService, IMessage {
  data: IMultiTrustOrder[]
}
export interface ISort {
  _sort: string
  _sort_value: number
}

export interface IGetP2PDexOrderList extends ILimitPage, ISort {
  _type: string
}
export interface IGetP2PDexOrderByAddr
  extends ILimitPage,
    ISort,
    IGetP2PDexOrderList {
  _address: string
}

export interface ICreateP2PDexOrder {
  _orderId: string
  _type: string
  _busdPrice: string
  _nakaPrice: string
  _nakaAmount: string
  _totalPrice: string
  _address: string
}

export interface IExecP2PDexOrder extends ICreateP2PDexOrder {
  _requestId: string
  _buyerAddress: string
  _sellerAddress: string
}

export interface IUpdateP2PDexOrder extends ICreateP2PDexOrder {
  _txHash: string
}

export interface IStatus {
  status: boolean
}

export interface IResExecutive extends IMessage {}
