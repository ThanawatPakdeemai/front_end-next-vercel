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
import SkeletonCard from "@components/atoms/skeleton/SkeletonCard"
import { v4 as uuid } from "uuid"
import useTweenEffect from "@hooks/useSpartFireEffect"
import useProfileStore from "@stores/profileStore"
import useQuestStore from "@stores/quest"
import { MenuLists } from "@configs/social"
import useGlobal from "@hooks/useGlobal"

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
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Box>
          <CardMarketplace />
          <div className="mt-4 grid grid-cols-3 gap-6">
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
          </div>
        </Box>
        <div className="relative overflow-hidden">
          <div id="spark-fire">
            <CarouselSlide
              slideGames={GAME_DOWNLOAD}
              isLoading={false}
            />
          </div>
        </div>
      </div>

      <div className="my-20 h-full w-full">
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

      <div className="my-20 h-full w-full">
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
      <Box className="xs:flex-col mt-4 mb-10 gap-3 lg:flex">
        <Box className="xs:grid-cols-1 mb-3 grid gap-3 sm:grid-cols-2 lg:mb-0 lg:grid-cols-3">
          <CardLink
            classNameSecond="bg-warning-dark"
            textBtn="Blog"
            href="/blog"
          />

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
        </Box>

        <CardNakaverse href="/" />
      </Box>
    </>
  ) : (
    <> </>
  )
}
export default memo(Home)
