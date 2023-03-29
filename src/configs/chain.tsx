import React from "react"
import BinanceIcon from "@components/icons/NetworkIcon/BinanceIcon"
import ChainPolygonIcon from "@components/icons/NetworkIcon/ChainPolygonIcon"
import EthereumIcon from "@components/icons/NetworkIcon/EthereumIcon"

export type TokenSupport = "NAKA" | "BNB" | "ETH"

export interface IChainList {
  title: string
  link: TokenSupport
  chainId: string
  icon: React.ReactNode
}

export const CHAIN_SUPPORT: IChainList[] = [
  {
    title: "Polygon",
    icon: <ChainPolygonIcon />,
    link: "NAKA",
    chainId: "0x13881"
  }
  // {
  //   title: "Binance smart chain",
  //   icon: <BinanceIcon />,
  //   link: "BNB",
  //   chainId: "0x61"
  // }
]

export const CHAIN_LIST: IChainList[] = [
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
  },
  {
    title: "Ethereum",
    icon: <EthereumIcon />,
    link: "ETH",
    chainId: "0x1"
  }
]
