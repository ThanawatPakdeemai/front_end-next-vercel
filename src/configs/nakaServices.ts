import CONFIGS from "@configs/index"

export const NAKA_SERVICES = [
  {
    label: "P2P DEX",
    path: "/p2p-dex"
  },
  {
    label: "Staking",
    path: "/staking"
  },
  {
    label: "Referral Program",
    path: "/referral"
  },
  {
    label: "Coupon",
    path: "/coupon"
  }
]

export const NAKA_SERVICES_2 = [
  {
    label: "Marketplace",
    path: `${CONFIGS.BASE_URL.MARKETPLACE}`,
    icon: true
  },
  {
    label: "Nakaverse",
    path: `${CONFIGS.BASE_URL.NAKAVERSE}`,
    icon: true
  },
  {
    label: "Nakapunks",
    path: `${CONFIGS.BASE_URL.MARKETPLACE}/naka-punk`,
    icon: true
  }
]
