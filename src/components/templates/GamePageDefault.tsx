import React, { useEffect, useState } from "react"
import { Box } from "@mui/material"
import { useRouter } from "next/router"
import dynamic from "next/dynamic"
import { IGame } from "@feature/game/interfaces/IGameService"
import { IPartnerGameData } from "@feature/game/interfaces/IPartnerGame"
import useGlobal from "@hooks/useGlobal"
import useGetStatisticsGameById from "@feature/game/containers/hooks/useGetStatisticsGameById"
import useGameStore from "@stores/game"
import useBuyGameItemController from "@feature/buyItem/containers/hooks/useBuyGameItemController"
import useGameOverview from "@feature/game/containers/hooks/useGameOverview"
import useGameRating from "@feature/game/containers/hooks/useGameRating"

// Use dynamic import for some components
const TopPlayer = dynamic(
  () => import("@feature/ranking/components/template/TopPlayer"),
  {
    suspense: true,
    ssr: false
  }
)
const Breadcrumb = dynamic(() => import("@components/molecules/Breadcrumb"), {
  suspense: true,
  ssr: false
})
const LikeNoLobby = dynamic(() => import("@components/molecules/LikeNoLobby"), {
  suspense: true,
  ssr: false
})
const Howto = dynamic(() => import("@components/molecules/HowToPlay"), {
  suspense: true,
  ssr: false
})
const Banners = dynamic(() => import("@components/molecules/Banners"), {
  suspense: true,
  ssr: false
})
const BannerSingle = dynamic(
  () => import("@components/molecules/BannerSingle"),
  {
    suspense: true,
    ssr: false
  }
)
const StatisticGameDetail = dynamic(
  () => import("@components/molecules/statistic/StatisticGameDetail"),
  {
    suspense: true,
    ssr: false
  }
)
const Header = dynamic(() => import("@components/organisms/Header"), {
  suspense: true,
  ssr: false
})
const Footer = dynamic(() => import("@components/organisms/Footer"), {
  suspense: true,
  ssr: false
})

const Icomoon = dynamic(() => import("@components/atoms/icomoon/Icomoon"), {
  suspense: true,
  ssr: false
})

const OfflineIndicator = dynamic(
  () => import("@components/atoms/worker/OfflineIndicator"),
  {
    suspense: true,
    ssr: true
  }
)

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
  const { statsGameById, fetchStatsGameById } = useGetStatisticsGameById()
  const router = useRouter()
  const isReward =
    router.pathname &&
    router.pathname === "/[typeGame]/[GameHome]/[typeReward]/[notification_id]"
  const { ratingGame, onSubmitSendRating } = useGameRating(data?._id)
  const {
    onClickedPrev,
    onClickedNext,
    weeklyPoolByGameId,
    isLoadingWeeklyPoolByGameId
  } = useGameOverview(gameData?.id as string, (gameData as IGame)?.game_mode)

  const containerClasses = "main-container mx-auto w-full  px-2 lg:px-0"

  useEffect(() => {
    if (data) {
      fetchStatsGameById(data._id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

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
                  value={ratingGame ? ratingGame.percent : 100}
                  handleClick={onSubmitSendRating}
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
                        aria-label="Previous"
                        className={buttonArrow}
                        onClick={() =>
                          onClickedPrev(weeklyPoolByGameId?.previous || "")
                        }
                      >
                        <Icomoon className="icon-Full-Arrow-Left" />
                      </button>
                      <button
                        type="button"
                        aria-label="Next"
                        className={`${buttonArrow} border-l-[1px] border-neutral-700`}
                        onClick={() =>
                          onClickedNext(weeklyPoolByGameId?.next || "")
                        }
                      >
                        <Icomoon className="icon-Full-Arrow-Right" />
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
        <OfflineIndicator />
      </div>
    </div>
  )
}
export default GamePageDefault
