import React from "react"
import dynamic from "next/dynamic"
import CONFIGS from "."

const IcomoonChain = dynamic(
  () => import("@components/atoms/icomoon/IcomoonChain")
)

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
    icon: <IcomoonChain className="icon-Polygon" />,
    link: "NAKA",
    chainId: CONFIGS.CHAIN.CHAIN_ID_HEX as string
  }
  // {
  //   title: "Binance smart chain",
  //   icon: <IcomoonChain className={"icon-BSC"} />,
  //   link: "BNB",
  //   chainId: CONFIGS.CHAIN.CHAIN_ID_HEX_BNB as string
  // }
]

export const CHAIN_LIST: IChainList[] = [
  {
    title: "Polygon",
    icon: <IcomoonChain className="icon-Polygon" />,
    link: "NAKA",
    chainId: CONFIGS.CHAIN.CHAIN_ID_HEX as string
  },
  {
    title: "Binance smart chain",
    icon: <IcomoonChain className="icon-BSC" />,
    link: "BNB",
    chainId: CONFIGS.CHAIN.CHAIN_ID_HEX_BNB as string
  },
  {
    title: "Ethereum",
    icon: <IcomoonChain className="icon-Ethereum" />,
    link: "ETH",
    chainId: "0x1"
  }
]
