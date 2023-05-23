import React, { useEffect, useState } from "react"
import ShineIcon from "@components/icons/ShineIcon"
import Banners from "@components/molecules/Banners"
import BannerSingle from "@components/molecules/BannerSingle"
import StatisticGameDetail from "@components/molecules/statistic/StatisticGameDetail"
import Tagline from "@components/molecules/tagline/Tagline"
import Footer from "@components/organisms/Footer"
import Header from "@components/organisms/Header"
import { IGame } from "@feature/game/interfaces/IGameService"
import { IPartnerGameData } from "@feature/game/interfaces/IPartnerGame"
import useGlobal, { isMobile } from "@hooks/useGlobal"
import useGetStatisticsGameById from "@feature/game/containers/hooks/useGetStatisticsGameById"
import TopPlayer from "@feature/ranking/components/template/TopPlayer"
import useGameStore from "@stores/game"
import Howto from "@components/molecules/HowToPlay"
import { Box } from "@mui/material"
import { useTranslation } from "react-i18next"
import useBuyGameItemController from "@feature/buyItem/containers/hooks/useBuyGameItemController"
import LikeNoLobby from "@components/molecules/LikeNoLobby"
import InvestIcon from "@components/icons/Stats/InvestIcon"
import PlayersIcon from "@components/icons/Stats/PlayersIcon"
import RewardIcon from "@components/icons/Stats/RewardIcon"
import StatWithIcon from "@components/molecules/statistic/StatWithIcon"
import StatsDetail from "@components/molecules/statistic/StatsDetail"
import BankIcon from "@components/icons/BankIcon"
import ControllerIcon from "@components/icons/ControllerIcon"
import StatEstimatedProfit from "@components/molecules/statistic/StatEstimatedProfit"
import IconArrowLeft from "@components/icons/arrowLeftIcon"
import IconArrowRight from "@components/icons/arrowRightIcon"
import useGameOverview from "@feature/game/containers/hooks/useGameOverview"
import Breadcrumb from "@components/molecules/Breadcrumb"
import { useRouter } from "next/router"
import GameDetailLayout from "@mobile/components/templates/GameDetailLayout"
import GameSummaryLayout from "@mobile/components/templates/GameSummaryLayout"

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
  const { getTypeGamePathFolder, stateProfile } = useGlobal()
  const { handleTimeExpire, getCodeShareToEarn } = useBuyGameItemController()
  const data = useGameStore((state) => state.data)
  const gamePartnerData = useGameStore((state) => state.dataGamePartner)
  const [gameData, setGameData] = useState<IGame | IPartnerGameData>()
  const { statsGameById } = useGetStatisticsGameById()
  const { t } = useTranslation()
  const router = useRouter()
  const isReward =
    router.pathname &&
    router.pathname === "/[typeGame]/[GameHome]/[typeReward]/[notification_id]"

  const {
    onClickedPrev,
    onClickedNext,
    weeklyPoolByGameId,
    isLoadingWeeklyPoolByGameId
  } = useGameOverview(
    gameData?.id as string,
    getTypeGamePathFolder(gameData as IGame)
  )

  const containerClasses = "main-container mx-auto w-full  px-2 lg:px-0"

  /**
   * @description Render statistic
   * @returns
   */
  const renderStatistic = () => {
    const shop = true
    const buttonArrow =
      "flex flex-1 items-center justify-center p-[0_10px_0_15px] h-full"

    if (!gameData) return null

    switch (getTypeGamePathFolder(gameData as IGame)) {
      case "story-mode-games":
      case "free-to-play-games":
      case "free-to-earn-games":
        return null
      default:
        return (
          <div className="game-page-default w-full">
            {isMobile ? (
              <>
                <Box component="section">
                  <Tagline
                    bgColor="bg-neutral-800"
                    textColor="text-neutral-500 font-bold"
                    text={t("game_page_tagline_desc")}
                    icon={<ShineIcon />}
                    show={shop}
                  />
                  <div className="mb-12 grid grid-cols-2 gap-2">
                    <LikeNoLobby
                      imgSrc={
                        gameData && "image_category_list" in gameData
                          ? gameData.image_category_list
                          : ""
                      }
                      value={78.34}
                    />
                    <div className="flex flex-col gap-2 ">
                      <div className=" flex flex-auto flex-col justify-between gap-2 ">
                        <StatWithIcon
                          icon={
                            <PlayersIcon className="h-[60px] w-[60px] rotate-0" />
                          }
                          className="bg-error-main"
                          textColor="text-error-main"
                          title={t("players_today")}
                          amount={statsGameById?.data.player_number || 0}
                          unit={t("people")}
                        />
                        <StatWithIcon
                          icon={
                            <InvestIcon className="h-[60px] w-[60px] rotate-0" />
                          }
                          className="bg-secondary-main"
                          textColor="text-secondary-main"
                          title={t("invest_today")}
                          amount={statsGameById?.data.invest || 0}
                          unit="naka"
                        />
                        <StatWithIcon
                          icon={
                            <RewardIcon className="h-[60px] w-[60px] rotate-0" />
                          }
                          className="bg-varidian-default"
                          textColor="text-varidian-default"
                          title={t("reward_today")}
                          amount={statsGameById?.data.reward_naka || 0}
                          unit="naka"
                        />
                      </div>
                    </div>
                    <div className="col-span-2 my-4 flex w-full flex-auto grid-cols-3 flex-col justify-evenly gap-2 ">
                      <div className="flex w-full flex-auto gap-2 ">
                        <StatsDetail
                          icon={<ControllerIcon />}
                          title={t("games_per_day")}
                          type="normal"
                          amount={statsGameById?.data.numnber_game_play || 0}
                          unit={t("Games")}
                        />
                        <StatsDetail
                          icon={<BankIcon />}
                          title={t("costs_per_game")}
                          type="range"
                          amount={statsGameById?.data.cost_per_game_doller || 0}
                          unit={`= ${
                            statsGameById?.data.cost_per_game_naka || 0
                          }`}
                        />
                      </div>
                      <div className="col-span-2">
                        <StatEstimatedProfit
                          minValue={`+${
                            statsGameById?.data.profit_potential_min || 0
                          }%`}
                          maxValue={`+${
                            statsGameById?.data.profit_potential_max || 0
                          }%`}
                        />
                      </div>
                    </div>
                    <div className="col-span-2">
                      <TopPlayer
                        element="select"
                        subtitle
                        background="neutral"
                        note
                        elevation={0}
                        className="h-auto w-full border border-neutral-900 border-opacity-80 !bg-warning-contrastText "
                        rank
                        topPlayerGameId={weeklyPoolByGameId?.record || []}
                        rightContent={
                          <div className="flex h-10 items-center rounded-[20px] border-[1px] border-neutral-700">
                            <button
                              type="button"
                              className={buttonArrow}
                              onClick={() =>
                                onClickedPrev(
                                  weeklyPoolByGameId?.previous || ""
                                )
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
                      />
                    </div>
                  </div>
                </Box>
              </>
            ) : (
              <Box component="section">
                <div className="flex flex-wrap gap-3 xl:flex-row xl:flex-nowrap">
                  <LikeNoLobby
                    imgSrc={
                      gameData && "image_category_list" in gameData
                        ? gameData.image_category_list
                        : ""
                    }
                    value={78.34}
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
                  />
                </div>
              </Box>
            )}
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
      {isMobile ? (
        <>
          {gameData && (
            <>
              {router?.pathname !== "/[typeGame]/[GameHome]" ? (
                <GameSummaryLayout
                  data={gameData as IGame}
                  gameId={gameData.id}
                  gameType={
                    router.asPath.includes("arcade-emporium")
                      ? "arcade-emporium"
                      : "play-to-earn-games"
                  }
                />
              ) : (
                <GameDetailLayout
                  data={gameData as IGame}
                  gameId={gameData.id}
                  gameType={
                    router.asPath.includes("arcade-emporium")
                      ? "arcade-emporium"
                      : "play-to-earn-games"
                  }
                />
              )}
            </>
          )}
        </>
      ) : (
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
            <ReleatedGames _gameType={getTypeGamePathFolder(gameData as IGame)} />
          )} */}
          <Footer />
        </div>
      )}
    </div>
  )
}
export default GamePageDefault
