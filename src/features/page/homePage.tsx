import React, { memo, useEffect, useState } from "react"
import LogoIcon from "@components/icons/LogoIcon"
import SupportIcon from "@components/icons/MenunIcon/SupportIcon"
import ShapeIcon from "@components/icons/ShapeIcon"
import BodyCategories from "@components/molecules/BodyCategories"
import ButtonSticky from "@components/molecules/ButtonSticky"
import GameCarousel from "@components/molecules/gameSlide/GameCarousel"
import Tagline from "@components/molecules/tagline/Tagline"
import { F2PHeaderMenu, P2EHeaderMenu } from "@constants/gameSlide"
import DeveloperPart from "@feature/home/components/template/DeveloperPart"
import BannerSlide from "@feature/slider/components/templates/BannerSlide"
import CarouselSlide from "@feature/slider/components/templates/CarouselSlide"
import CardMarketplace from "@components/molecules/CardMarketplace"
import CardNakaverse from "@components/molecules/CardNakaverse"
import { Box } from "@mui/material"
import ICoupon from "@components/icons/Coupon"
import IDiamond from "@components/icons/Diamond"
import { IMAGES } from "@constants/images"
import CardLink from "@components/molecules/CardLink"
import INakaSwap from "@components/icons/NakaSwap"
import IStacking from "@components/icons/Stacking"
import IReferrals from "@components/icons/Referrals"
import useGetHotGames from "@feature/game/containers/hooks/useGetHotGames"
import { IGame, IGetType } from "@feature/game/interfaces/IGameService"
import useGamesByTypes from "@feature/game/containers/hooks/useGamesByTypes"
import useGameStore from "@stores/game"

const Home = () => {
  const [f2pGame, setF2PGame] = useState<IGame[]>()
  const [f2pCurType, setF2PCurType] = useState<IGetType>("free-to-play")

  const [p2eGame, setP2EGame] = useState<IGame[]>()
  const [p2eCurType, setP2ECurType] = useState<IGetType>("hot-game")

  const { data: gameStoreData, clearGameData } = useGameStore()

  const { hotGameData } = useGetHotGames()
  const { data: p2eGameData } = useGamesByTypes({
    _type: p2eCurType,
    _limit: 10,
    _page: 1
  })

  const { data: f2pGameData } = useGamesByTypes({
    _type: f2pCurType,
    _limit: 10,
    _page: 1
  })

  useEffect(() => {
    if (gameStoreData) {
      clearGameData()
    }
  }, [clearGameData, gameStoreData])

  useEffect(() => {
    if (f2pGameData) {
      setF2PGame(f2pGameData.data)
    }
  }, [f2pCurType, f2pGameData, p2eGameData])

  useEffect(() => {
    if (p2eCurType === "hot-game") {
      if (hotGameData) {
        setP2EGame(hotGameData.data)
      }
    } else if (p2eCurType === "play-to-earn") {
      if (p2eGameData) {
        setP2EGame(p2eGameData.data)
      }
    }
  }, [p2eCurType, hotGameData, p2eGameData])

  return (
    <>
      <BannerSlide />
      {/* Testing display a CarouselSlide component, waiting to merge with team */}
      <div className="relative">
        <Tagline
          bgColor="bg-secondary-main"
          textColor="text-white-default"
          text="Secue. fun. simple. earn $naka AND enjoy "
          icon={<LogoIcon />}
        />
        <div className="absolute top-[-50%] right-[-10%] z-[5] flex flex-col items-center justify-center">
          <ButtonSticky icon={<SupportIcon />} />
          <ButtonSticky
            multi
            notify
          />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Box>
          <CardMarketplace />
          <div className="mt-4 grid grid-cols-3 gap-6">
            <CardLink
              classNameSecond="bg-red-card"
              imageClassNameSecond="scale-[1.35]"
              iconBtn={<INakaSwap />}
              textBtn="NAKA Swap"
              href="/"
              srcMain={IMAGES.frontNakaSwap.src}
              altMain={IMAGES.frontNakaSwap.alt}
              srcSecond={IMAGES.backNakaSwap.src}
              altSecond={IMAGES.backNakaSwap.alt}
            />
            <CardLink
              classNameSecond="bg-warning-dark"
              imageClassNameSecond="scale-[1.35]"
              iconBtn={<IStacking />}
              textBtn="Staking"
              href="/"
              srcMain={IMAGES.frontStaking.src}
              altMain={IMAGES.frontStaking.alt}
              srcSecond={IMAGES.backStaking.src}
              altSecond={IMAGES.backStaking.alt}
            />
            <CardLink
              classNameSecond="bg-info-light"
              imageClassNameSecond="scale-[1.35]"
              iconBtn={<IReferrals />}
              textBtn="Referrals"
              href="/"
              srcMain={IMAGES.frontReferrals.src}
              altMain={IMAGES.frontReferrals.alt}
              srcSecond={IMAGES.backReferrals.src}
              altSecond={IMAGES.backReferrals.alt}
            />
          </div>
        </Box>
        <CarouselSlide />
      </div>

      <div className="my-20 h-full w-full">
        {f2pGame ? (
          <GameCarousel
            menu={F2PHeaderMenu}
            list={f2pGame}
            curType={f2pCurType}
            setCurType={setF2PCurType}
            checkTimer
          />
        ) : (
          "loading..."
        )}
      </div>

      <div className="my-20 h-full w-full">
        {p2eGame ? (
          <GameCarousel
            menu={P2EHeaderMenu}
            list={p2eGame}
            curType={p2eCurType}
            setCurType={setP2ECurType}
            showNo
          />
        ) : (
          "loading..."
        )}
      </div>

      <Tagline
        bgColor="bg-green-lemon"
        textColor="text-neutral-800 font-bold"
        text="Show your God Mode for the blockchain gaming landscape"
        icon={<ShapeIcon />}
      />

      <BodyCategories />

      <DeveloperPart />
      <Box className="xs:flex-col mt-4 mb-10 gap-3 lg:flex">
        <Box className="xs:grid-cols-1 mb-3 grid gap-3 sm:grid-cols-2 lg:mb-0 lg:grid-cols-3">
          <CardLink
            textBtn="View All"
            href="/"
          />

          <CardLink
            classNameSecond="bg-secondary-light"
            iconBtn={<ICoupon />}
            textBtn="Coupon"
            href="/"
            srcMain={IMAGES.frontCouponBand.src}
            altMain={IMAGES.frontCouponBand.alt}
            srcSecond={IMAGES.backCouponBand.src}
            altSecond={IMAGES.backCouponBand.alt}
          />

          <CardLink
            classNameSecond="bg-info-light"
            iconBtn={<IDiamond />}
            textBtn="NAKA NFT"
            href="/"
            srcMain={IMAGES.frontNakaBand.src}
            altMain={IMAGES.frontNakaBand.alt}
            srcSecond={IMAGES.backNakaBand.src}
            altSecond={IMAGES.backNakaBand.alt}
          />
        </Box>

        <CardNakaverse href="/" />
      </Box>
    </>
  )
}
export default memo(Home)
