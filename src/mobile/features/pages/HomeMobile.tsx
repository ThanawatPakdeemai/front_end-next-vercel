import React, { memo, useEffect, useState } from "react"
import { Typography, Box } from "@mui/material"
import { v4 as uuid } from "uuid"
import SkeletonCard from "@components/atoms/skeleton/SkeletonCard"
import OnPlayingStyle2 from "@feature/home/components/molecules/OnPlayingStyle2"
import GameCarousel from "@components/molecules/gameSlide/GameCarousel"
import BannerSlide from "@feature/slider/components/templates/BannerSlide"
import useGamePageListController from "@feature/game/containers/hooks/useGamePageListController"
import { F2PHeaderMenu, P2EHeaderMenu } from "@constants/gameSlide"
import { IGame } from "@src/types/games"
import { IGetType } from "@feature/game/interfaces/IGameService"

const HomeMobile = () => {
  const [f2pGame, setF2PGame] = useState<IGame[]>()
  const [f2pCurType, setF2PCurType] = useState<IGetType>("free-to-earn-games")

  const [p2eGame, setP2EGame] = useState<IGame[]>()
  const [p2eCurType, setP2ECurType] = useState<IGetType>("play-to-earn-games")

  const { gameFilter: dataF2pGames, loadingFilterGame: loadingDataF2pGames } =
    useGamePageListController(
      f2pCurType === "story-mode-games" ? "storymode" : f2pCurType
    )
  const { gameFilter: dataP2eGame, loadingFilterGame: loadingDataP2eGame } =
    useGamePageListController(
      p2eCurType === "arcade-emporium"
        ? "arcade-emporium"
        : "play-to-earn-games"
    )

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
        <div className="my-2 h-full w-full lg:mt-10 xl:mt-[140px]">
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
                list={f2pGame as unknown as IGame[]}
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
        <div className="mt-[-3rem]">
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
