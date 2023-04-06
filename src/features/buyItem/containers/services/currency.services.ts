import CONFIGS from "@configs/index"
import { ICurrencyResponse } from "@interfaces/ICurrency"

export const trickerPriceBNBExternal = async (_symbol: string) => {
  const bnbPrice = (async () => {
    const coinName = (): string => {
      switch (_symbol && _symbol.toLocaleUpperCase()) {
        case "BNB":
        case "BNBT":
          return "BNBBUSD"
        default:
          return `BNB${_symbol}`
      }
    }
    const response = await fetch(
      `${CONFIGS.BASE_URL.BINANCE_API}/api/v3/ticker/price`
    )
    const data: ICurrencyResponse[] = await response.json()
    const filterData = data.find((item) => item.symbol === coinName())
    return (filterData as ICurrencyResponse) || {}
  })()
  return bnbPrice
}
