import React from "react"
import { ISlideList } from "@components/molecules/gameSlide/GameCarouselHeader"
import NakaIconMobile from "@mobile/components/atoms/icons/NakaIconMobile"
import HeartIconMobile from "@mobile/components/atoms/icons/HeartIconMobile"
import RewardIconMobile from "@mobile/components/atoms/icons/RewardIconMobile"
import SettingIconMobile from "@mobile/components/atoms/icons/SettingIconMobile"

export const GAME_MENU_MOBILE: ISlideList[] = [
  {
    id: "play-to-earn",
    label: "Free To Earn",
    type: "play-to-earn"
  },
  {
    id: "free-to-earn",
    label: "Free To Earn",
    type: "free-to-earn"
  },
  {
    id: "free-to-play",
    label: "Free To Play",
    type: "free-to-play"
  },
  {
    id: "story-mode",
    label: "Story Mode",
    type: "story-mode"
  },
  {
    id: "arcade-emporium",
    label: "Arcade Emporium",
    type: "arcade-emporium"
  }
]

export type TGameMenuMobile = "home" | "wishlist" | "reward" | "settings"

export const MAIN_MENU_MOBILE: {
  name: string
  link?: string
  icon: React.ReactNode
  id: TGameMenuMobile
}[] = [
  {
    id: "home",
    name: "Home",
    link: "/",
    icon: <NakaIconMobile />
  },
  {
    id: "wishlist",
    name: "Wishlist",
    icon: <HeartIconMobile />
  },
  {
    id: "reward",
    name: "Reward",
    icon: <RewardIconMobile />
  },
  {
    id: "settings",
    name: "Settings",
    icon: <SettingIconMobile />
  }
]
