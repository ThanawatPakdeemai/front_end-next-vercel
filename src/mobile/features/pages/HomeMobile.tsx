import React, { memo, useEffect, useState } from "react"
import { Typography, Box } from "@mui/material"
import { v4 as uuid } from "uuid"
import SkeletonCard from "@components/atoms/skeleton/SkeletonCard"
import OnPlayingStyle2 from "@feature/home/components/molecules/OnPlayingStyle2"
import GameCarousel from "@components/molecules/gameSlide/GameCarousel"
import BannerSlide from "@feature/slider/components/templates/BannerSlide"
import useGamePageListController from "@feature/game/containers/hooks/useGamePageListController"
import { F2PHeaderMenu, P2EHeaderMenu } from "@constants/gameSlide"
import { IGame, IGetType } from "@feature/game/interfaces/IGameService"
import {
  getGameTypeF2EByTitleClicked,
  getGameTypeP2EByTitleClicked
} from "@feature/page/homePage"
import useGlobal from "@hooks/useGlobal"

const HomeMobile = () => {
  const [f2pGame, setF2PGame] = useState<IGame[]>()
  const [f2pCurType, setF2PCurType] = useState<IGetType>("free-to-earn-games")

  const [p2eGame, setP2EGame] = useState<IGame[]>()
  const [p2eCurType, setP2ECurType] = useState<IGetType>("play-to-earn-games")

  const { isFreeToEarnGame, limit } = useGlobal()

  const { gameFilter: dataF2pGames, loadingFilterGame: loadingDataF2pGames } =
    useGamePageListController(
      getGameTypeF2EByTitleClicked(f2pCurType),
      p2eCurType === "story-mode-games" ? limit : 9999
    )
  const { gameFilter: dataP2eGame, loadingFilterGame: loadingDataP2eGame } =
    useGamePageListController(getGameTypeP2EByTitleClicked(p2eCurType))

  useEffect(() => {
    let load = false

    if (!load) {
      if (dataF2pGames) {
        setF2PGame(dataF2pGames as unknown as IGame[])
      }
      if (dataP2eGame) {
        setP2EGame(dataP2eGame as unknown as IGame[])
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
  return (
    <>
      <Box
        component="div"
        className=" mt-[100px]"
      >
        <BannerSlide />
        <div className="mb-8 mt-2 h-full w-full">
          {f2pGame && !loadingDataF2pGames ? (
            <>
              <Typography
                variant="body2"
                className="py-[1.125rem] uppercase text-neutral-300"
              >
                Free to Play
              </Typography>
              <GameCarousel
                menu={F2PHeaderMenu}
                list={
                  f2pCurType === "free-to-earn-games"
                    ? f2pGame?.filter((item: IGame) => isFreeToEarnGame(item))
                    : f2pGame
                }
                curType={f2pCurType}
                setCurType={setF2PCurType}
                checkTimer
                onPlaying={false}
              />
            </>
          ) : (
            <div className="grid grid-cols-2 gap-x-3 lg:flex">
              {[...Array(6)].map(() => (
                <SkeletonCard key={uuid()} />
              ))}
            </div>
          )}
        </div>
        <div className="h-loadingFreeToPlayGames mb-2 mt-[-2rem] w-full">
          {p2eGame && !loadingDataP2eGame ? (
            <>
              <Typography
                variant="body2"
                className="py-[1.125rem] uppercase text-neutral-300"
              >
                Play to Earn
              </Typography>
              <GameCarousel
                menu={P2EHeaderMenu}
                list={p2eGame as unknown as IGame[]}
                curType={p2eCurType}
                setCurType={setP2ECurType}
                showNo
                onPlaying={false}
              />
            </>
          ) : (
            <div className="grid grid-cols-2 gap-x-3 md:grid-cols-3 lg:flex lg:grid-cols-4 ">
              {[...Array(6)].map(() => (
                <SkeletonCard key={uuid()} />
              ))}
            </div>
          )}
        </div>
        <div className="">
          <OnPlayingStyle2
            isSlider={false}
            showTitle
          />
        </div>
      </Box>
    </>
  )
}
export default memo(HomeMobile)
