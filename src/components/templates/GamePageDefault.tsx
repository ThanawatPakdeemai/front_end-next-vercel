import React, { useEffect, useState } from "react"
import Banners from "@components/molecules/Banners"
import BannerSingle from "@components/molecules/BannerSingle"
import StatisticGameDetail from "@components/molecules/statistic/StatisticGameDetail"
import Footer from "@components/organisms/Footer"
import Header from "@components/organisms/Header"
import { IGame } from "@feature/game/interfaces/IGameService"
import { IPartnerGameData } from "@feature/game/interfaces/IPartnerGame"
import useGlobal from "@hooks/useGlobal"
import useGetStatisticsGameById from "@feature/game/containers/hooks/useGetStatisticsGameById"
import TopPlayer from "@feature/ranking/components/template/TopPlayer"
import useGameStore from "@stores/game"
import Howto from "@components/molecules/HowToPlay"
import { Box } from "@mui/material"
import useBuyGameItemController from "@feature/buyItem/containers/hooks/useBuyGameItemController"
import LikeNoLobby from "@components/molecules/LikeNoLobby"
import IconArrowLeft from "@components/icons/arrowLeftIcon"
import IconArrowRight from "@components/icons/arrowRightIcon"
import useGameOverview from "@feature/game/containers/hooks/useGameOverview"
import Breadcrumb from "@components/molecules/Breadcrumb"
import { useRouter } from "next/router"
import useGameRating from "@feature/game/containers/hooks/useGameRating"

interface IGamePageDefaultProps {
  component: React.ReactNode
  component2?: React.ReactNode
  component3?: React.ReactNode
  // Add more components here
}

const GamePageDefault = ({
  component,
  component2,
  component3
}: IGamePageDefaultProps) => {
  const { stateProfile } = useGlobal()
  const { handleTimeExpire, getCodeShareToEarn } = useBuyGameItemController()
  const data = useGameStore((state) => state.data)
  const gamePartnerData = useGameStore((state) => state.dataGamePartner)
  const [gameData, setGameData] = useState<IGame | IPartnerGameData>()
  const { statsGameById } = useGetStatisticsGameById()
  const router = useRouter()
  const isReward =
    router.pathname &&
    router.pathname === "/[typeGame]/[GameHome]/[typeReward]/[notification_id]"
  const { gameRatingData } = useGameRating(data?._id || "")
  const {
    onClickedPrev,
    onClickedNext,
    weeklyPoolByGameId,
    isLoadingWeeklyPoolByGameId
  } = useGameOverview(gameData?.id as string, (gameData as IGame)?.game_mode)

  const containerClasses = "main-container mx-auto w-full  px-2 lg:px-0"

  /**
   * @description Render statistic
   * @returns
   */
  const renderStatistic = () => {
    const buttonArrow =
      "flex flex-1 items-center justify-center p-[0_10px_0_15px] h-full"

    if (!gameData) return null

    switch ((gameData as IGame).game_mode) {
      case "story-mode":
      case "free-to-play":
      case "free-to-earn":
        return null
      default:
        return (
          <div className="game-page-default w-full">
            <Box component="section">
              <div className="flex flex-wrap gap-3 xl:flex-row xl:flex-nowrap">
                <LikeNoLobby
                  imgSrc={
                    gameData && "image_category_list" in gameData
                      ? gameData.image_category_list
                      : ""
                  }
                  value={gameRatingData ? gameRatingData.percent : 100}
                />
                <StatisticGameDetail statsGameById={statsGameById} />
                <TopPlayer
                  element="select"
                  subtitle
                  background="neutral"
                  note
                  elevation={0}
                  className="border border-neutral-800 bg-primary-main lg:!h-[424px]"
                  rank
                  topPlayerGameId={weeklyPoolByGameId?.record || []}
                  isFetching={isLoadingWeeklyPoolByGameId}
                  rightContent={
                    <div className="flex h-10 items-center rounded-[20px] border-[1px] border-neutral-700">
                      <button
                        type="button"
                        className={buttonArrow}
                        onClick={() =>
                          onClickedPrev(weeklyPoolByGameId?.previous || "")
                        }
                      >
                        <IconArrowLeft />
                      </button>
                      <button
                        type="button"
                        className={`${buttonArrow} border-l-[1px] border-neutral-700`}
                        onClick={() =>
                          onClickedNext(weeklyPoolByGameId?.next || "")
                        }
                      >
                        <IconArrowRight />
                      </button>
                    </div>
                  }
                  startDate={weeklyPoolByGameId?.started_at}
                  endDate={weeklyPoolByGameId?.ended_at}
                />
              </div>
            </Box>
          </div>
        )
    }
  }

  useEffect(() => {
    let load = false
    if (!load) {
      if (data) {
        setGameData(data as IGame)
      } else if (gamePartnerData) {
        setGameData(gamePartnerData as IPartnerGameData)
      }
    }

    return () => {
      load = true
    }
  }, [data, gamePartnerData])

  useEffect(() => {
    let load = false

    if (!load) {
      if (data) {
        handleTimeExpire()
      }
    }
    return () => {
      load = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    let load = false

    if (!load) {
      if (data) {
        getCodeShareToEarn()
      }
    }
    return () => {
      load = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stateProfile])

  return (
    <div className="game-page-default w-full">
      <div className={containerClasses}>
        <Header />
        {/* Not show on reward page */}
        {!isReward && <Breadcrumb />}

        {gameData && "image_banner" in gameData ? (
          <BannerSingle
            src={gameData.image_banner}
            alt={gameData.name}
          />
        ) : (
          <Banners />
        )}

        {gameData && <Howto data={gameData as IGame} />}
        {component}
        {renderStatistic()}
        {/**
         * @description In case there is a need to add another component
         */}
        {component2 && <div className="mt-12">{component2}</div>}
        {component3 && <div className="mt-12">{component3}</div>}
        {/* //NOTE - comment ไว้ก่อน ค่อยเปิด feature นี้ทีหลัง */}
        {/* {gameData && (
            <ReleatedGames _gameType={getGameMode(gameData as IGame)} />
          )} */}
        <Footer />
      </div>
    </div>
  )
}
export default GamePageDefault
