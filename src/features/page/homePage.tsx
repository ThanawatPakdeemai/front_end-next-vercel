import IconFree from "@components/icons/freeIcon"
import LogoIcon from "@components/icons/LogoIcon"
import IconNakaWorld from "@components/icons/nakaWorldIcon"
import ShapeIcon from "@components/icons/ShapeIcon"
import BodyCategories from "@components/molecules/BodyCategories"
import Dropdown from "@components/molecules/Dropdown"
import GameCarousel, {
  ISlide
} from "@components/molecules/gameSlide/GameCarousel"
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
import { memo, useEffect, useState } from "react"

const Home = () => {
  const [f2pGame, setF2PGame] = useState<ISlide[]>(mockF2PGame)
  const [f2pCurType, setF2PCurType] = useState<string>(
    F2PHeaderMenu.menuList[0].type
  )
  const [p2eGame, setP2EGame] = useState<ISlide[]>(mockP2EGame)
  const [p2eCurType, setP2ECurType] = useState<string>(
    P2EHeaderMenu.menuList[0].type
  )

  const fetchF2PGame = async () => {
    // serivce
    const result = mockF2PGame
    setF2PGame(result)
  }

  const fetchF2PStoryMode = async () => {
    // serivce
    const result = mockF2PGame.filter((fp2) => fp2.id > 3).reverse()
    setF2PGame(result)
  }

  const fetchF2PMustTry = async () => {
    // serivce
    const result = mockF2PGame.filter((fp2) => fp2.id > 3)
    setF2PGame(result)
  }
  const fetchP2EHotGame = async () => {
    // serive
    const result = mockP2EGame.filter((p2e) => p2e.id < 5)
    setP2EGame(result)
  }

  const fetchP2EGame = async () => {
    // serive
    const result = mockP2EGame
    setP2EGame(result)
  }

  useEffect(() => {
    if (f2pCurType === "story_mode") {
      fetchF2PStoryMode()
    } else if (f2pCurType === "must_try") {
      fetchF2PMustTry()
    } else {
      fetchF2PGame()
    }
  }, [f2pCurType])

  useEffect(() => {
    if (p2eCurType === "play_to_earn") {
      fetchP2EGame()
    } else {
      fetchP2EHotGame()
    }
  }, [p2eCurType])

  return (
    <>
      <BannerSlide />
      {/* Testing display a CarouselSlide component, waiting to merge with team */}
      {/* <Dropdown
        title="Dropdown"
        className="w-[150px]"
      />
      <Dropdown
        title="Test"
        className="w-[300px]"
      /> */}
      <Tagline
        bgColor="bg-secondary-main"
        textColor="text-white-default"
        text="Secue. fun. simple. earn $naka AND enjoy "
        icon={<LogoIcon />}
      />

      <div className="grid grid-cols-2 gap-6">
        <></>
        <CarouselSlide />
      </div>

      <DeveloperPart />

      <div className="my-20 h-full w-full">
        <GameCarousel
          list={f2pGame}
          tag={F2PHeaderMenu.title}
          headerMenu={F2PHeaderMenu.menuList}
          theme={F2PHeaderMenu.theme}
          stickerRotate={F2PHeaderMenu.stickerRotate}
          checkTimer
          curType={f2pCurType}
          setCurType={setF2PCurType}
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
          list={p2eGame}
          showNo
          tag={P2EHeaderMenu.title}
          headerMenu={P2EHeaderMenu.menuList}
          theme={P2EHeaderMenu.theme}
          stickerRotate={P2EHeaderMenu.stickerRotate}
          curType={p2eCurType}
          setCurType={setP2ECurType}
          headerIcon={
            <IconNakaWorld
              width={180}
              height={125}
            />
          }
        />
      </div>
      <Tagline
        bgColor="bg-green-lemon"
        textColor="text-neutral-800 font-bold"
        text="Show your God Mode for the blockchain gaming landscape"
        icon={<ShapeIcon />}
      />
      <BodyCategories />
    </>
  )
}
export default memo(Home)
