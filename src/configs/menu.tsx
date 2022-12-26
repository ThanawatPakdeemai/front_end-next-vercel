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
import { IMAGES } from "@constants/images"

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
        link: "/story",
        icon: MapOutlinedIcon,
        textRight: "Free"
      },
      { name: "Tournament", link: "/tournament", icon: DiamondIcon }
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
        link: "/log",
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
  }
]

export const MENU_LOGGEDIN: IMenu[] = [
  {
    id: "edit-profile",
    label: "Edit Profile",
    href: "/",
    icon: <EditProfileIcon />,
    external: false
  },
  {
    id: "wishlist",
    label: "Wishlist",
    href: "/",
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
    href: "/",
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
