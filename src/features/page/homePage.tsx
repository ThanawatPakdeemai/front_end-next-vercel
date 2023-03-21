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
import DeveloperPart from "@feature/home/components/template/DeveloperPart"
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
import useGetHotGames from "@feature/game/containers/hooks/useGetHotGames"
import { IGame, IGetType } from "@feature/game/interfaces/IGameService"
import useGamesByTypes from "@feature/game/containers/hooks/useGamesByTypes"
import SkeletonCard from "@components/atoms/skeleton/SkeletonCard"
import { v4 as uuid } from "uuid"
import useTweenEffect from "@hooks/useSpartFireEffect"
import useProfileStore from "@stores/profileStore"
import useQuestStore from "@stores/quest"
import { MenuLists } from "@configs/social"
import useGlobal from "@hooks/useGlobal"
import CardLinkTemplate from "@components/templates/contents/CardLinkTemplate"
import CONFIGS from "@configs/index"

const Home = () => {
  const limit = 10
  const { profile } = useProfileStore()
  const { clearQuestStore, setOpen, hasCompleted } = useQuestStore()
  const { hydrated } = useGlobal()

  /**
   * @description: Spark fire effect
   */
  const { createParticle } = useTweenEffect(600, 300, 50, -500)
  useEffect(() => {
    if (hydrated) createParticle()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hydrated])

  const handleModalMission = () => {
    setOpen()
    clearQuestStore()
  }

  const [f2pGame, setF2PGame] = useState<IGame[]>()
  const [f2pCurType, setF2PCurType] = useState<IGetType>("free-to-play")

  const [p2eGame, setP2EGame] = useState<IGame[]>()
  const [p2eCurType, setP2ECurType] = useState<IGetType>("hot-game")

  const { hotGameData } = useGetHotGames()
  const { data: p2eGameData, isFetching: p2eLoading } = useGamesByTypes({
    _type: p2eCurType,
    _limit: limit,
    _page: 1
  })

  const { data: f2pGameData, isFetching: f2pLoading } = useGamesByTypes({
    _type: f2pCurType,
    _limit: limit,
    _page: 1
  })

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

  return hydrated ? (
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
                  href="/"
                  srcMain={IMAGES.frontNakaSwap.src}
                  altMain={IMAGES.frontNakaSwap.alt}
                  srcSecond={IMAGES.backNakaSwap.src}
                  altSecond={IMAGES.backNakaSwap.alt}
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
          <CarouselSlide
            slideGames={GAME_DOWNLOAD}
            isLoading={false}
          />
          <div
            id="spark-fire"
            className="absolute top-0 left-0 hidden h-full w-full xl:block"
          />
        </div>
      </div>

      <div className="my-2 h-full w-full lg:my-20">
        {f2pGame && !f2pLoading ? (
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

      <div className="my-2 h-full w-full lg:my-20">
        {p2eGame && !p2eLoading ? (
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
        text="Show your God Mode for the blockchain gaming landscape"
        icon={<ShapeIcon />}
      />

      <BodyCategories />

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
                srcMain={IMAGES.frontNakaBand.src}
                altMain={IMAGES.frontNakaBand.alt}
                srcSecond={IMAGES.backNakaBand.src}
                altSecond={IMAGES.backNakaBand.alt}
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
