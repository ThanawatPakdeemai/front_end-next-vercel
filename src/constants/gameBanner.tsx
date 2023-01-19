import EarthIcon from "@components/icons/EarthIcon"
import MaskBlogIcon from "@components/icons/MaskBlogIcon"
import NakamotoWarIcon from "@components/icons/NakamotoWarIcon"

export const GAME_BANNER = [
  {
    link: "/",
    text: "NAKAMOTO GAMES",
    type: "text"
  },
  {
    link: "/",
    icon: <EarthIcon className="naka-banner-icon absolute z-10" />,
    table: true,
    type: "blinkIcon"
  }
]

export const GAME_DETAILS_BANNER = [
  {
    link: "/",
    img: "/images/gamePage/bannerGame.webp",
    type: "banner"
  },
  {
    link: "/",
    icon: <NakamotoWarIcon className="naka-banner-icon absolute z-10" />,
    table: true,
    type: "blinkIcon"
  }
]

export const GAME_BLOG_BANNER = [
  {
    link: "/",
    text: "Naka Ecosystems",
    type: "text"
  },
  {
    link: "/",
    icon: <MaskBlogIcon className="naka-banner-icon-up-down absolute z-10" />,
    table: true,
    type: "blinkIcon"
  }
]
