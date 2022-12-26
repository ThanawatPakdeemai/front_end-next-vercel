import React, { memo, useEffect, useState } from "react"
import GameCarousel, {
  ISlide
} from "@components/molecules/gameSlide/GameCarousel"
import LogoIcon from "@components/icons/LogoIcon"
import ShapeIcon from "@components/icons/ShapeIcon"
import BodyCategories from "@components/molecules/BodyCategories"
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
import CardMarketplace from "@components/molecules/CardMarketplace"
import CardNakaverse from "@components/molecules/CardNakaverse"
import { Grid } from "@mui/material"
import ICoupon from "@components/icons/Coupon"
import IDiamond from "@components/icons/Diamond"
import { IMAGES } from "@constants/images"
import CardLink from "@components/molecules/CardLink"
import INakaSwap from "@components/icons/NakaSwap"
import IStacking from "@components/icons/Stacking"
import IReferrals from "@components/icons/Referrals"

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
          menu={F2PHeaderMenu}
          list={f2pGame}
          curType={f2pCurType}
          setCurType={setF2PCurType}
          checkTimer
        />
      </div>
      <div className="my-20 h-full w-full">
        <GameCarousel
          menu={P2EHeaderMenu}
          list={p2eGame}
          curType={p2eCurType}
          setCurType={setP2ECurType}
          showNo
        />
      </div>
      <Tagline
        bgColor="bg-green-lemon"
        textColor="text-neutral-800 font-bold"
        text="Show your God Mode for the blockchain gaming landscape"
        icon={<ShapeIcon />}
      />
      <div className="mt-10 mb-10">
        <div className="mt-2.5 mb-2.5">
          <Grid
            container
            spacing={2}
          >
            <Grid
              item
              sm={12}
              md={6}
            >
              <CardMarketplace />
            </Grid>
          </Grid>
        </div>
        <div className="mt-2.5 mb-2.5">
          <Grid
            container
            spacing={2}
          >
            <Grid
              item
              sm={12}
              md={2}
            >
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
            </Grid>
            <Grid
              item
              sm={12}
              md={2}
            >
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
            </Grid>
            <Grid
              item
              sm={12}
              md={2}
            >
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
            </Grid>
          </Grid>
        </div>
      </div>

      <div className="mt-10 mb-10">
        <Grid
          container
          spacing={2}
        >
          <Grid
            item
            sm={12}
            md={2}
          >
            <CardLink
              textBtn="View All"
              href="/"
            />
          </Grid>
          <Grid
            item
            sm={12}
            md={2}
          >
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
          </Grid>
          <Grid
            item
            sm={12}
            md={2}
          >
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
          </Grid>
          <Grid
            item
            sm={12}
            md={6}
          >
            <CardNakaverse href="/" />
          </Grid>
        </Grid>
      </div>

      <BodyCategories />
    </>
  )
}
export default memo(Home)
