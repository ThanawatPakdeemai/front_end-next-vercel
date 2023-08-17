import dynamic from "next/dynamic"
import { IExchangePlatform } from "@interfaces/IWallet"

const OrionProtocolIcon = dynamic(
  () => import("@components/atoms/svg/OrionProtocolIcon")
)
const IcomoonExchain = dynamic(
  () => import("@components/atoms/icomoon/IcomoonExchain")
)

export const BUY_NAKA_MENU: IExchangePlatform[] = [
  {
    title: "Kucoin",
    icon: <IcomoonExchain className="icon-Kucoin" />,
    link: "https://trade.kucoin.com/trade/NAKA-USDT"
  },
  {
    title: "Bitmart",
    icon: <IcomoonExchain className="icon-Bitmart" />,
    link: "https://www.bitmart.com/"
  },
  {
    title: "Mexc",
    icon: <IcomoonExchain className="icon-MEXC" />,
    link: "https://www.mexc.com/register?inviteCode=14TND"
  },
  {
    title: "Orion Protocol",
    icon: <OrionProtocolIcon />,
    link: "https://trade.orionprotocol.io"
  }
]
