/* eslint-disable no-nested-ternary */
import React, { memo, useEffect, useState } from "react"
import { v4 as uuid } from "uuid"
import { useTranslation } from "react-i18next"
import dynamic from "next/dynamic"
import Box from "@mui/material/Box"
import {
  F2PHeaderMenu,
  GAME_DOWNLOAD,
  P2EHeaderMenu
} from "@constants/gameSlide"
import { IMAGES } from "@constants/images"
import { IGame, IGetType } from "@feature/game/interfaces/IGameService"
import useProfileStore from "@stores/profileStore"
import useQuestStore from "@stores/quest"
import { MenuLists } from "@configs/social"
import useGlobal from "@hooks/useGlobal"
import CONFIGS from "@configs/index"
import useGamePageListController from "@feature/game/containers/hooks/useGamePageListController"

const OnPlayingStyle2 = dynamic(
  () => import("@feature/home/components/molecules/OnPlayingStyle2"),
  {
    suspense: true,
    ssr: false
  }
)
const BodyCategories = dynamic(
  () => import("@components/molecules/BodyCategories"),
  {
    suspense: true,
    ssr: false
  }
)
const ButtonSticky = dynamic(
  () => import("@components/molecules/ButtonSticky"),
  {
    suspense: true,
    ssr: false
  }
)
const GameCarousel = dynamic(
  () => import("@components/molecules/gameSlide/GameCarousel"),
  {
    suspense: true,
    ssr: false
  }
)
const BannerSlide = dynamic(
  () => import("@feature/slider/components/templates/BannerSlide"),
  {
    suspense: true,
    ssr: false
  }
)
const CarouselSlide = dynamic(
  () => import("@feature/slider/components/templates/CarouselSlide"),
  {
    suspense: true,
    ssr: false
  }
)
const CardMarketplace = dynamic(
  () => import("@components/molecules/CardMarketplace"),
  {
    suspense: true,
    ssr: false
  }
)
const CardNakaverse = dynamic(
  () => import("@components/molecules/CardNakaverse"),
  {
    suspense: true,
    ssr: false
  }
)
const Icomoon = dynamic(() => import("@components/atoms/icomoon/Icomoon"), {
  suspense: true,
  ssr: false
})
const CardLink = dynamic(() => import("@components/molecules/CardLink"), {
  suspense: true,
  ssr: false
})
const SkeletonCard = dynamic(
  () => import("@components/atoms/skeleton/SkeletonCard"),
  {
    suspense: true,
    ssr: false
  }
)
const CardLinkTemplate = dynamic(
  () => import("@components/templates/contents/CardLinkTemplate"),
  {
    suspense: true,
    ssr: false
  }
)
const OrionTrade = dynamic(() => import("@components/organisms/OrionTrade"), {
  suspense: true,
  ssr: false
})
const DeveloperPart = dynamic(
  () => import("@feature/home/components/template/DeveloperPart"),
  {
    suspense: true,
    ssr: false
  }
)

const Home = () => {
  const { profile } = useProfileStore()
  const { clearQuestStore, setOpen, hasCompleted } = useQuestStore()
  const { hydrated, isFreeToEarnGame, isFreeToPlayGame, isStoryModeGame } =
    useGlobal()

  const [openSwap, setOpenSwap] = useState(false)
  const { t } = useTranslation()

  const handleModalMission = () => {
    setOpen()
    clearQuestStore()
  }

  const [f2pGame, setF2PGame] = useState<IGame[]>()
  const [f2eGame, setF2EGame] = useState<IGame[]>()
  const [storyModeGame, setStoryModeGame] = useState<IGame[]>()
  const [f2pCurType, setF2PCurType] = useState<IGetType>("free-to-earn")

  const [p2eGame, setP2EGame] = useState<IGame[]>()
  const [p2eCurType, setP2ECurType] = useState<IGetType>("play-to-earn")

  // const { hotGameData } = useGetHotGames()
  const { gameFilter: dataF2pGames, loadingFilterGame: loadingDataF2pGames } =
    useGamePageListController(f2pCurType)
  const { gameFilter: dataP2eGame, loadingFilterGame: loadingDataP2eGame } =
    useGamePageListController(p2eCurType)

  useEffect(() => {
    let load = false

    if (!load) {
      if (dataF2pGames) {
        const _filterF2E = dataF2pGames.filter((item) => isFreeToEarnGame(item))
        if (f2pCurType === "free-to-earn" && _filterF2E.length === 0) {
          setF2PCurType("free-to-play")
        }
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <div className="relative">
        {/* notification */}
        {profile && profile.data && (
          <div className="fixed bottom-5 right-4 z-10 flex flex-col items-center justify-center">
            <ButtonSticky
              icon={<Icomoon className="icon-Headset" />}
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
                iconBtn={<Icomoon className="icon-Swap-Calls-Arrows" />}
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
                iconBtn={<Icomoon className="icon-Safe" />}
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
                iconBtn={<Icomoon className="icon-User-ID" />}
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
          {/* <div
            id="spark-fire"
            className="absolute left-0 top-0 hidden h-[calc(100%-100px)] w-full xl:block"
          /> */}
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
              f2pCurType === "free-to-earn"
                ? f2eGame
                : f2pCurType === "story-mode"
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
            list={p2eGame
              .filter((_item) => _item.hot_game_status)
              .sort((a, b) => Number(b.hot_game_no) - Number(a.hot_game_no))}
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

      <BodyCategories />
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
              iconBtn={<Icomoon className="icon-Ticket-Star" />}
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
              iconBtn={<Icomoon className="icon-Diamond" />}
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
  ) : (
    <></>
  )
}
export default memo(Home)
