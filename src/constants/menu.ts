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
    link: "/",
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
      { name: "Free Mode", link: "/", icon: MoneyOffIcon, textRight: "Free" },
      {
        name: "Story Mode",
        link: "/",
        icon: MapOutlinedIcon,
        textRight: "Free"
      },
      { name: "Tournament", link: "/", icon: DiamondIcon }
    ]
  },
  {
    name: "Services",
    link: "/",
    isChide: true,
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
      { name: "Free Mode", link: "/", icon: MoneyOffIcon, textRight: "Free" },
      {
        name: "Story Mode",
        link: "/",
        icon: MapOutlinedIcon,
        textRight: "Free"
      },
      { name: "Tournament", link: "/", icon: DiamondIcon }
    ]
  },
  {
    name: "Naka Ecosystems",
    link: "/",
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
        name: "Play To Earn Mode",
        link: "/",
        icon: AttachMoneyIcon
      },
      { name: "Free Mode", link: "/", icon: MoneyOffIcon, textRight: "Free" },
      {
        name: "Story Mode",
        link: "/",
        icon: MapOutlinedIcon,
        textRight: "Free"
      },
      { name: "Tournament", link: "/", icon: DiamondIcon }
    ]
  }
]
