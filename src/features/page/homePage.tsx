import IconFree from "@components/icons/freeIcon"
import IconNakaWorld from "@components/icons/nakaWorldIcon"
import GameCarousel from "@components/molecules/gameSlide/GameCarousel"
import Tagline from "@components/molecules/tagline/Tagline"
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
    <Tagline
      bgColor="bg-secondary-main"
      textColor="text-white-default"
      text="Secue. fun. simple. earn $naka AND enjoy "
      alt="logo_master"
      src="/assets/icons/logo_master.png"
      width={24}
      height={24}
    />
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
    </div>
    <Tagline
      bgColor="bg-info-main"
      textColor="text-neutral-800 font-bold"
      text="Show your God Mode for the blockchain gaming landscape"
      alt="logo_shape"
      src="/assets/icons/logo_shape.png"
      width={24}
      height={24}
    />
  </>
)
export default memo(Home)
