import React, { memo, useEffect, useState } from "react"
import LogoIcon from "@components/icons/LogoIcon"
import SupportIcon from "@components/icons/MenunIcon/SupportIcon"
import ShapeIcon from "@components/icons/ShapeIcon"
import BodyCategories from "@components/molecules/BodyCategories"
import ButtonSticky from "@components/molecules/ButtonSticky"
import GameCarousel from "@components/molecules/gameSlide/GameCarousel"
import Tagline from "@components/molecules/tagline/Tagline"
import {
  F2PHeaderMenu,
  GAME_DOWNLOAD,
  P2EHeaderMenu
} from "@constants/gameSlide"
import BannerSlide from "@feature/slider/components/templates/BannerSlide"
import CarouselSlide from "@feature/slider/components/templates/CarouselSlide"
import CardMarketplace from "@components/molecules/CardMarketplace"
import CardNakaverse from "@components/molecules/CardNakaverse"
import { Box, Grid } from "@mui/material"
import ICoupon from "@components/icons/Coupon"
import IDiamond from "@components/icons/Diamond"
import { IMAGES } from "@constants/images"
import CardLink from "@components/molecules/CardLink"
import INakaSwap from "@components/icons/NakaSwap"
import IStacking from "@components/icons/Stacking"
import IReferrals from "@components/icons/Referrals"
import { IGame, IGetType } from "@feature/game/interfaces/IGameService"
import SkeletonCard from "@components/atoms/skeleton/SkeletonCard"
import { v4 as uuid } from "uuid"
import useTweenEffect from "@hooks/useSpartFireEffect"
import useProfileStore from "@stores/profileStore"
import useQuestStore from "@stores/quest"
import { MenuLists } from "@configs/social"
import useGlobal from "@hooks/useGlobal"
import CardLinkTemplate from "@components/templates/contents/CardLinkTemplate"
import CONFIGS from "@configs/index"
import OrionTrade from "@components/organisms/OrionTrade"
import OnPlaying from "@feature/home/components/molecules/OnPlaying"
import DeveloperPart from "@feature/home/components/template/DeveloperPart"
import useGamePageListController from "@feature/game/containers/hooks/useGamePageListController"

const Home = () => {
  // const limit = 10
  const { profile } = useProfileStore()
  const { clearQuestStore, setOpen, hasCompleted } = useQuestStore()
  const { hydrated } = useGlobal()
  const [openSwap, setOpenSwap] = useState(false)
  /**
   * @description: Spark fire effect
   */
  const { createParticle } = useTweenEffect(600, 300, 50, -500)
  useEffect(() => {
    let load = false

    if (!load) {
      if (hydrated) createParticle()
    }

    return () => {
      load = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hydrated])

  const handleModalMission = () => {
    setOpen()
    clearQuestStore()
  }

  const [f2pGame, setF2PGame] = useState<IGame[]>()
  const [f2pCurType, setF2PCurType] = useState<IGetType>("free-to-play-games")

  const [p2eGame, setP2EGame] = useState<IGame[]>()
  const [p2eCurType, setP2ECurType] = useState<IGetType>("play-to-earn-games")

  const getGameTypeF2EByTitleClicked = (): IGetType => {
    switch (f2pCurType) {
      case "story-mode-games":
        return "storymode"
      default:
        return f2pCurType
    }
  }

  const getGameTypeP2EByTitleClicked = (): IGetType => {
    switch (p2eCurType) {
      case "arcade-emporium":
        // TODO: choose to change to hot-game
        return "arcade-emporium"
      default:
        return "play-to-earn-games"
    }
  }

  // const { hotGameData } = useGetHotGames()
  const { gameFilter: dataF2pGames, loadingFilterGame: loadingDataF2pGames } =
    useGamePageListController(getGameTypeF2EByTitleClicked())
  const { gameFilter: dataP2eGame, loadingFilterGame: loadingDataP2eGame } =
    useGamePageListController(getGameTypeP2EByTitleClicked())

  useEffect(() => {
    let load = false

    if (!load) {
      if (dataF2pGames) {
        setF2PGame(dataF2pGames)
      }
      if (dataP2eGame) {
        setP2EGame(dataP2eGame)
      }
    }

    return () => {
      load = true
    }
  }, [
    dataF2pGames,
    f2pCurType,
    p2eCurType,
    dataP2eGame,
    loadingDataF2pGames,
    loadingDataP2eGame
  ])

  return hydrated ? (
    <>
      <BannerSlide />
      {/* Testing display a CarouselSlide component, waiting to merge with team */}
      <div className="relative">
        <Tagline
          bgColor="bg-secondary-main"
          textColor="text-white-default"
          text="SECURE. SUBLIME. SIMPLE. EARN $NAKA TODAY. "
          icon={<LogoIcon />}
        />
        {/* notification */}
        {profile && profile.data && (
          <div className="fixed right-4 bottom-5 z-10 flex flex-col items-center justify-center">
            <ButtonSticky
              icon={<SupportIcon />}
              onClick={() => {
                window.open(MenuLists[0].href, "_blank")
              }}
            />
            <ButtonSticky
              multi
              notify={hasCompleted}
              onClick={handleModalMission}
            />
          </div>
        )}
      </div>
      <div className="flex grid-cols-1 flex-wrap gap-6 lg:grid lg:grid-cols-2">
        <Box className="flex-[1_1_100%] sm:flex-[1_1_60%] xl:flex-none">
          <CardMarketplace href={CONFIGS.BASE_URL.MARKETPLACE} />
          <div className="mt-4">
            <Grid
              container
              spacing={2}
            >
              <CardLinkTemplate>
                <CardLink
                  classNameSecond="!bg-red-card"
                  imageClassNameSecond="scale-[1.35]"
                  iconBtn={<INakaSwap />}
                  textBtn="NAKA Swap"
                  onClick={() => setOpenSwap(true)}
                  srcMain={IMAGES.frontNakaSwap.src}
                  altMain={IMAGES.frontNakaSwap.alt}
                  srcSecond={IMAGES.backNakaSwap.src}
                  altSecond={IMAGES.backNakaSwap.alt}
                />
                <OrionTrade
                  open={openSwap}
                  setClose={() => setOpenSwap(false)}
                />
              </CardLinkTemplate>
              <CardLinkTemplate>
                <CardLink
                  classNameSecond="!bg-warning-dark"
                  imageClassNameSecond="scale-[1.35]"
                  iconBtn={<IStacking />}
                  textBtn="Staking"
                  href="/staking"
                  srcMain={IMAGES.frontStaking.src}
                  altMain={IMAGES.frontStaking.alt}
                  srcSecond={IMAGES.backStaking.src}
                  altSecond={IMAGES.backStaking.alt}
                />
              </CardLinkTemplate>
              <CardLinkTemplate>
                <CardLink
                  classNameSecond="bg-info-light"
                  imageClassNameSecond="scale-[1.35]"
                  iconBtn={<IReferrals />}
                  textBtn="Referral"
                  href="/referral"
                  srcMain={IMAGES.frontReferrals.src}
                  altMain={IMAGES.frontReferrals.alt}
                  srcSecond={IMAGES.backReferrals.src}
                  altSecond={IMAGES.backReferrals.alt}
                />
              </CardLinkTemplate>
            </Grid>
          </div>
        </Box>
        <div className="relative flex-[1_1_100%] overflow-hidden sm:flex-[1_1_60%] xl:flex-none">
          <div
            id="spark-fire"
            className="absolute top-0 left-0 hidden h-[calc(100%-100px)] w-full xl:block"
          />
          <CarouselSlide
            slideGames={GAME_DOWNLOAD}
            isLoading={false}
          />
        </div>
      </div>

      <div className="my-2 h-full w-full lg:my-20">
        {f2pGame && !loadingDataF2pGames ? (
          <GameCarousel
            menu={F2PHeaderMenu}
            list={f2pGame}
            curType={f2pCurType}
            setCurType={setF2PCurType}
            checkTimer
          />
        ) : (
          <div className="flex gap-x-3">
            {[...Array(6)].map(() => (
              <SkeletonCard key={uuid()} />
            ))}
          </div>
        )}
      </div>

      <div className="h-loadingFreeToPlayGames my-2 w-full lg:my-20">
        {p2eGame && !loadingDataP2eGame ? (
          <GameCarousel
            menu={P2EHeaderMenu}
            list={p2eGame}
            curType={p2eCurType}
            setCurType={setP2ECurType}
            showNo
          />
        ) : (
          <div className="flex gap-x-3">
            {[...Array(6)].map(() => (
              <SkeletonCard key={uuid()} />
            ))}
          </div>
        )}
      </div>

      <Tagline
        bgColor="bg-green-lemon"
        textColor="text-neutral-800 font-bold"
        text="SWITCH TO GOD MODE AND UNLEASH YOUR TRUE GAMING POTENTIAL"
        icon={<ShapeIcon />}
      />

      <BodyCategories />
      <OnPlaying />
      <DeveloperPart />
      <Box className="xs:flex-col mt-4 mb-10 gap-4 lg:flex">
        <Box className="flex-1 xl:flex-none">
          <Grid
            container
            spacing={2}
          >
            <CardLinkTemplate>
              <CardLink
                classNameSecond="bg-warning-dark"
                textBtn="Blog"
                href="/blog"
              />
            </CardLinkTemplate>
            <CardLinkTemplate>
              <CardLink
                classNameSecond="bg-secondary-light"
                iconBtn={<ICoupon />}
                textBtn="Coupon"
                href="/coupon"
                srcMain={IMAGES.frontCouponBand.src}
                altMain={IMAGES.frontCouponBand.alt}
                srcSecond={IMAGES.backCouponBand.src}
                altSecond={IMAGES.backCouponBand.alt}
              />
            </CardLinkTemplate>

            <CardLinkTemplate>
              <CardLink
                classNameSecond="bg-info-light"
                iconBtn={<IDiamond />}
                textBtn="NAKA NFT"
                href="/arcade-emporium"
                srcMain={IMAGES.homeNakaNFT.src}
                altMain={IMAGES.homeNakaNFT.alt}
                srcSecond={IMAGES.backHomeNakaNFT.src}
                altSecond={IMAGES.backHomeNakaNFT.alt}
              />
            </CardLinkTemplate>
          </Grid>
        </Box>
        <Box className="mt-2 flex-1 sm:mt-4 md:max-w-full lg:mt-0 lg:max-w-[33.33%] xl:flex-none">
          <CardNakaverse href={CONFIGS.BASE_URL.NAKAVERSE} />
        </Box>
      </Box>
    </>
  ) : (
    <></>
  )
}
export default memo(Home)
