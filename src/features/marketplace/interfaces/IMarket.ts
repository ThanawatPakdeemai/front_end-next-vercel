import { TSellingType } from "./IMarketService"

export type TMarketAction =
  | "rent_out"
  | "cancel"
  | "mint"
  | "buy"
  | "sell"
  | "login"
  | "connect_wallet"
  | undefined

export type TMarketSelling = { label: string; value: TSellingType }
