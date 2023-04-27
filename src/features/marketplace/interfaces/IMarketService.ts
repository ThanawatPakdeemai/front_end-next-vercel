import { IGameItemList } from "@feature/gameItem/interfaces/IGameItemService"
import { IFormatMessageService, IFormatService } from "@interfaces/IHelper"
import { IBuildData } from "@feature/building/interfaces/IBuildingService"
import { ILandData } from "@feature/land/interfaces/ILandService"
import { IMaterialInfo } from "@feature/material/marketplace/interfaces/IMaterialService"
import { IArcGameInfo } from "@feature/game/marketplace/interfaces/IArcGameService"

export type TNFTType =
  | "nft_land"
  | "nft_building"
  | "nft_naka_punk"
  | "nft_material"
  | "game_item"
  | "nft_game"
  | "nft_avatar"

export type TType =
  | "land"
  | "building"
  | "naka-punk"
  | "material"
  | "game-item"
  | "arcade-game"
  | "avatar-reef"

export type TSellingType = "fullpayment" | "installment" | "rental"

export type TSellerType = "system" | "user"

export interface ICreateOrderParams {
  _orderId: string
  _itemId: string
  _itemAmount: number
  _price: number
  _type: TNFTType
  _txHash: string
  _sellerType: TSellerType
  _sellingType?: TSellingType
  _periodAmount?: number
}

export interface IPayBillParams {
  _billId: string
  _billBalance: number
  _periodBalance: number
  _txHash: string
  _roundPayed: number
  _roundPayedAmount: number
}

export interface IPurchOrderParams {
  _marketplaceId: string
  _itemId: string
  _itemAmount: number
  _txHash?: string
  _smcAmount?: number
  _rentalData?: {
    orderId: string
    totalPrice: string
    rentStart: string
    rentEnd: string
    marketplaceId: string
    itemId: string
    period: number
  }
  _installment_data?: {
    bill_id: string
    price: number
    period: number
    periodBalance: number
    prePay: number
    totalBill: number
    billBalance: number
    payByperiod: number
    marketplace_id: string
    item_id: string
  }
}

export interface ICancelOrderParams {
  _orderId: string
  _txHash: string
}

interface IId {
  _id: string
}

interface IPrice extends IId {
  price: number
}

export interface IPlayerId {
  player_id: string
}

interface ITransHash {
  transaction_hash: string
}

interface IRound extends IPrice {
  round_no: number
  due_date: Date
}

interface ICreateAt {
  created_at: Date
}

interface ICurrentTime {
  updated_at: Date
  current_time: Date
}

interface IMarketInit extends IId, ICreateAt {
  is_active: boolean
  type: TNFTType
  item_id: string
}

export interface INFTInitial extends IId {
  NFT_token: string
  NFT_video: string
  NFT_image: string
  image: string
  name: string
  detail: string
}

export interface IMarketServForm {
  _limit: number
  _page: number
  _search: {
    type_marketplace?: TNFTType
    seller_type?: TSellerType
    type_land?: string[]
    seller_id?: string
    player_id?: string
    isRent?: boolean
    type?: TNFTType
  }
  _sort?: {
    price?: number
    created_at?: number
    land_id?: number
    position?: number
    _id?: number
  }
  _active?: boolean
}

export interface IMarketArcadeServForm extends IMarketServForm {
  _sortBy?: string
  _categoryId?: string
}

export interface IMarketHistory extends IPrice {
  event: string
  seller: string
  buyer: string
  timestamp: Date
}

export interface IRentalPeriod extends IRound {
  claim_status: boolean
  transaction_hash: string | null
}

interface ISellingDetail extends IMarketInit, ICurrentTime {
  marketplace_id: string
  buyer_address: string
  seller_address: string
  __v?: number
}
export interface IInstallPeriod extends IRound {
  history_id: null | string
}

export interface IInstallData extends ISellingDetail {
  status: boolean
  period: IInstallPeriod[]
  bill_id: string
  price: number
  periodTotal: number
  periodBalance: number
  prePay: number
  totalBill: number
  billBalance: number
  payByperiod: number
}
export interface IRentalData extends ISellingDetail {
  period: IRentalPeriod[]
  order_id: string
  total_price: number
  rent_start: Date
  rent_end: Date
  period_total: number
  period_balance: number
}

export interface IClaimRentalServ extends Omit<IRentalData, "_id"> {
  id: string
}

export interface INFTDesc {
  name: string
  description: string
  NFT_token: string
  image: string
}

export interface INFTData extends IId, INFTDesc, IPlayerId {
  history: IMarketHistory[]
  wallet_adddress: string
  owner_id: string
}

interface IMarketOrder extends IMarketInit, IPrice {
  item_amount: number
  order_id: string
  period_amount?: number
  seller_id: string
  seller_type: TSellerType
  selling_type?: TSellingType
  item_total?: number
}

export interface IBuyerDetail extends ITransHash {
  buyer_id: string
  qty: number
  buy_price: Number
  buy_date: Date
}

export interface IMarketData extends IMarketOrder, ICurrentTime {
  real_land: boolean
  buyer_details: any[]
  __v: number
}

export interface IMarketGameData extends Omit<IGameItemList, "min_item"> {}

export interface IMarketDetail extends IMarketOrder {
  land_data?: ILandData
  nakapunk_data?: INFTData
  material_data?: IMaterialInfo
  item_data?: IMarketGameData
  building_data?: IBuildData
  game_data?: IArcGameInfo
}

export interface IMarketForm {
  history: IMarketHistory[]
  marketplaces_data: IMarketData[] | null
  installments_data: IInstallData[] | null
  rentals_data: IRentalData[] | null
}

export interface ITransferMetaData {
  old_address: string
  new_address: string
  nft_token: string
}

export interface INFTTransfer
  extends IPlayerId,
    ICreateAt,
    ICurrentTime,
    ITransHash {
  token_address: string
  token_name: string
  player_wallet_address: string
  date_time: Date
  amount: number
  fee: number
  type: string
  item_qty: number
  meta_data: ITransferMetaData
  id: string
}

export interface IPayBillData {
  bill_id: string
  createdAt: Date
  id: string
  installment_round_payed: number
  round_payed_amount: number
  transaction_hash: string
  type: "pay_bill"
  updatedAt: Date
}

export interface IOwnerData {
  type: TType
  id: string
  tokenId?: string
  image?: string
  video?: string
  name: string
  price?: number
  selling_type?: TSellingType | string
  durability?: string | number
  level?: string | number
  size?: string | number
  amount?: string | number
}

export interface IOwnerDetailsData extends IOwnerData {
  desc?: string
  model?: string
  pos?: {
    x: string
    y: string
  }
  qrcode?: string
}

export interface IPayBillInstallServ extends IFormatMessageService {
  data: IPayBillData
}

export interface IPutOrderServ extends IFormatService {
  data: string
}

export interface INFTTransferServ extends IFormatMessageService {
  data: INFTTransfer
}

export interface IMarketOrderServ extends IFormatService {
  data: IMarketDetail[]
}

export interface IMarketCreateOrderServ extends IFormatService {
  data: null
}
