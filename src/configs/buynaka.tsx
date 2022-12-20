import BitmartIcon from "@components/icons/NetworkIcon/BitmartIcon"
import KucoinIcon from "@components/icons/NetworkIcon/KucoinIcon"
import MexcIcon from "@components/icons/NetworkIcon/MexcIcon"
import OrionProtocolIcon from "@components/icons/NetworkIcon/OrionProtocolIcon"
import { IExchangePlatform } from "@interfaces/IWallet"

export const BUY_NAKA_MENU: IExchangePlatform[] = [
  {
    title: "Kucoin",
    icon: <KucoinIcon />,
    link: "https://trade.kucoin.com/trade/NAKA-USDT"
  },
  {
    title: "Bitmart",
    icon: <BitmartIcon />,
    link: "https://www.bitmart.com/"
  },
  {
    title: "Mexc",
    icon: <MexcIcon />,
    link: "https://www.mexc.com/register?inviteCode=14TND"
  },
  {
    title: "Orion Protocol",
    icon: <OrionProtocolIcon />,
    link: "https://trade.orionprotocol.io"
  }
]
