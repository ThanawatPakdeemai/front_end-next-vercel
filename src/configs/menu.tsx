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
import Discusion from "@components/icons/BlogIcon/Discusion"
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
      { name: "Tournament", link: "/tournament", icon: DiamondIcon },
      {
        name: "Partner Games",
        link: "/partner-games",
        icon: MapOutlinedIcon
      },
      {
        name: "NFT Games",
        link: "/nft-games",
        icon: MapOutlinedIcon
      }
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
        icon: AttachMoneyIcon
      },
      {
        name: "Staking",
        link: "/staking",
        icon: MoneyOffIcon
      },
      {
        name: "Referral Program",
        link: "/referral",
        icon: MapOutlinedIcon
      },
      { name: "Coupon", link: "/coupon", icon: DiamondIcon }
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
        icon: AttachMoneyIcon
      },
      {
        name: "About Us",
        link: "/abount-us",
        icon: MoneyOffIcon
      },
      {
        name: "Marketplace",
        link: "/marketplace",
        icon: MapOutlinedIcon
      },
      { name: "Nakaverse", link: "/nakaverse", icon: DiamondIcon },
      { name: "Nakapunks", link: "/nakapunks", icon: DiamondIcon }
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
    label: "Free Mode",
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
    href: "/tournament/636e5091feb7364211af6858/naka-runner-tournament-hosted-by-slayer",
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
    id: "nft-games",
    label: "NFT Games",
    icon: <Diamond stroke="#E1E2E2" />,
    href: "/nft-games",
    external: false
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
    id: "wishlist",
    label: "Wishlist",
    href: "/favourite-games",
    icon: <WishlistIcon />,
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
    href: "/",
    external: false
  },
  {
    id: "marketplace",
    label: "Marketplace",
    icon: <MarketPlaceIcon className="stroke-neutral-300" />,
    href: "/",
    external: false
  },
  {
    id: "nakaverse",
    label: "Nakaverse",
    icon: <NakaverseIcon className="stroke-neutral-300" />,
    href: "/",
    external: false
  },
  {
    id: "nakapunks",
    label: "Nakapunks",
    icon: <NakapunksIcon className="stroke-neutral-300" />,
    href: "/",
    external: false
  }
]

export const MENU_BLOG_HEADER = [
  {
    name: "All",
    link: "",
    isChide: false,
    icon: null
  },
  {
    name: "New",
    link: "",
    isChide: true,
    left: "120px !important",
    icon: <NewIcon className="mr-2" />
  },
  {
    name: "Hot",
    link: "",
    isChide: true,
    icon: <FireOutLineIcon className="mr-2 stroke-black-600" />
  },
  {
    name: "Discusion",
    link: "",
    isChide: true,
    left: "-180px !important",
    icon: <Discusion className="mr-2" />
  }
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
    href: "/P2P DEX",
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
