import React from "react"
import BinanceIcon from "@components/icons/NetworkIcon/BinanceIcon"
import ChainPolygonIcon from "@components/icons/NetworkIcon/ChainPolygonIcon"

export type TokenSupport = "NAKA" | "BNB"

export interface IChainList {
  icon: React.ReactNode
  title: string
  link: TokenSupport
  chainId: string
}

export const CHAIN_SUPPORT: IChainList[] = [
  {
    title: "Polygon",
    icon: <ChainPolygonIcon />,
    link: "NAKA",
    chainId: "0x13881"
  },
  {
    title: "Binance smart chain",
    icon: <BinanceIcon />,
    link: "BNB",
    chainId: "0x61"
  }
]
