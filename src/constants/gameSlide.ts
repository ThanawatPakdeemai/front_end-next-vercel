import Helper from "@utils/helper"
import CONFIGS from "@configs/index"

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