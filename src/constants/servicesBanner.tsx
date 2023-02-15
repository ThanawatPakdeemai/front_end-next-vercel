import React from "react"
import StakingIconBanner from "@components/icons/StakingIconBanner"

export interface IBanner {
  link: string
  text?: string
  icon?: React.ReactNode
  table?: boolean
  type: "text" | "blinkIcon"
}

export const STAKING_BANNER: IBanner[] = [
  {
    link: "/",
    text: "STAKING",
    type: "text"
  },
  {
    link: "/",
    icon: <StakingIconBanner className="naka-banner-icon absolute z-10" />,
    table: true,
    type: "blinkIcon"
  }
]

export const P2PDEX_BANNER: IBanner[] = [
  {
    link: "/p2p-dex",
    text: "P2P DEX",
    type: "text"
  },
  {
    link: "/",
    icon: <StakingIconBanner className="naka-banner-icon absolute z-10" />,
    table: true,
    type: "blinkIcon"
  }
]
