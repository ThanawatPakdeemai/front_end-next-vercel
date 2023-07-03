import React from "react"
import { ISlideList } from "@components/molecules/gameSlide/GameCarouselHeader"
import NakaIconMobile from "@mobile/components/atoms/icons/NakaIconMobile"
import HeartIconMobile from "@mobile/components/atoms/icons/HeartIconMobile"
import RewardIconMobile from "@mobile/components/atoms/icons/RewardIconMobile"
import SettingIconMobile from "@mobile/components/atoms/icons/SettingIconMobile"
import HeartFilledIconMobile from "@mobile/components/atoms/icons/HeartFilledIconMobile"
import RewardFilledIconMobile from "@mobile/components/atoms/icons/RewardFilledIconMobile"
import NakaIconFilledMobile from "@mobile/components/atoms/icons/NakaIconFilledMobile"

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

export type TGameMenuMobile = "home" | "wishlist" | "reward" | "setting"

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
    icon: <NakaIconMobile />,
    iconActive: <NakaIconFilledMobile />
  },
  {
    id: "wishlist",
    name: "Wishlist",
    icon: <HeartIconMobile />,
    iconActive: <HeartFilledIconMobile />
  },
  {
    id: "reward",
    name: "Rewards",
    icon: <RewardIconMobile />,
    iconActive: <RewardFilledIconMobile />
  },
  {
    id: "setting",
    name: "setting",
    icon: <SettingIconMobile />,
    iconActive: <SettingIconMobile />
  }
]
