import React from "react"
import BinanceIcon from "@components/icons/NetworkIcon/BinanceIcon"
import ChainPolygonIcon from "@components/icons/NetworkIcon/ChainPolygonIcon"
import EthereumIcon from "@components/icons/NetworkIcon/EthereumIcon"
import CONFIGS from "."

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
    chainId: CONFIGS.CHAIN.CHAIN_ID_HEX as string
  }
  // TODO: Open after binance smart chain is ready
  // {
  //   title: "Binance smart chain",
  //   icon: <BinanceIcon />,
  //   link: "BNB",
  //   chainId: CONFIGS.CHAIN.CHAIN_ID_HEX_BNB as string
  // }
]

export const CHAIN_LIST: IChainList[] = [
  {
    title: "Polygon",
    icon: <ChainPolygonIcon />,
    link: "NAKA",
    chainId: CONFIGS.CHAIN.CHAIN_ID_HEX as string
  },
  {
    title: "Binance smart chain",
    icon: <BinanceIcon />,
    link: "BNB",
    chainId: CONFIGS.CHAIN.CHAIN_ID_HEX_BNB as string
  },
  {
    title: "Ethereum",
    icon: <EthereumIcon />,
    link: "ETH",
    chainId: "0x1"
  }
]
