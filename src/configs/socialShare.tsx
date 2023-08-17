import React from "react"
import dynamic from "next/dynamic"
import { IMenuBase } from "@interfaces/IMenu"

const Icomoon = dynamic(() => import("@components/atoms/icomoon/Icomoon"), {
  suspense: true,
  ssr: false
})

export const SOCIAL: IMenuBase[] = [
  {
    icon: <Icomoon className="icon-telegram" />,
    label: "telegram",
    href: "https://t.me/NakamotoGames"
  },
  {
    icon: <Icomoon className="icon-twitter" />,
    label: "twitter",
    href: "https://twitter.com/NakamotoGames"
  },
  {
    icon: <Icomoon className="icon-Substack !text-base" />,
    label: "substack",
    href: "https://nakamotogames.substack.com/"
  },
  {
    icon: <Icomoon className="icon-Mediems" />,
    label: "medium",
    href: "https://medium.com/@nakamotogames"
  },
  {
    icon: <Icomoon className="icon-Facebook" />,
    label: "facebook",
    href: "https://www.facebook.com/play.nakamoto.games"
  },
  {
    icon: <Icomoon className="icon-Discord" />,
    label: "discord",
    href: "https://discord.com/invite/nakamoto-games"
  },
  {
    icon: <Icomoon className="icon-Tiktok" />,
    label: "tiktok",
    href: "https://www.tiktok.com/@nakamotogames"
  }
  // {
  //   icon: <YoutubeIcon />,
  //   label: "youtube",
  //   href: "https://www.youtube.com/@nakamotogames"
  // }
]

export const SOCIAL_SHARE_SUMMARY: IMenuBase[] = SOCIAL
export const SOCIAL_SHARE: IMenuBase[] = [
  {
    icon: <Icomoon className="icon-Link" />,
    label: "link",
    href: ""
  },
  ...SOCIAL
]
export const SOCIAL_BLOG_SHARE: IMenuBase[] = SOCIAL
