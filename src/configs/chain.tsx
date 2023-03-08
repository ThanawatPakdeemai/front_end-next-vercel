import React from "react"
import BinanceIcon from "@components/icons/NetworkIcon/BinanceIcon"
import ChainPolygonIcon from "@components/icons/NetworkIcon/ChainPolygonIcon"
import { TokenSupport } from "@feature/wallet/containers/hooks/useWalletContoller"

export interface IChainList {
  icon: React.ReactNode
  title: string
  link: TokenSupport
}

export const CHAIN_SUPPORT: IChainList[] = [
  {
    title: "Polygon",
    icon: <ChainPolygonIcon />,
    link: "NAKA"
  },
  {
    title: "Binance smart chain",
    icon: <BinanceIcon />,
    link: "BNB"
  }
]
