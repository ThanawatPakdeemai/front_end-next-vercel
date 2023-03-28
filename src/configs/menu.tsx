import { IMenu, IMenuIcon } from "@interfaces/IMenu"
import CONFIGS from "@configs/index"
import EditProfileIcon from "@components/icons/MenunIcon/EditProfileIcon"
import WishlistIcon from "@components/icons/MenunIcon/WishlistIcon"
import PlayHistoryIcon from "@components/icons/MenunIcon/PlayHistoryIcon"
import YourMissionIcon from "@components/icons/MenunIcon/YourMissionIcon"
import InventoryIcon from "@components/icons/MenunIcon/InventoryIcon"
import ItemRewardIcon from "@components/icons/MenunIcon/ItemRewardIcon"
import SupportIcon from "@components/icons/MenunIcon/SupportIcon"
import IconDollar from "@components/icons/dollarIcon"
import StoryBoardIcon from "@components/icons/StoryBoardIcon"
import TournamentIcon from "@components/icons/TournamentIcon"
import AttachMoneyIcon from "@mui/icons-material/AttachMoney"
import MoneyOffIcon from "@mui/icons-material/MoneyOff"
import MapOutlinedIcon from "@mui/icons-material/MapOutlined"
import DiamondIcon from "@mui/icons-material/Diamond"
import Diamond from "@components/icons/Diamond"
import { IMAGES } from "@constants/images"
import AboutUsIcon from "@components/icons/BlogIcon/AboutUsIcon"
import Campfire from "@components/icons/Campfire"
import MarketPlaceIcon from "@components/icons/BlogIcon/MarketPlaceIcon"
import NakaverseIcon from "@components/icons/BlogIcon/NakaverseIcon"
import NakapunksIcon from "@components/icons/BlogIcon/NakapunksIcon"
import NewIcon from "@components/icons/BlogIcon/NewIcon"
import FireOutLineIcon from "@components/icons/BlogIcon/FireOutLineIcon"
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined"
import AccessTimeIcon from "@mui/icons-material/AccessTime"
import Inventory from "@components/icons/Inventory"
import ItemReward from "@components/icons/ItemReward"
import Support from "@components/icons/Support"
import Profile from "@components/icons/Profile"
import ICoupon from "@components/icons/Coupon"
import IReferrals from "@components/icons/Referrals"
import IStacking from "@components/icons/Stacking"
import IconSwap from "@components/icons/SwapIcon"
import GlobalIcon from "@components/icons/GlobalIcon"
import BoltIcon from "@mui/icons-material/Bolt"
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined"
import SwapCallsIcon from "@mui/icons-material/SwapCalls"
import LocalActivityOutlinedIcon from "@mui/icons-material/LocalActivityOutlined"
import BlogIcon from "@components/icons/BlogIcon/BlogIcon"
import WalletIcon from "@components/icons/MenunIcon/WalletIcon"
import LaunchIcon from "@components/icons/MenunIcon/LaunchIcon"
import TransactionIcon from "@components/icons/MenunIcon/TransactionIcon"
import MyLandIcon from "@components/icons/Inventory/MyLandIcon"
import TransactionIconMKP from "@components/icons/Inventory/TransactionIcon"
import DollarIcon from "@components/icons/Referral/DollarIcon"
import ProcessPaymentIcon from "@components/icons/Inventory/ProcessPaymentIcon"
import DesktopIcon from "@components/icons/DesktopIcon"
import { TType } from "@feature/marketplace/interfaces/IMarketService"

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
        name: "Play To Earn Mode",
        link: "/play-to-earn-games",
        icon: AttachMoneyIcon
      },
      {
        name: "Free Mode",
        link: "/free-to-play-games",
        icon: MoneyOffIcon,
        textRight: "Free"
      },
      {
        name: "Story Mode",
        link: "/story-mode-games",
        icon: MapOutlinedIcon,
        textRight: "Free"
      },
      {
        name: "Tournament",
        link: "/tournament",
        icon: TournamentIcon
      } /**
       @description name svgIcon in forder menu in public (if icon is string) */,
      {
        name: "Partner Games",
        link: "/partner-games",
        icon: LanguageOutlinedIcon
      },
      {
        name: "Arcade Emporium",
        link: "/arcade-emporium",
        icon: DiamondIcon
      },
      {
        name: "NAKA Pass",
        icon: BoltIcon,
        link: "/naka-pass"
      }
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
        icon: SwapCallsIcon
      },
      {
        name: "Staking",
        link: "/staking",
        icon: IStacking
      },
      {
        name: "Referral Program",
        link: "/referral",
        icon: IReferrals
      },
      { name: "Coupon", link: "/coupon", icon: LocalActivityOutlinedIcon }
    ]
  },
  {
    name: "Naka Ecosystems",
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
        name: "Blog",
        link: "/blog",
        icon: BlogIcon
      },
      {
        name: "About Us",
        link: "https://main.nakamoto.games",
        icon: AboutUsIcon
      },
      {
        name: "Marketplace",
        link: "/marketplace",
        icon: MarketPlaceIcon
      },
      {
        name: "Nakaverse",
        link: `${CONFIGS.BASE_URL.NAKAVERSE}`,
        icon: NakaverseIcon
      },
      {
        name: "Nakapunks",
        link: "/marketplace/naka-punk",
        icon: NakapunksIcon
      },
      {
        name: "Become Developer",
        link: "/become-developer",
        icon: DesktopIcon
      }
    ]
  }
]

export const MENU_GUEST: IMenu[] = [
  {
    id: "games",
    label: "Play To Earn Mode",
    icon: <IconDollar.Ori className="stroke-neutral-300" />,
    href: "/play-to-earn-games",
    external: false
  },
  {
    id: "free-to-earn",
    label: "Free To Earn",
    icon: <IconDollar.Mask className="stroke-neutral-300" />,
    href: "/free-to-play-games",
    external: false
  },
  {
    id: "free-to-play-games",
    label: "Story Mode",
    icon: <StoryBoardIcon className="stroke-neutral-300" />,
    href: "/story-mode-games",
    external: false
  },
  {
    id: "tournament",
    label: "Tournament",
    icon: <TournamentIcon className="stroke-neutral-300" />,
    href: "/tournament",
    external: false
  },
  {
    id: "partner-games",
    label: "Partner Games",
    icon: <GlobalIcon className="stroke-neutral-300" />,
    href: "/partner-games",
    external: false
  },
  {
    id: "arcade-emporium",
    label: "Arcade Emporium",
    icon: <Diamond stroke="#E1E2E2" />,
    href: "/arcade-emporium",
    external: false
  },
  {
    id: "naka-pass",
    label: "NAKA Pass",
    icon: <BoltIcon stroke="#E1E2E2" />,
    href: "/naka-pass",
    external: true
  }
]

export const MENU_LOGGEDIN: IMenu[] = [
  {
    id: "edit-profile",
    label: "Edit Profile",
    href: "/profile",
    icon: <EditProfileIcon />,
    external: false
  },
  {
    id: "wallet",
    label: "Wallet",
    href: "/wallet",
    icon: <WalletIcon />,
    external: false
  },
  {
    id: "my-games",
    label: "My Games",
    href: "/my-games",
    icon: <LaunchIcon />,
    external: false
  },
  {
    id: "wishlist",
    label: "Wishlist",
    href: "/favourite-games",
    icon: <WishlistIcon />,
    external: false
  },
  {
    id: "transactions",
    label: "All Transactions",
    href: "/transactions",
    icon: <TransactionIcon />,
    external: false
  },
  {
    id: "play-history",
    label: "Play History",
    href: "/history",
    icon: <PlayHistoryIcon />,
    external: false
  },
  {
    id: "your-mission",
    label: "Your Mission",
    href: "/mission",
    icon: <YourMissionIcon />,
    external: false
  },
  {
    id: "inventory",
    label: "Inventory",
    icon: <InventoryIcon />,
    href: `${CONFIGS.BASE_URL.MARKETPLACE}/en/inventory/land`,
    external: true,
    hasToken: true
  },
  {
    id: "earn-reward",
    label: "Item Reward",
    icon: <ItemRewardIcon />,
    href: "/earn-reward",
    external: false
  },
  {
    id: "support",
    label: "Support",
    icon: <SupportIcon />,
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

export const MENU_PROFILE_Datell: IMenu[] = [
  {
    id: "my profile",
    label: "My Profile",
    icon: <Profile className="stroke-neutral-300" />,
    href: "/",
    external: false
  },
  {
    id: "wishlist",
    label: "Wishlist",
    icon: <FavoriteBorderOutlinedIcon className="stroke-neutral-300" />,
    href: "/",
    external: false
  },
  {
    id: "play history",
    label: "Play History",
    icon: <AccessTimeIcon className="stroke-neutral-300" />,
    href: "/history",
    external: false
  },
  {
    id: "your mission",
    label: "Your Mission",
    icon: <Campfire />,
    href: "/mission",
    external: false
  },
  {
    id: "inventory",
    label: "Inventory",
    icon: <Inventory className="stroke-neutral-300" />,
    href: "/inventory",
    external: false
  },
  {
    id: "item reward",
    label: "Item Reward",
    icon: <ItemReward className="stroke-neutral-300" />,
    href: "/item-reward",
    external: false
  },
  {
    id: "support",
    label: "Support",
    icon: <Support className="stroke-neutral-300" />,
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
    icon: <AboutUsIcon className="stroke-neutral-300" />,
    href: "https://main.nakamoto.games/",
    external: false
  },
  {
    id: "marketplace",
    label: "Marketplace",
    icon: <MarketPlaceIcon className="stroke-neutral-300" />,
    href: "/marketplace",
    external: false
  },
  {
    id: "nakaverse",
    label: "Nakaverse",
    icon: <NakaverseIcon className="stroke-neutral-300" />,
    href: `${CONFIGS.BASE_URL.NAKAVERSE}`,
    external: true
  },
  {
    id: "nakapunks",
    label: "Nakapunks",
    icon: <NakapunksIcon className="stroke-neutral-300" />,
    href: "/marketplace/naka-punk",
    external: false
  },
  {
    id: "become-developer",
    label: "Become Developer",
    icon: <DesktopIcon className="stroke-neutral-300" />,
    href: "/become-developer",
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
    icon: (
      <NewIcon className="mr-2 stroke-black-600  group-hover:!fill-white-default group-hover:!stroke-white-default" />
    )
  },
  {
    name: "Hot",
    link: "info.like",
    isChide: true,
    icon: (
      <FireOutLineIcon className="mr-2  stroke-black-600 group-hover:!stroke-white-default" />
    )
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
    icon: (
      <IconSwap
        className="stroke-neutral-300"
        stroke="#E1E2E2"
      />
    ),
    href: "/p2p-dex",
    external: false
  },
  {
    id: "staking",
    label: "Staking",
    icon: (
      <IStacking
        className="stroke-neutral-300"
        stroke="#E1E2E2"
      />
    ),
    href: "/staking",
    external: false
  },

  {
    id: "referral-program",
    label: "Referral Program",
    icon: (
      <IReferrals
        className="stroke-neutral-300"
        stroke="#E1E2E2"
      />
    ),
    href: "/referral",
    external: false
  },
  {
    id: "coupon",
    label: "Coupon",
    icon: (
      <ICoupon
        className="stroke-neutral-300"
        stroke="#E1E2E2"
      />
    ),
    href: "/coupon",
    external: false
  }
]

export const MENU_MARKETPLACE = [
  {
    name: "NAKA Market",
    link: "/marketplace",
    isChilde: true,
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
        icon: MarketPlaceIcon
      },
      {
        name: "Building",
        link: "/marketplace/building",
        icon: MarketPlaceIcon
      },
      {
        name: "NAKA Punk",
        link: "/marketplace/naka-punk",
        icon: MarketPlaceIcon
      }
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
        icon: MarketPlaceIcon
      },
      {
        name: "Land",
        link: "/marketplace/p2p/land",
        icon: MarketPlaceIcon
      },
      {
        name: "Building",
        link: "/marketplace/p2p/building",
        icon: MarketPlaceIcon
      },
      {
        name: "Material",
        link: "/marketplace/p2p/material",
        icon: MarketPlaceIcon
      },
      {
        name: "NAKA Punk",
        link: "/marketplace/p2p/naka-punk",
        icon: MarketPlaceIcon
      },
      {
        name: "Arcade Game",
        link: "/marketplace/p2p/arcade-game",
        icon: MarketPlaceIcon
      }
    ]
  },
  {
    name: "Nakaverse Map",
    link: "/marketplace/map",
    isChide: false,
    image: {
      src: IMAGES.tableCom.src,
      widthImg: 240,
      height: 150,
      alt: "image-game"
    }
  }
]

export const MENU_MARKETPLACE_INVENTORY: IMenu[] = [
  {
    id: "inventory",
    label: "Inventory",
    icon: <InventoryIcon />,
    href: "/marketplace/inventory",
    external: false
  },
  {
    id: "for-sale",
    label: "For Sale",
    icon: <DollarIcon />,
    href: "/marketplace/inventory/forsale",
    external: false
  },
  {
    id: "process-payment",
    label: "Process Payment",
    icon: <ProcessPaymentIcon />,
    href: "/marketplace/inventory/process-payment",
    external: false
  },
  {
    id: "transaction",
    label: "Transaction",
    icon: <TransactionIconMKP />,
    href: "/marketplace/inventory/transaction",
    external: false
  },
  {
    id: "my-land",
    label: "My Land",
    icon: <MyLandIcon />,
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

export const INVENTORY_DROPDOWN = [
  {
    label: "Land",
    href: "/marketplace/inventory/land"
  },
  {
    label: "Building",
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
    label: "Naka Punk",
    href: "/marketplace/inventory/naka-punk"
  },
  {
    label: "Arcade Game",
    href: "/marketplace/inventory/arcade-game"
  }
]

export const INVENTORY_DROPDOWN_FORSALE = [
  {
    label: "Land",
    href: "/marketplace/inventory/forsale/land"
  },
  {
    label: "Building",
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
    label: "Naka Punk",
    href: "/marketplace/inventory/forsale/naka-punk"
  },
  {
    label: "Arcade Game",
    href: "/marketplace/inventory/forsale/arcade-game"
  }
]

export const INVENTORY_DROPDOWN_PROCESS = [
  {
    label: "Land",
    href: "/marketplace/inventory/process-payment/land"
  },
  {
    label: "Building",
    href: "/marketplace/inventory/process-payment/building"
  },
  {
    label: "Arcade Game",
    href: "/marketplace/inventory/process-payment/arcade-game"
  }
]
