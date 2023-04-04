import CONFIGS from "@configs/index"

type Banner = {
  title: string
  imgSrc: string
  path: string
  textColor: "red" | "purple"
}

/**
 * @description banner will automatically generate by path
 * if you want to set more @var path please set exactly the same as url used
 * @description default is nakamoto.games
 */
export const BANNER_DATA: Banner[] = [
  {
    title: "nakamoto.games",
    imgSrc: "/images/banner/nakamoto.webp",
    path: "/",
    textColor: "red"
  },
  // {
  //   title: "tournament",
  //   imgSrc: "/images/banner/tournament.webp",
  //   path: "/tournament",
  //   textColor: "red"
  // },
  {
    title: "staking",
    imgSrc: "/images/banner/staking.webp",
    path: "/staking",
    textColor: "red"
  },
  {
    title: "p2p trade",
    imgSrc: "/images/banner/p2p.webp",
    path: "/p2p-dex",
    textColor: "red"
  },
  {
    title: "coupon",
    imgSrc: "/images/banner/coupon.webp",
    path: "/coupon",
    textColor: "red"
  },
  {
    title: "referral program",
    imgSrc: "/images/banner/referral.webp",
    path: "/referral",
    textColor: "red"
  },
  {
    title: "blog",
    imgSrc: "/images/banner/blog.webp",
    path: "/blog",
    textColor: "red"
  },
  /** marketplace */
  {
    title: "naka market",
    imgSrc: "/images/banner/nakaMarket.webp",
    path: `${CONFIGS.BASE_URL.MARKETPLACE}`,
    textColor: "purple"
  }
]
