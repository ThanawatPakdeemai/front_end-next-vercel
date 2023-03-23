import { TMarketSelling } from "@feature/marketplace/interfaces/IMarket"

export const MARKET_SELLING: Array<TMarketSelling> = [
  {
    label: "full payment",
    value: "fullpayment"
  },
  {
    label: "installment",
    value: "installment"
  }
]

export const MARKET_INSTALL_PERIOD: Array<number> = [6, 9, 12, 15]
