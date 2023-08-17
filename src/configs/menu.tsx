import dynamic from "next/dynamic"
import {
  IMenu,
  IMenuIcon,
  IMenuMarketPlace,
  ISelectDropDown
} from "@interfaces/IMenu"
import CONFIGS from "@configs/index"
import { IMAGES } from "@constants/images"
import { TType } from "@feature/marketplace/interfaces/IMarketService"

const Icomoon = dynamic(() => import("@components/atoms/icomoon/Icomoon"), {
  suspense: true,
  ssr: false
})

export const MENU = [
  {
    name: "Home",
    link: "/",
    isChide: false,
    image: {
      src: IMAGES.tableCom.src,
      widthImg: 240,
      height: 150,
      alt: "image-game"
    }
  },
  {
    name: "Games",
    link: "/games",
    isChide: true,
    left: "120px !important",
    image: {
      src: IMAGES.tableCom.src,
      widthImg: 240,
      height: 150,
      alt: "image-game"
    },
    chide: [
      {
        name: "Play To Earn Games",
        link: "/play-to-earn",
        icon: <Icomoon className="icon-Dollar" />
      },
      {
        name: "Free To Play Games",
        link: "/free-to-play",
        icon: <Icomoon className="icon-Dollar-Crossed" />,
        textRight: "Free"
      },
      {
        name: "Free To Earn Games",
        icon: <Icomoon className="icon-Emoticon-Wink" />,
        link: "/free-to-earn",
        textRight: "Free"
      },
      {
        name: "Story Mode Games",
        link: "/story-mode",
        icon: <Icomoon className="icon-Flag-01" />,
        textRight: "Free"
      },
      // TODO: Open after launch V2
      // {
      //   name: "Tournament",
      //   link: "/tournament",
      //   icon: TournamentIcon
      // } /**
      //  @description name svgIcon in forder menu in public (if icon is string) */,
      // {
      //   name: "Partner Games",
      //   link: "/partner-games",
      //   icon: LanguageOutlinedIcon
      // },
      {
        name: "Arcade Emporium",
        link: "/arcade-emporium",
        icon: <Icomoon className="icon-Diamond" />
      },
      {
        name: "Events",
        link: "/events",
        icon: <Icomoon className="icon-Calendar-Check" />
      }
      // TODO: Open after launch V2
      // {
      //   name: "NAKA Pass",
      //   icon: BoltIcon,
      //   link: "/naka-pass"
      // }
      // {
      //   name: "NFT Pass",
      //   link: "/nft-pass",
      //   icon: MapOutlinedIcon
      // }
    ]
  },
  {
    name: "Services",
    link: "/services",
    isChide: true,
    image: {
      src: IMAGES.tableCom.src,
      widthImg: 240,
      height: 150,
      alt: "image-game"
    },
    chide: [
      {
        name: "P2P DEX",
        link: "/p2p-dex",
        icon: <Icomoon className="icon-Swap-Calls-Arrows" />
      },
      {
        name: "Staking",
        link: "/staking",
        icon: <Icomoon className="icon-Safe" />
      },
      {
        name: "Referral Program",
        link: "/referral",
        icon: <Icomoon className="icon-User-ID" />
      },
      {
        name: "Coupon",
        link: "/coupon",
        icon: <Icomoon className="icon-Ticket-Star" />
      }
    ]
  },
  {
    name: "NAKA Ecosystem",
    link: "/naka-ecosystems",
    isChide: true,
    left: "-180px !important",
    image: {
      src: IMAGES.tableCom.src,
      widthImg: 240,
      height: 150,
      alt: "image-game"
    },
    chide: [
      {
        name: "Marketplace",
        link: `${CONFIGS.BASE_URL.MARKETPLACE}`,
        icon: <Icomoon className="icon-Shopping-Cart-01" />
      },
      {
        name: "Nakaverse",
        link: `${CONFIGS.BASE_URL.NAKAVERSE}`,
        icon: <Icomoon className="icon-Earth" />
      },
      {
        name: "Nakapunks",
        link: `${CONFIGS.BASE_URL.MARKETPLACE}/naka-punk`,
        icon: <Icomoon className="icon-Naka-2" />
      },
      {
        name: "Blog",
        link: "/blog",
        icon: <Icomoon className="icon-Book" />
      },
      {
        name: "About Us",
        link: "https://main.nakamoto.games",
        icon: <Icomoon className="icon-Naka-3" />
      },
      // TODO: Open after launch V2
      {
        name: "Game Developer",
        link: "/game-developer",
        icon: <Icomoon className="icon-Screen-Text" />
      }
    ]
  }
]

export const MENU_GUEST: IMenu[] = [
  {
    id: "play-to-earn",
    label: "Play To Earn Games",
    icon: <Icomoon className="icon-Dollar" />,
    href: "/play-to-earn",
    external: false
  },
  {
    id: "free-to-play",
    label: "Free To Play Games",
    icon: <Icomoon className="icon-Dollar-Crossed" />,
    href: "/free-to-play",
    external: false
  },
  {
    id: "free-to-earn",
    label: "Free To Earn Games",
    icon: <Icomoon className="icon-Emoticon-Wink" />,
    href: "/free-to-earn",
    external: false
  },
  {
    id: "story-mode",
    label: "Story Mode Games",
    icon: <Icomoon className="icon-Flag-01" />,
    href: "/story-mode",
    external: false
  },
  // TODO: Open after launch V2
  // {
  //   id: "tournament",
  //   label: "Tournament",
  //   icon: <TournamentIcon className="stroke-neutral-300" />,
  //   href: "/tournament",
  //   external: false
  // },
  // {
  //   id: "partner-games",
  //   label: "Partner Games",
  //   icon: <GlobalIcon className="stroke-neutral-300" />,
  //   href: "/partner-games",
  //   external: false
  // },
  {
    id: "arcade-emporium",
    label: "Arcade Emporium",
    icon: <Icomoon className="icon-Diamond" />,
    href: "/arcade-emporium",
    external: false
  },
  {
    id: "events",
    label: "Events",
    icon: <Icomoon className="icon-Calendar-Check" />,
    href: "/events",
    external: false
  }
  // TODO: Open after launch V2
  // {
  //   id: "naka-pass",
  //   label: "NAKA Pass",
  //   icon: <BoltIcon stroke="#E1E2E2" />,
  //   href: "/naka-pass",
  //   external: true
  // }
]

export const MENU_LOGGEDIN: IMenu[] = [
  {
    id: "edit-profile",
    label: "Edit Profile",
    href: "/profile",
    icon: <Icomoon className="icon-User-Pass" />,
    external: false
  },
  {
    id: "wallet",
    label: "Wallet",
    href: "/wallet",
    icon: <Icomoon className="icon-Wallet" />,
    external: false
  },
  {
    id: "my-games",
    label: "My Games",
    href: "/my-games",
    icon: <Icomoon className="icon-Rocket" />,
    external: false
  },
  {
    id: "wishlist",
    label: "Wishlist",
    href: "/favourite-games",
    icon: <Icomoon className="icon-Heart" />,
    external: false
  },
  {
    id: "transactions",
    label: "All Transactions",
    href: "/transactions",
    icon: <Icomoon className="icon-Calendar" />,
    external: false
  },
  {
    id: "play-history",
    label: "All played games",
    href: "/history",
    icon: <Icomoon className="icon-Clock" />,
    external: false
  },
  {
    id: "commission",
    label: "Commission",
    href: "/commission",
    icon: <Icomoon className="icon-Dollar-Coin" />,
    external: false
  },
  {
    id: "your-mission",
    label: "Your Mission",
    href: "/mission",
    icon: <Icomoon className="icon-Camp-Fire" />,
    external: false
  },
  {
    id: "inventory",
    label: "Inventory",
    icon: <Icomoon className="icon-Box-Download" />,
    href: `${CONFIGS.BASE_URL.MARKETPLACE}/inventory/land`,
    external: true,
    hasToken: true
  },
  {
    id: "earn-reward",
    label: "Item Reward",
    icon: <Icomoon className="icon-Diamond" />,
    href: "/earn-reward",
    external: false
  },
  {
    id: "support",
    label: "Support",
    icon: <Icomoon className="icon-Headset" />,
    href: `https://t.me/NakamotoGames`,
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

export const MENU_BLOG: IMenu[] = [
  {
    id: "about-us",
    label: "About Us",
    icon: <Icomoon className="icon-Naka-3" />,
    href: "https://main.nakamoto.games/",
    external: false
  },
  {
    id: "marketplace",
    label: "Marketplace",
    icon: <Icomoon className="icon-Shopping-Cart-01" />,
    href: CONFIGS.BASE_URL.MARKETPLACE,
    external: true
  },
  {
    id: "nakaverse",
    label: "Nakaverse",
    icon: <Icomoon className="icon-Earth" />,
    href: `${CONFIGS.BASE_URL.NAKAVERSE}`,
    external: true
  },
  {
    id: "nakapunks",
    label: "Nakapunks",
    icon: <Icomoon className="icon-Naka-2" />,
    href: `${CONFIGS.BASE_URL.MARKETPLACE}/nakapunks`,
    external: false
  },
  {
    id: "game-developer",
    label: "Game Developer",
    icon: <Icomoon className="icon-Screen-Text" />,
    href: "/game-developer",
    external: false
  }
]

export const MENU_BLOG_HEADER = [
  // {
  //   name: "All",
  //   link: "date_released",
  //   isChide: false,
  //   icon: null
  // },
  {
    name: "New",
    link: "date_released",
    isChide: true,
    left: "120px !important",
    icon: <Icomoon className="icon-Sun-Rising" />
  },
  {
    name: "Hot",
    link: "info.like",
    isChide: true,
    icon: <Icomoon className="icon-Fire" />
  }
  // {
  //   name: "Discusion",
  //   link: "",
  //   isChide: true,
  //   left: "-180px !important",
  //   icon: <Discusion className="mr-2" />
  // }
]

export const MENU_SERVICES = [
  {
    id: "p2p-dex",
    label: "P2P DEX",
    icon: <Icomoon className="icon-Swap-Calls-Arrows" />,
    href: "/p2p-dex",
    external: false
  },
  {
    id: "staking",
    label: "Staking",
    icon: <Icomoon className="icon-Safe" />,
    href: "/staking",
    external: false
  },

  {
    id: "referral-program",
    label: "Referral Program",
    icon: <Icomoon className="icon-User-ID" />,
    href: "/referral",
    external: false
  },
  {
    id: "coupon",
    label: "Coupon",
    icon: <Icomoon className="icon-Ticket-Star" />,
    href: "/coupon",
    external: false
  }
]

export const MENU_MARKETPLACE: IMenuMarketPlace[] = [
  {
    name: "NAKA Market",
    link: "/marketplace",
    isChilde: false,
    left: "180px !important",
    image: {
      src: IMAGES.tableCom.src,
      widthImg: 240,
      height: 150,
      alt: "image-game"
    },
    chide: [
      {
        name: "Land",
        link: "/marketplace",
        icon: <Icomoon className="icon-Earth" />
      },
      {
        name: "Buildings",
        link: "/marketplace/building",
        icon: <Icomoon className="icon-Building" />
      },
      {
        name: "NAKA Punks",
        link: "/marketplace/naka-punk",
        icon: <Icomoon className="icon-Naka-2" />
      }
      // {
      //   name: "Avatar Reef",
      //   link: "/marketplace/avatar-reef",
      //   icon: ReefIcon
      // }
    ]
  },
  {
    name: "P2P Market",
    link: "/marketplace/p2p",
    isChilde: true,
    image: {
      src: IMAGES.tableCom.src,
      widthImg: 240,
      height: 150,
      alt: "image-game"
    },
    chide: [
      {
        name: "Game Item",
        link: "/marketplace/p2p/game-item",
        icon: <Icomoon className="icon-Potion" />
      },
      {
        name: "Land",
        link: "/marketplace/p2p/land",
        icon: <Icomoon className="icon-Earth" />
      },
      {
        name: "Buildings",
        link: "/marketplace/p2p/building",
        icon: <Icomoon className="icon-Building" />
      },
      {
        name: "Material",
        link: "/marketplace/p2p/material",
        icon: <Icomoon className="icon-Chicken" />
      },
      {
        name: "NAKA Punks",
        link: "/marketplace/p2p/naka-punk",
        icon: <Icomoon className="icon-Naka-2" />
      },
      {
        name: "Arcade Game",
        link: "/marketplace/p2p/arcade-game",
        icon: <Icomoon className="icon-Switch" />
      }
    ]
  },
  {
    name: "Nakaverse Map",
    link: "/marketplace/map",
    isChilde: true,
    image: {
      src: IMAGES.tableCom.src,
      widthImg: 240,
      height: 150,
      alt: "image-game"
    }
  }
]

interface IMenuFilter {
  page:
    | "marketplace"
    | "p2p"
    | "inventory"
    | "forsale"
    | "rental"
    | "process-payment"
  child: { name: string; href: string }[]
}

export const MENU_MARKETPLACE_FILTERBOX: IMenuFilter[] = [
  {
    page: "p2p",
    child: [
      { name: "Game Item", href: "/marketplace/p2p/game-item" },
      { name: "Land", href: "/marketplace/p2p/land" },
      { name: "Buildings", href: "/marketplace/p2p/building" },
      { name: "Material", href: "/marketplace/p2p/material" },
      { name: "NAKA Punks", href: "/marketplace/p2p/naka-punk" },
      { name: "Arcade Game", href: "/marketplace/p2p/arcade-game" }
    ]
  },
  {
    page: "forsale",
    child: [
      { name: "Game Item", href: "/marketplace/inventory/forsale/game-item" },
      { name: "Material", href: "/marketplace/inventory/forsale/material" },
      { name: "Land", href: "/marketplace/inventory/forsale/land" },
      { name: "Buildings", href: "/marketplace/inventory/forsale/building" },
      {
        name: "Arcade Game",
        href: "/marketplace/inventory/forsale/arcade-game"
      },
      { name: "NAKA Punks", href: "/marketplace/inventory/forsale/naka-punk" }
    ]
  },
  {
    page: "rental",
    child: [
      { name: "Land", href: "/marketplace/inventory/rental/land" },
      { name: "Buildings", href: "/marketplace/inventory/rental/building" }
    ]
  },
  {
    page: "process-payment",
    child: [
      { name: "Land", href: "/marketplace/inventory/process-payment/land" },
      {
        name: "Building",
        href: "/marketplace/inventory/process-payment/building"
      }
    ]
  },
  {
    page: "inventory",
    child: [
      { name: "Game Item", href: "/marketplace/inventory/game-item" },
      { name: "Land", href: "/marketplace/inventory/land" },
      { name: "Building", href: "/marketplace/inventory/building" },
      { name: "Material", href: "/marketplace/inventory/material" },
      { name: "NAKA Punks", href: "/marketplace/inventory/naka-punk" },
      { name: "Arcade Game", href: "/marketplace/inventory/arcade-game" }
      // { name: "Avatar Reef", href: "/marketplace/inventory/avatar-reef" }
    ]
  },
  {
    page: "marketplace",
    child: [
      { name: "Land", href: "/marketplace/land" },
      { name: "Buildings", href: "/marketplace/building" },
      { name: "NAKA Punks", href: "/marketplace/naka-punk" }
      // { name: "Avatar Reef", href: "/marketplace/avatar-reef" }
    ]
  }
]

export const MENU_MARKETPLACE_INVENTORY: IMenu[] = [
  {
    id: "inventory",
    label: "Inventory",
    icon: <Icomoon className="icon-Box-Download" />,
    href: "/marketplace/inventory",
    external: false
  },
  {
    id: "for-sale",
    label: "For Sale",
    icon: <Icomoon className="icon-Dollar-Coin" />,
    href: "/marketplace/inventory/forsale",
    external: false
  },
  {
    id: "rental",
    label: "Rental",
    icon: <Icomoon className="icon-Dollar-Coin" />,
    href: "/marketplace/inventory/rental",
    external: false
  },
  {
    id: "process-payment",
    label: "Process Payment",
    icon: <Icomoon className="icon-Stock-Chart" />,
    href: "/marketplace/inventory/process-payment",
    external: false
  },
  {
    id: "transaction",
    label: "Transaction",
    icon: <Icomoon className="icon-Added-to-Playlist" />,
    href: "/marketplace/inventory/transaction",
    external: false
  },
  {
    id: "my-land",
    label: "My Land",
    icon: <Icomoon className="icon-Earth" />,
    href: "/marketplace/inventory/my-land",
    external: false
  }
]

export const MENU_ROUTER_MARKETPLACE_TYPE: TType[] = [
  "land",
  "building",
  "naka-punk",
  "material",
  "game-item",
  "arcade-game"
]

export const MENU_ROUTER_INVENTORY_RENTAL: TType[] = ["land", "building"]

export const INVENTORY_DROPDOWN = [
  {
    label: "Land",
    href: "/marketplace/inventory/land"
  },
  {
    label: "Buildings",
    href: "/marketplace/inventory/building"
  },
  {
    label: "Game Item",
    href: "/marketplace/inventory/game-item"
  },
  {
    label: "Material",
    href: "/marketplace/inventory/material"
  },
  {
    label: "NAKA Punks",
    href: "/marketplace/inventory/naka-punk"
  },
  {
    label: "Arcade Game",
    href: "/marketplace/inventory/arcade-game"
  }
  // {
  //   label: "Avatar Reef",
  //   href: "/marketplace/inventory/avatar-reef"
  // }
]

export const INVENTORY_DROPDOWN_FORSALE = [
  {
    label: "Land",
    href: "/marketplace/inventory/forsale/land"
  },
  {
    label: "Buildings",
    href: "/marketplace/inventory/forsale/building"
  },
  {
    label: "Game Item",
    href: "/marketplace/inventory/forsale/game-item"
  },
  {
    label: "Material",
    href: "/marketplace/inventory/forsale/material"
  },
  {
    label: "NAKA Punks",
    href: "/marketplace/inventory/forsale/naka-punk"
  },
  {
    label: "Arcade Game",
    href: "/marketplace/inventory/forsale/arcade-game"
  }
]

export const INVENTORY_DROPDOWN_RENTAL = [
  {
    label: "Land",
    href: "/marketplace/inventory/rental/land"
  },
  {
    label: "Buildings",
    href: "/marketplace/inventory/rental/building"
  }
]

export const INVENTORY_DROPDOWN_PROCESS = [
  {
    label: "Land",
    href: "/marketplace/inventory/process-payment/land"
  },
  {
    label: "Buildings",
    href: "/marketplace/inventory/process-payment/building"
  },
  {
    label: "Arcade Game",
    href: "/marketplace/inventory/process-payment/arcade-game"
  }
]

export const MARKET_FILTER_PRICE: ISelectDropDown[] = [
  { label: "Lowest to Highest", value: 1 },
  { label: "Highest to Lowest", value: -1 }
]

export const MARKET_FILTER_SELLINGTYPE: ISelectDropDown[] = [
  {
    label: "Installment",
    value: "installment"
  },
  {
    label: "Fullpayment",
    value: "fullpayment"
  },
  {
    label: "Rental",
    value: "rental"
  }
]

export const MARKET_FILTER_DATE: ISelectDropDown[] = [
  { label: "New", value: -1 },
  { label: "Oldest", value: 1 }
]

export const MARKET_FILTER_MAP: ISelectDropDown[] = [
  {
    label: "Owned",
    value: "Owned"
  },
  {
    label: "Occupied",
    value: "Occupied"
  },
  {
    label: "Avaliable for sale",
    value: "Avaliable for sale"
  }
]
