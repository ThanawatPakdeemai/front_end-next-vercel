import React from "react"
import DiscordIcon from "@components/icons/SocialIcon/DiscordIcon"
import FacebookIcon from "@components/icons/SocialIcon/FacebookIcon"
import TelegramIcon from "@components/icons/SocialIcon/TelegramIcon"
import TwitterIcon from "@components/icons/SocialIcon/TwitterIcon"
import SubstackIcon from "@components/icons/SocialIcon/SubstackIcon"
import MediumIcon from "@components/icons/SocialIcon/MediumIcon"
import TiktokIcon from "@components/icons/SocialIcon/TiktokIcon"
import LinkIcon from "@mui/icons-material/Link"
import { IMenuBase } from "@interfaces/IMenu"

export const SOCIAL: IMenuBase[] = [
  {
    icon: <TelegramIcon />,
    label: "telegram",
    href: "https://t.me/NakamotoGames"
  },
  {
    icon: <TwitterIcon />,
    label: "twitter",
    href: "https://twitter.com/NakamotoGames"
  },
  {
    icon: <SubstackIcon />,
    label: "substack",
    href: "https://nakamotogames.substack.com/"
  },
  {
    icon: <MediumIcon />,
    label: "medium",
    href: "https://medium.com/@nakamotogames"
  },
  {
    icon: <FacebookIcon />,
    label: "facebook",
    href: "https://www.facebook.com/play.nakamoto.games"
  },
  {
    icon: <DiscordIcon />,
    label: "discord",
    href: "https://discord.com/invite/nakamoto-games"
  },
  {
    icon: <TiktokIcon />,
    label: "tiktok",
    href: "https://www.tiktok.com/@nakamotogames"
  }
]

export const SOCIAL_SHARE_SUMMARY: IMenuBase[] = [
  {
    icon: <TelegramIcon fill="#F42728" />,
    label: "telegram",
    href: "https://t.me/NakamotoGames"
  },
  {
    icon: <TwitterIcon fill="#F42728" />,
    label: "twitter",
    href: "https://twitter.com/NakamotoGames"
  },
  {
    icon: <FacebookIcon fill="#F42728" />,
    label: "facebook",
    href: "https://www.facebook.com/play.nakamoto.games"
  },
  {
    icon: <DiscordIcon fill="#F42728" />,
    label: "discord",
    href: "https://discord.com/invite/nakamoto-games"
  },
  {
    icon: <LinkIcon className="rotate-[-45deg] text-error-main" />,
    label: "link",
    href: ""
  }
]

export const SOCIAL_SHARE: IMenuBase[] = [
  {
    icon: <TelegramIcon fill="#F42728" />,
    label: "telegram",
    href: "https://t.me/NakamotoGames"
  },
  {
    icon: <TwitterIcon fill="#F42728" />,
    label: "twitter",
    href: "https://twitter.com/NakamotoGames"
  },
  {
    icon: <FacebookIcon fill="#F42728" />,
    label: "facebook",
    href: "https://www.facebook.com/play.nakamoto.games"
  },
  {
    icon: <LinkIcon className="rotate-[-45deg] text-error-main" />,
    label: "link",
    href: "/link"
  }
]

export const SOCIAL_BLOG_SHARE: IMenuBase[] = [
  {
    icon: <TwitterIcon fill="#ffffff" />,
    label: "twitter",
    href: "https://twitter.com/NakamotoGames"
  },
  {
    icon: <FacebookIcon fill="#ffffff" />,
    label: "facebook",
    href: "https://www.facebook.com/play.nakamoto.games"
  },
  {
    icon: <TelegramIcon fill="#ffffff" />,
    label: "telegram",
    href: "https://t.me/NakamotoGames"
  },
  {
    icon: <DiscordIcon fill="#ffffff" />,
    label: "discord",
    href: "https://discord.com/invite/nakamoto-games"
  }
]
