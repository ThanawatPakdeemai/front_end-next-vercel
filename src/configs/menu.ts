import { IMenu, IMenuIcon } from "@interfaces/IMenu"
import CONFIGS from "@configs/index"

export const MENU_GUEST = [
  {
    id: "games",
    label: "Play To Earn Games",
    icon: "IconGame",
    href: "/play-to-earn-games",
    external: false
  },
  {
    id: "free-to-earn",
    label: "Free To Play Games",
    icon: "IconFreeToEarn",
    href: "/free-to-play-games",
    external: false
  },
  {
    id: "free-to-play-games",
    label: "Story Mode Games",
    icon: "IconStoryMode",
    href: "/story-mode-games",
    external: false
  },
  {
    id: "tournament",
    label: "Tournament",
    icon: "IconTournament",
    href: "/tournament/636e5091feb7364211af6858/naka-runner-tournament-hosted-by-slayer",
    external: false
  }
]

export const MENU_FINANCE = [
  {
    id: "p2p-dex",
    label: "P2P DEX",
    icon: "IconP2P",
    href: "/p2p-dex",
    external: false
  },
  {
    id: "staking",
    label: "Staking",
    icon: "IconStaking",
    href: "/staking",
    external: false
  },
  {
    id: "referrals",
    label: "Referral Program",
    icon: "IconReferrals",
    href: "/referrals",
    external: false
  },
  {
    id: "coupon",
    label: "Coupon",
    icon: "IconCoupon",
    href: "/coupon",
    external: false
  }
  // {
  //   label: "Blog",
  //   icon: "IconBlog",
  //   href: "/blog",
  //   external: false
  // }
]

export const MENU_NAKAVERSE = [
  {
    id: "nakaverse",
    label: "Nakaverse",
    icon: "IconWorld",
    href: `${CONFIGS.BASE_URL.NAKAVERSE}`,
    external: true,
    hasToken: true
  },
  {
    id: "nakapunk",
    label: "NAKA Punks",
    icon: "IconNAKAPunk",
    href: `${CONFIGS.BASE_URL.MARKETPLACE}/naka-punk`,
    external: true,
    hasToken: true
  },
  {
    id: "marketplace",
    label: "Marketplace",
    icon: "IconMarket",
    href: `${CONFIGS.BASE_URL.MARKETPLACE}`,
    external: true,
    hasToken: true
  },
  {
    id: "blog",
    label: "Blog",
    icon: "IconBlog",
    href: "/blog",
    external: false
  },
  {
    id: "about",
    label: "About Us",
    icon: "IconNaka",
    href: `https://main.nakamoto.games`,
    external: true
  }
]

export const MENU_LOGGEDIN: IMenu[] = [
  {
    id: "notification",
    label: "Notifications",
    icon: "IconNotification",
    href: "/notifications",
    external: false
  },
  {
    id: "history",
    label: "Game Play History",
    icon: "IconClock",
    href: "/history",
    external: false
  },
  {
    id: "yourmission",
    label: "Your Mission",
    icon: "IconMission",
    href: "/",
    external: false
  },
  {
    id: "inventory",
    label: "Inventory",
    icon: "IconInventory",
    href: `${CONFIGS.BASE_URL.MARKETPLACE}/en/inventory/land`,
    external: true,
    hasToken: true
  },
  {
    id: "deposit-withdraw",
    label: "Deposit & Withdraw",
    icon: "IconWallet",
    href: "/wallet",
    external: false
  },
  {
    id: "earn-reward",
    label: "Items Reward",
    icon: "IconReward",
    href: "/earn-reward",
    external: false
  },
  // {
  //   id: "redeem",
  //   label: "Redeem",
  //   icon: "IconRedeem",
  //   href: `${CONFIGS.BASE_URL.REDEEM}`,
  //   external: true,
  //   hasToken: true
  // },
  {
    id: "support",
    label: "Support",
    icon: "IconCommunity",
    href: `${CONFIGS.BASE_URL.SUPPORT}`,
    external: true,
    hasToken: true
  }
]

export const MENU_INVENTORY = [
  {
    label: "Account",
    icon: "IconAccount",
    href: "/inventory/lands",
    // Remove the /inventory, and auto redirect to /inventory/lands
    external: false
  },
  {
    label: "Transaction Item",
    icon: "IconTransactions",
    href: "/inventory/transaction-item",
    external: false
  }
]

export const NFT_MENU = [
  {
    label: "Lands",
    icon: "IconClock",
    href: "/inventory/lands"
  },
  {
    label: "Game Items",
    icon: "IconLight",
    href: "/inventory/items"
  }
]

export const MENU_PROFILE = [
  {
    label: "Player Information",
    icon: "IconAccount",
    href: "/profile",
    external: false
  }
]

export const MENU_MAIN_PC: IMenuIcon[] = [
  {
    title: "P2P Trading",
    href: `/`,
    src: "/assets/images/icons/icon_p2p.svg",
    alt: `P2P Trading`
  },
  {
    title: "My Order",
    href: `/`,
    src: "/assets/images/icons/icon_p2p.svg",
    alt: `My Order`
  }
]
