import {
  TSellingType,
  TType
} from "@feature/marketplace/interfaces/IMarketService"

export type TInvenVaultAction = "decrease" | "increase"

export interface IInventoryItemList {
  id: string
  tokenId: string
  cardType: TType
  name: string
  img: string
  vdo?: string
  amount?: number
  size?: string
  level?: string | number
  percentage?: number
  price?: number
  href?: string
  keyType?: string
  rental?: {
    totalPeriod: number
    totalBalancePeriod: number
    totalPrice: number
    exp: Date
    owner?: string
    buyer?: string
  }
  selling?: TSellingType
  payment_type?: string
}
