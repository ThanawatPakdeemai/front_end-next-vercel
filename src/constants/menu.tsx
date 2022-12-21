import AttachMoneyIcon from "@mui/icons-material/AttachMoney"
import MoneyOffIcon from "@mui/icons-material/MoneyOff"
import MapOutlinedIcon from "@mui/icons-material/MapOutlined"
import DiamondIcon from "@mui/icons-material/Diamond"
import EditProfile from "@components/icons/MenunIcon/EditProfileIcon"
import InventoryIcon from "@components/icons/MenunIcon/InventoryIcon"
import ItemRewardIcon from "@components/icons/MenunIcon/ItemRewardIcon"
import PlayHistoryIcon from "@components/icons/MenunIcon/PlayHistoryIcon"
import SupportIcon from "@components/icons/MenunIcon/SupportIcon"
import YourMissionIcon from "@components/icons/MenunIcon/YourMissionIcon"
import WishlistIcon from "@components/icons/MenunIcon/WishlistIcon"
import IconDollar from "@components/icons/dollarIcon"
import StoryBoardIcon from "@components/icons/StoryBoardIcon"
import TournamentIcon from "@components/icons/TournamentIcon"
import { IMenuBase } from "@interfaces/IMenu"
import { IMAGES } from "./images"

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
        link: "/",
        icon: AttachMoneyIcon
      },
      {
        name: "Free Mode",
        link: "/free",
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

export const MENU_PROFILE: IMenuBase[] = [
  {
    label: "Edit Profile",
    href: "/",
    icon: <EditProfile />
  },
  { label: "Wishlist", href: "/", icon: <WishlistIcon /> },
  {
    label: "Play History",
    href: "/",
    icon: <PlayHistoryIcon />
  },
  { label: "Your Mission", href: "/", icon: <YourMissionIcon /> },
  { label: "Inventory", href: "/", icon: <InventoryIcon /> },
  { label: "Item Reward", href: "/", icon: <ItemRewardIcon /> },
  { label: "Support", href: "/", icon: <SupportIcon /> }
]

export const MENU_GAMES: IMenuBase[] = [
  {
    label: "Play To Earn Mode",
    href: "/",
    icon: <IconDollar.Ori className="stroke-neutral-300" />
  },
  {
    label: "Free Mode",
    href: "/",
    icon: <IconDollar.Mask className="stroke-neutral-300" />
  },
  {
    label: "Story Mode",
    href: "/",
    icon: <StoryBoardIcon className="stroke-neutral-300" />
  },
  {
    label: "Tournament",
    href: "/",
    icon: <TournamentIcon className="stroke-neutral-300" />
  }
]
