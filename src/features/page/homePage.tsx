import IconFree from "@components/icons/freeIcon"
import IconNakaWorld from "@components/icons/nakaWorldIcon"
import BodyCategories from "@components/molecules/BodyCategories"
import GameCarousel from "@components/molecules/gameSlide/GameCarousel"
import {
  F2PHeaderMenu,
  mockF2PGame,
  mockP2EGame,
  P2EHeaderMenu
} from "@constants/gameSlide"
import DeveloperPart from "@feature/home/components/template/DeveloperPart"
import BannerSlide from "@feature/slider/components/templates/BannerSlide"
import CarouselSlide from "@feature/slider/components/templates/CarouselSlide"
import { memo } from "react"

const Home = () => (
  <>
    <BannerSlide />
    {/* Testing display a CarouselSlide component, waiting to merge with team */}
    <div className="grid grid-cols-2 gap-6">
      <></>
      <CarouselSlide />
    </div>
    <DeveloperPart />
    <div className="my-20 h-full w-full">
      <GameCarousel
        list={mockF2PGame}
        tag={F2PHeaderMenu.title}
        headerMenu={F2PHeaderMenu.menuList}
        theme={F2PHeaderMenu.theme}
        checkTimer
        headerIcon={
          <IconFree
            width={200}
            height={100}
          />
        }
      />
    </div>
    <div className="my-20 h-full w-full">
      <GameCarousel
        list={mockP2EGame}
        showNo
        tag={P2EHeaderMenu.title}
        headerMenu={P2EHeaderMenu.menuList}
        theme={P2EHeaderMenu.theme}
        headerIcon={
          <IconNakaWorld
            width={180}
            height={125}
          />
        }
      />
      <BodyCategories />
    </div>
  </>
)
export default memo(Home)
