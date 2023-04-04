import Helper from "@utils/helper"
import CONFIGS from "@configs/index"
import {
  IHeaderSlide,
  ISlideList
} from "@components/molecules/gameSlide/GameCarouselHeader"
import { IGameDownloadSlide } from "@feature/slider/interfaces/ISlides"
import IconNakaWorld from "@components/icons/nakaWorldIcon"
import IconDollar from "@components/icons/dollarIcon"
import IconFree from "@components/icons/freeIcon"
import MapOutlinedIcon from "@mui/icons-material/MapOutlined"
import ControllerIcon from "@components/icons/ControllerIcon"

export const GAME_BANNER_SLIDES = [
  {
    link: "/duckhunter",
    img: "assets/images/home/slide_duckhunter.png",
    texttop: "An exciting twist on",
    textbottom: "a favorite retro game."
  },
  {
    link: "/nakarunner",
    img: "assets/images/home/slide_nakarunner.png",
    texttop: "Move without stopping.",
    textbottom: "You can do it!"
  },
  {
    link: "/nakadui",
    img: "assets/images/home/slide_nakadui.png",
    texttop: "Stay on the road.",
    textbottom: "Adventure never ends."
  },
  {
    link: "/alien",
    img: "assets/images/home/banner_alien_apocalypse.png",
    texttop: "Save the world.",
    textbottom: "Destroy them all."
  },
  {
    link: "/cat-planet",
    img: "assets/images/home/CatRocket.png",
    texttop: "We choose to go to",
    textbottom: "the cat planet"
  }
]

export const GAME_HOT_SLIDER = [
  {
    num: "1",
    title: "An exciting twist on a favorite retro game.",
    image: "/assets/images/home/medium_duckhunter.png",
    to: "/duckhunter",
    gameName: "Duck Hunter",
    icon: ""
  },
  {
    num: "2",
    title: "Move without stopping. You can do it!",
    image: "/assets/images/home/medium_nakarunner.png",
    to: "/nakarunner",
    gameName: "NAKA Runner",
    icon: ""
  },
  {
    num: "3",
    title: "Stay on the road. Adventure never ends.",
    image: "/assets/images/home/medium_nakadui.png",
    to: "/nakadui",
    gameName: "NAKA DUI",
    icon: ""
  },
  {
    num: "4",
    title: "Save the world.Destroy them all.",
    image: "/assets/images/home/medium_alien_apocalypse.png",
    to: "/alien",
    gameName: "Alien Apocalypse",
    icon: ""
  },
  {
    num: "5",
    title: "We choose to go to the cat planet.",
    image: "/assets/images/home/medium_cat_rocket.png",
    to: "/cat-planet",
    gameName: "Cat Planet",
    icon: ""
  }
]

export const GAME_ALL_SLIDER = [
  {
    text: "Alii autem quibus ego cum memoriter tum etiam erga",
    title: "Photo via Behance.net by Serge Kogotko",
    image: "/assets/images/home/small_duckhunter.jpg",
    path: "duckhunter"
  },
  {
    text: "Alii autem quibus ego cum memoriter tum etiam erga",
    title: "Photo via Behance.net by Fabíola Monteiro",
    image: "/assets/images/home/small_nakarunner.jpg",
    path: "nakarunner"
  },
  {
    text: "Alii autem quibus ego cum memoriter tum etiam erga",
    title: "Photo via Behance.net by Ch. Habib ur Rehman",
    image: "/assets/images/home/small_nakadui.jpg",
    path: "nakadui"
  }
]

export const GAME_FEATURED_SLIDER = [
  {
    title: "An exciting twist on a favorite retro game.",
    cover: "/assets/images/categories/mock/duck-hunter.png",
    to: "/duckhunter",
    gameName: "Duck Hunter",
    category_name: "shooting"
  },
  {
    title: "Move without stopping. You can do it!",
    cover: "/assets/images/categories/mock/nakarunner.png",
    to: "/nakarunner",
    gameName: "NAKA Runner",
    category_name: "sport"
  },
  {
    title: "Stay on the road. Adventure never ends.",
    cover: "/assets/images/categories/mock/nakadui.png",
    to: "/nakadui",
    gameName: "NAKA DUI",
    category_name: "sport"
  }
]

export const GAME_FREE = [
  {
    num: "1",
    title: "Free-to-try games",
    image: "/assets/images/home/medium_nakadui.png",
    to: `${CONFIGS.BASE_URL.GAME}/free/dui/?${Helper.createEncryptLink(
      8
    )}${Buffer.from(`${CONFIGS.BASE_URL.FRONTEND}`, "base64")}`,
    gameName: "NAKA DUI",
    icon: ""
  },
  {
    num: "2",
    title: "Free-to-try games",
    image: "/assets/images/home/medium_alien_apocalypse.png",
    to: `${
      CONFIGS.BASE_URL.GAME
    }/free/alien-apocalypse/?${Helper.createEncryptLink(8)}${Buffer.from(
      `${CONFIGS.BASE_URL.FRONTEND}`,
      "base64"
    )}`,
    gameName: "Alien Apocalypse",
    icon: ""
  },
  {
    num: "3",
    title: "Free-to-try games",
    image: "/assets/images/home/medium_cat_rocket.png",
    to: `${CONFIGS.BASE_URL.GAME}/free/cat-planet/?${Helper.createEncryptLink(
      8
    )}${Buffer.from(`${CONFIGS.BASE_URL.FRONTEND}`, "base64")}`,
    gameName: "Cat Planet",
    icon: ""
  }
]

export const GAME_COMING_SOON = [
  {
    num: "1",
    title: "Escape",
    image: "/assets/images/games/coming_soon/escape.png",
    youtube_id: "l6tD708Q8Zc"
  }
]

const p2eMenu: ISlideList[] = [
  {
    id: "11",
    label: "play to earn games",
    type: "play-to-earn",
    className: "w-[166px]"
  }
  // {
  //   id: "12",
  //   label: "arcade emporium",
  //   type: "arcade-emporium",
  //   className: "w-[110px]"
  // }
]

const onPlayingMenu: ISlideList[] = [
  {
    id: "15",
    label: "All",
    type: "all",
    className: "w-[51px]"
  },
  {
    id: "14",
    label: "Play to earn",
    type: "play-to-earn",
    className: "w-[110px]"
  },
  {
    id: "13",
    label: "Free to play",
    type: "free-to-play",
    className: "w-[110px]"
  }
]
export const P2EHeaderMenu: IHeaderSlide = {
  sticker: (
    <IconNakaWorld
      width={180}
      height={125}
    />
  ),
  title: "play to earn",
  menuList: p2eMenu,
  theme: "error",
  stickerRotate: 15,
  icon: <IconDollar.Ori className="slick-header-error-icon" />
}

export const StoryModeHeaderMenu: IHeaderSlide = {
  sticker: (
    <IconNakaWorld
      width={180}
      height={125}
    />
  ),
  title: "story mode",
  menuList: p2eMenu,
  theme: "success",
  stickerRotate: 15,
  icon: <IconDollar.Ori className="slick-header-error-icon" />
}

export const NFTHeaderMenu: IHeaderSlide = {
  sticker: (
    <IconNakaWorld
      width={180}
      height={125}
    />
  ),
  title: "Arcade",
  menuList: p2eMenu,
  theme: "info",
  stickerRotate: 15,
  icon: <IconDollar.Ori className="slick-header-error-icon" />
}

export const onPlayingHeaderMenu: IHeaderSlide = {
  sticker: <></>,
  title: "On Playing",
  menuList: onPlayingMenu,
  theme: "success",
  stickerRotate: 15,
  icon: <ControllerIcon stroke="#3DCD95" /> // <IconDollar.Ori className="slick-header-error-icon" />
}

const f2pMenu: ISlideList[] = [
  {
    id: "13",
    label: "free mode",
    type: "free-to-play",
    className: "w-[110px]"
  },
  {
    id: "14",
    label: "story mode",
    type: "story-mode",
    className: "w-[166px]"
  }
  // unnessesary use
  // {
  //   id: "15",
  //   label: "must try",
  //   type: "must-try",
  //   className: "w-[166px]"
  // }
]

export const F2PHeaderMenu: IHeaderSlide = {
  sticker: (
    <IconFree
      width={200}
      height={100}
    />
  ),
  icon: <IconDollar.Not className="slick-header-secondary-icon" />,
  title: "free to earn",
  menuList: f2pMenu,
  theme: "secondary",
  stickerRotate: -15
}

export const HeaderMenuSeasonPass: IHeaderSlide = {
  sticker: <></>,
  icon: <MapOutlinedIcon className="" />,
  title: "story mode",
  menuList: [],
  theme: "info",
  stickerRotate: 0
}

export const GAME_DOWNLOAD: IGameDownloadSlide[] = [
  {
    id: "1",
    name: "Escape",
    image: "/images/home/escape.png",
    description:
      "Your new adventure begins now! Our first 3D multiplayer game with high-end graphics launched on the Nakamoto Games Platform. Join and push yourself to the limits!",
    download_link: "https://files.naka.im/games/escape_win_x64_installation.zip"
  }
]
