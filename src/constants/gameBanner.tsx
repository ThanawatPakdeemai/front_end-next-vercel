import EarthIcon from "@components/icons/EarthIcon"
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
