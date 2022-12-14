import Helper from "@utils/helper"
import CONFIGS from "@configs/index"
import { ISlide } from "@components/molecules/gameSlide/GameCarousel"
import {
  IHeaderSlide,
  ISlideList
} from "@components/molecules/gameSlide/GameCarouselHeader"
import { IGameDownloadSlide } from "@feature/slider/interfaces/ISlides"

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
    )}${btoa(`${CONFIGS.BASE_URL.FRONTEND}`)}`,
    gameName: "NAKA DUI",
    icon: ""
  },
  {
    num: "2",
    title: "Free-to-try games",
    image: "/assets/images/home/medium_alien_apocalypse.png",
    to: `${
      CONFIGS.BASE_URL.GAME
    }/free/alien-apocalypse/?${Helper.createEncryptLink(8)}${btoa(
      `${CONFIGS.BASE_URL.FRONTEND}`
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
    )}${btoa(`${CONFIGS.BASE_URL.FRONTEND}`)}`,
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

export const mockF2PGame: ISlide[] = [
  {
    id: 1,
    image: "/images/mocks/free2playGames/camoratuc_game.png",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
  },
  {
    id: 2,
    image: "/images/mocks/free2playGames/bumig_game.png",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
  },
  {
    id: 3,
    image: "/images/mocks/free2playGames/mette_game.png",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
  },
  {
    id: 4,
    image: "/images/mocks/free2playGames/funlttte_game.png",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
  },
  {
    id: 5,
    image: "/images/mocks/free2playGames/cute_game.png",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
  },
  {
    id: 6,
    image: "/images/mocks/free2playGames/enz2_game.png",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
  },
  {
    id: 7,
    image: "/images/mocks/free2playGames/tfttss_game.png",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
  }
]

export const mockP2EGame: ISlide[] = [
  {
    id: 1,
    image: "/images/mocks/play2earnGames/rarkaak_game.png",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
  },
  {
    id: 2,
    image: "/images/mocks/play2earnGames/faps_game.png",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
  },
  {
    id: 3,
    image: "/images/mocks/play2earnGames/nakn_game.png",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
  },
  {
    id: 4,
    image: "/images/mocks/play2earnGames/duninutss_game.png",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
  },
  {
    id: 5,
    image: "/images/mocks/play2earnGames/rovr_game.png",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
  },
  {
    id: 6,
    image: "/images/mocks/play2earnGames/vaanne_game.png",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
  },
  {
    id: 7,
    image: "/images/mocks/play2earnGames/gartiig_game.png",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
  },
  {
    id: 8,
    image: "/images/mocks/play2earnGames/oiryhk2_game.png",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
  },
  {
    id: 9,
    image: "/images/mocks/play2earnGames/fatf_game.png",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
  }
]

const p2eMenu: ISlideList[] = [
  {
    id: "11",
    label: "hot games",
    type: "hot_game",
    className: "w-[110px]"
  },
  {
    id: "12",
    label: "play to earn games",
    type: "play_to_earn",
    className: "w-[166px]"
  }
]
export const P2EHeaderMenu: IHeaderSlide = {
  icon: "",
  title: "play to earn",
  menuList: p2eMenu,
  theme: "error"
}

const f2pMenu: ISlideList[] = [
  {
    id: "13",
    label: "free mode",
    type: "free_mode",
    className: "w-[110px]"
  },
  {
    id: "14",
    label: "story mode",
    type: "story_mode",
    className: "w-[166px]"
  },
  {
    id: "15",
    label: "must try",
    type: "must_try",
    className: "w-[166px]"
  }
]

export const F2PHeaderMenu: IHeaderSlide = {
  icon: "",
  title: "free to earn",
  menuList: f2pMenu,
  theme: "secondary"
}
export const GAME_DOWNLOAD: IGameDownloadSlide[] = [
  {
    name: "Escape",
    image: "/assets/images/games/coming_soon/escape.png",
    description: "Escape from the prison",
    link: "https://play.google.com/store/apps/details?id=com.nakama.escape"
  },
  {
    name: "Duck Hunter",
    image: "/assets/images/games/coming_soon/duckhunter.png",
    description: "An exciting twist on a favorite retro game",
    link: "https://play.google.com/store/apps/details?id=com.nakama.duckhunter"
  },
  {
    name: "NAKA Runner",
    image: "/assets/images/games/coming_soon/nakarunner.png",
    description: "Move without stopping. You can do it!",
    link: "https://play.google.com/store/apps/details?id=com.nakama.nakarunner"
  }
]
