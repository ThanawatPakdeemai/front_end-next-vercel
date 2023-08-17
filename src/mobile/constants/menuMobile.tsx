import React from "react"
import dynamic from "next/dynamic"
import { ISlideList } from "@components/molecules/gameSlide/GameCarouselHeader"

const Icomoon = dynamic(() => import("@components/atoms/icomoon/Icomoon"), {
  suspense: true,
  ssr: true
})

export const GAME_MENU_MOBILE: ISlideList[] = [
  {
    id: "free-to-play",
    label: "Free To Play",
    type: "free-to-play"
  },
  // {
  //   id: "free-to-earn",
  //   label: "Free To Earn",
  //   type: "free-to-earn"
  // },
  {
    id: "story-mode",
    label: "Story Mode",
    type: "story-mode"
  }
  // {
  //   id: "play-to-earn",
  //   label: "Play To Earn",
  //   type: "play-to-earn"
  // },
  // {
  //   id: "arcade-emporium",
  //   label: "Arcade Emporium",
  //   type: "arcade-emporium"
  // }
]

export type TGameMenuMobile = "home" | "wishlist" | "rewards" | "settings"

export const MAIN_MENU_MOBILE: {
  name: string
  link?: string
  icon: React.ReactNode
  iconActive: React.ReactNode
  id: TGameMenuMobile
}[] = [
  {
    id: "home",
    name: "Home",
    link: "/",
    icon: <Icomoon className="icon-Naka text-error-main" />,
    iconActive: <Icomoon className="icon-Naka text-error-main" />
  },
  {
    id: "wishlist",
    name: "Wishlist",
    icon: <Icomoon className="icon-Heart" />,
    iconActive: <Icomoon className="icon-app-bold icon-Heart text-error-main" />
  },
  {
    id: "rewards",
    name: "Rewards",
    icon: <Icomoon className="icon-app icon-Game" />,
    iconActive: <Icomoon className="icon-app icon-Game text-error-main" />
  },
  {
    id: "settings",
    name: "Settings",
    icon: <Icomoon className="icon-app icon-Filter" />,
    iconActive: <Icomoon className="icon-app icon-Filter text-error-main" />
  }
]
