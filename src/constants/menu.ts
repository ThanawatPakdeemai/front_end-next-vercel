import AttachMoneyIcon from "@mui/icons-material/AttachMoney"
import MoneyOffIcon from "@mui/icons-material/MoneyOff"
import MapOutlinedIcon from "@mui/icons-material/MapOutlined"
import DiamondIcon from "@mui/icons-material/Diamond"
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
    left: "100px !important",
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
        name: "Play To Earn Mode Services",
        link: "/free",
        icon: AttachMoneyIcon
      },
      {
        name: "Free Mode Services",
        link: "/free",
        icon: MoneyOffIcon,
        textRight: "Free"
      },
      {
        name: "Story Mode Services",
        link: "/free",
        icon: MapOutlinedIcon,
        textRight: "Free"
      },
      { name: "Tournament Services", link: "/free", icon: DiamondIcon }
    ]
  },
  {
    name: "Naka Ecosystems",
    link: "/naka-ecosystems",
    isChide: true,
    left: "-155px !important",
    image: {
      src: IMAGES.tableCom.src,
      widthImg: 240,
      height: 150,
      alt: "image-game"
    },
    chide: [
      {
        name: "Play To Earn Mode Ecosystems",
        link: "/free",
        icon: AttachMoneyIcon
      },
      {
        name: "Free Mode Ecosystems",
        link: "/free",
        icon: MoneyOffIcon,
        textRight: "Free"
      },
      {
        name: "Story Mode Ecosystems",
        link: "/free",
        icon: MapOutlinedIcon,
        textRight: "Free"
      },
      { name: "Tournament Ecosystems", link: "/free", icon: DiamondIcon }
    ]
  }
]

export const MENU_PROFILE = [
  {
    name: "Edit Profile",
    link: "/",
    icon: "/images/menu/editProfile.png"
  },
  { name: "Wishlist", link: "/", icon: "/images/menu/wishlist.png" },
  {
    name: "Play History",
    link: "/",
    icon: "/images/menu/playHistory.png"
  },
  { name: "Your Mission", link: "/", icon: "/images/menu/yourMission.png" },
  { name: "Inventory", link: "/", icon: "/images/menu/inventory.png" },
  { name: "Item Reward", link: "/", icon: "/images/menu/itemReward.png" },
  { name: "Support", link: "/", icon: "/images/menu/support.png" }
]
