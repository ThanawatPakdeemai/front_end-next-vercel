/* eslint-disable no-nested-ternary */
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
import { Box } from "@mui/material"
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
import useGlobal, { isMobile } from "@hooks/useGlobal"
import CardLinkTemplate from "@components/templates/contents/CardLinkTemplate"
import CONFIGS from "@configs/index"
import OrionTrade from "@components/organisms/OrionTrade"
import DeveloperPart from "@feature/home/components/template/DeveloperPart"
import useGamePageListController from "@feature/game/containers/hooks/useGamePageListController"
import { useTranslation } from "react-i18next"
import OnPlayingStyle2 from "@feature/home/components/molecules/OnPlayingStyle2"
import HomeMobile from "@mobile/features/pages/HomeMobile"

export const getGameTypeF2EByTitleClicked = (f2pCurType): IGetType => {
  switch (f2pCurType) {
    case "free-to-earn-games":
      return "free-to-play-games"
    case "story-mode-games":
      return "storymode"
    default:
      return f2pCurType
  }
}

export const getGameTypeP2EByTitleClicked = (p2eCurType): IGetType => {
  switch (p2eCurType) {
    case "arcade-emporium":
      return "arcade-emporium"
    default:
      return "play-to-earn-games"
  }
}
const Home = () => {
  // const limit = 10
  const { profile } = useProfileStore()
  const { clearQuestStore, setOpen, hasCompleted } = useQuestStore()
  const {
    hydrated,
    isFreeToEarnGame,
    isFreeToPlayGame,
    isStoryModeGame,
    limit
  } = useGlobal()
  const [openSwap, setOpenSwap] = useState(false)
  const { t } = useTranslation()

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
  const [f2eGame, setF2EGame] = useState<IGame[]>()
  const [storyModeGame, setStoryModeGame] = useState<IGame[]>()
  const [f2pCurType, setF2PCurType] = useState<IGetType>("free-to-earn-games")

  const [p2eGame, setP2EGame] = useState<IGame[]>()
  const [p2eCurType, setP2ECurType] = useState<IGetType>("play-to-earn-games")

  // const { hotGameData } = useGetHotGames()
  const { gameFilter: dataF2pGames, loadingFilterGame: loadingDataF2pGames } =
    useGamePageListController(
      getGameTypeF2EByTitleClicked(f2pCurType),
      "all",
      p2eCurType === "story-mode-games" ? limit : 9999
    )
  const { gameFilter: dataP2eGame, loadingFilterGame: loadingDataP2eGame } =
    useGamePageListController(getGameTypeP2EByTitleClicked(p2eCurType))

  useEffect(() => {
    let load = false

    if (!load) {
      if (dataF2pGames) {
        const _filterF2E = dataF2pGames.filter((item) => isFreeToEarnGame(item))
        setF2EGame(_filterF2E)
        const _filterF2P = dataF2pGames.filter((item) => isFreeToPlayGame(item))
        setF2PGame(_filterF2P)
        const _filterStoryMode = dataF2pGames.filter((item) =>
          isStoryModeGame(item)
        )
        setStoryModeGame(_filterStoryMode)
      }
      if (dataP2eGame) {
        setP2EGame(dataP2eGame)
      }
    }

    return () => {
      load = true
    }
    // TODO - Boy check loop setState
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    // isFreeToEarnGame,
    // isFreeToPlayGame,
    // isStoryModeGame,
    dataF2pGames,
    f2pCurType,
    p2eCurType,
    dataP2eGame,
    loadingDataF2pGames,
    loadingDataP2eGame
  ])

  return hydrated ? (
    <>
      {isMobile ? (
        <HomeMobile />
      ) : (
        <>
          <BannerSlide />
          <div className="relative">
            <Tagline
              bgColor="bg-secondary-main"
              textColor="text-white-default"
              text={t("main_tagline")}
              icon={<LogoIcon />}
              show={false}
            />
            {/* notification */}
            {profile && profile.data && (
              <div className="fixed bottom-5 right-4 z-10 flex flex-col items-center justify-center">
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
          <div className="flex flex-wrap gap-3 md:flex-nowrap">
            <Box
              component="div"
              className="flex flex-[1_1_100%] flex-col gap-3 sm:flex-[1_1_60%] xl:flex-1"
            >
              <CardMarketplace href={CONFIGS.BASE_URL.MARKETPLACE} />
              <Box
                component="div"
                className="flex justify-between gap-3"
                sx={{
                  "picture": {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }
                }}
              >
                <CardLinkTemplate>
                  <CardLink
                    classNameSecond="!bg-red-card"
                    imageClassNameSecond="scale-[1.35]"
                    iconBtn={<INakaSwap />}
                    textBtn={`${t("naka_swap")}`}
                    onClick={() => setOpenSwap(true)}
                    srcMain={IMAGES.frontNakaSwap.src}
                    srcMainWebp={IMAGES.frontNakaSwap.srcWebp}
                    altMain={IMAGES.frontNakaSwap.alt}
                    srcSecond={IMAGES.backNakaSwap.src}
                    srcSecondWebp={IMAGES.backNakaSwap.srcWebp}
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
                    textBtn={`${t("Staking")}`}
                    href="/staking"
                    srcMain={IMAGES.frontStaking.src}
                    srcMainWebp={IMAGES.frontStaking.srcWebp}
                    altMain={IMAGES.frontStaking.alt}
                    srcSecond={IMAGES.backStaking.src}
                    srcSecondWebp={IMAGES.backStaking.srcWebp}
                    altSecond={IMAGES.backStaking.alt}
                  />
                </CardLinkTemplate>
                <CardLinkTemplate>
                  <CardLink
                    classNameSecond="bg-info-light"
                    imageClassNameSecond="scale-[1.35]"
                    iconBtn={<IReferrals />}
                    textBtn={`${t("referral")}`}
                    href="/referral"
                    srcMain={IMAGES.frontReferrals.src}
                    srcMainWebp={IMAGES.frontReferrals.srcWebp}
                    altMain={IMAGES.frontReferrals.alt}
                    srcSecond={IMAGES.backReferrals.src}
                    srcSecondWebp={IMAGES.backReferrals.srcWebp}
                    altSecond={IMAGES.backReferrals.alt}
                  />
                </CardLinkTemplate>
              </Box>
            </Box>
            <div className="relative flex-[1_1_100%] overflow-hidden sm:flex-[1_1_60%] xl:flex-1">
              <div
                id="spark-fire"
                className="absolute left-0 top-0 hidden h-[calc(100%-100px)] w-full xl:block"
              />
              <CarouselSlide
                slideGames={GAME_DOWNLOAD}
                isLoading={false}
              />
            </div>
          </div>

          <div className="my-2 h-full w-full lg:mt-10 xl:mt-[140px]">
            {!loadingDataF2pGames && f2pGame && f2eGame && storyModeGame ? (
              <GameCarousel
                menu={F2PHeaderMenu}
                list={
                  f2pCurType === "free-to-earn-games"
                    ? f2eGame
                    : f2pCurType === "story-mode-games"
                    ? storyModeGame
                    : f2pGame
                }
                curType={f2pCurType}
                setCurType={setF2PCurType}
                checkTimer
                onPlaying={false}
              />
            ) : (
              <div className="grid grid-cols-2 gap-x-3 lg:flex">
                {[...Array(6)].map(() => (
                  <SkeletonCard key={uuid()} />
                ))}
              </div>
            )}
          </div>

          <div className="h-loadingFreeToPlayGames my-2 w-full lg:mt-10 xl:mt-[100px]">
            {p2eGame && !loadingDataP2eGame ? (
              <GameCarousel
                menu={P2EHeaderMenu}
                list={p2eGame.filter(
                  (_item) => _item.play_to_earn_status === "in_progress"
                )}
                curType={p2eCurType}
                setCurType={setP2ECurType}
                showNo
                onPlaying={false}
              />
            ) : (
              <div className="grid grid-cols-2 gap-x-3 md:grid-cols-3 lg:flex lg:grid-cols-4 ">
                {[...Array(6)].map(() => (
                  <SkeletonCard key={uuid()} />
                ))}
              </div>
            )}
          </div>

          <Tagline
            bgColor="bg-green-lemon"
            textColor="text-neutral-800 font-bold"
            text={t("switch_to_godmode")}
            icon={<ShapeIcon />}
            show={false}
          />

          <BodyCategories />
          {/* <OnPlaying /> */}
          <OnPlayingStyle2 isSlider={false} />
          <DeveloperPart />
          <Box
            component="div"
            className="xs:flex-col mb-10 mt-4 gap-3 lg:flex"
          >
            <Box
              component="div"
              className="flex w-full flex-wrap justify-between gap-3"
              sx={{
                "picture": {
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }
              }}
            >
              <CardLinkTemplate>
                <CardLink
                  classNameSecond="bg-warning-dark"
                  textBtn={`${t("Blog")}`}
                  href="/blog"
                />
              </CardLinkTemplate>
              <CardLinkTemplate>
                <CardLink
                  classNameSecond="bg-secondary-light"
                  iconBtn={<ICoupon />}
                  textBtn={`${t("Coupons")}`}
                  href="/coupon"
                  srcMain={IMAGES.frontCouponBand.src}
                  srcMainWebp={IMAGES.frontCouponBand.srcWebp}
                  altMain={IMAGES.frontCouponBand.alt}
                  srcSecond={IMAGES.backCouponBand.src}
                  srcSecondWebp={IMAGES.backCouponBand.srcWebp}
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
                  srcMainWebp={IMAGES.homeNakaNFT.srcWebp}
                  altMain={IMAGES.homeNakaNFT.alt}
                  srcSecond={IMAGES.backHomeNakaNFT.src}
                  srcSecondWebp={IMAGES.backHomeNakaNFT.srcWebp}
                  altSecond={IMAGES.backHomeNakaNFT.alt}
                />
              </CardLinkTemplate>
            </Box>
            <Box
              component="div"
              className="mt-2 flex-1 sm:mt-4 md:max-w-full lg:mt-0"
            >
              <CardNakaverse href={CONFIGS.BASE_URL.NAKAVERSE} />
            </Box>
          </Box>
        </>
      )}
    </>
  ) : (
    <></>
  )
}
export default memo(Home)
