import React, { useEffect } from "react"
import { Box, Typography } from "@mui/material"
import { useTranslation } from "react-i18next"
import { useRouter } from "next/router"
import dynamic from "next/dynamic"
import { IGame } from "@feature/game/interfaces/IGameService"
import useGetStatisticsGameById from "@feature/game/containers/hooks/useGetStatisticsGameById"
import useDrawerControllerMobile from "@mobile/features/game/containers/hooks/useDrawerControllerMobile"
import { StyleRanking } from "@mobile/features/game/styles/StyleRanking"
import useGlobalControllerMobile from "@mobile/features/game/containers/hooks/useGlobalControllerMobile"
import useGameOverview from "@feature/game/containers/hooks/useGameOverview"

const ImageCustom = dynamic(() => import("@components/atoms/image/Image"), {
  suspense: true,
  ssr: false
})
const Icomoon = dynamic(() => import("@components/atoms/icomoon/Icomoon"), {
  suspense: true,
  ssr: false
})
const ButtonOutlineTemplate = dynamic(
  () => import("@mobile/components/templates/ButtonOutlineTemplate"),
  {
    suspense: true,
    ssr: false
  }
)
const AboutGameModal = dynamic(
  () => import("@mobile/components/organisms/modal/AboutGameModal"),
  {
    suspense: true,
    ssr: false
  }
)
const CardBuyItemMobile = dynamic(
  () =>
    import("@mobile/features/gameItem/components/molecules/CardBuyItemMobile"),
  {
    suspense: true,
    ssr: false
  }
)
const StatsDetailMobile = dynamic(
  () => import("@mobile/components/molecules/statistic/StatsDetailMobile"),
  {
    suspense: true,
    ssr: false
  }
)
const TopPlayer = dynamic(
  () => import("@feature/ranking/components/template/TopPlayer"),
  {
    suspense: true,
    ssr: false
  }
)
const GameInfoCard = dynamic(
  () => import("@mobile/features/game/components/molecules/GameInfoCard"),
  {
    suspense: true,
    ssr: false
  }
)

export interface IGameDetailLayoutMobileProps {
  gameData: IGame
}

export const buttonArrow =
  "flex flex-1 items-center justify-center p-[0_10px_0_15px] h-full"

const GameDetailLayoutMobile = ({ gameData }: IGameDetailLayoutMobileProps) => {
  const router = useRouter()
  const { t } = useTranslation()
  const { openAboutGame, setOpenAboutGame } = useDrawerControllerMobile()
  const { statsGameById, fetchStatsGameById } = useGetStatisticsGameById()
  const { onClickedPrev, onClickedNext, weeklyPoolByGameId } = useGameOverview(
    gameData.id,
    gameData.game_mode
  )
  // const { setOpen } = useLoadingStore()
  const { handleClickOpenLoading } = useGlobalControllerMobile()

  const renderWeeklyTopPlayer = () => {
    switch (gameData.game_mode) {
      case "story-mode":
        return null
      case "free-to-play":
      case "free-to-earn":
      case "play-to-earn":
      default:
        return (
          <Box
            component="div"
            className="game-section__weekly-prize-pool font-urbanist"
            sx={StyleRanking}
          >
            {weeklyPoolByGameId && (
              <TopPlayer
                element="select"
                subtitle
                background="neutral"
                elevation={0}
                rank
                topPlayerGameId={weeklyPoolByGameId.record || []}
                className="border-0 bg-[#18181C]"
                rightContent={
                  <div className="flex h-10 items-center rounded-[20px] border-[1px] border-neutral-700">
                    <button
                      type="button"
                      aria-label="prev"
                      className={buttonArrow}
                      onClick={() =>
                        onClickedPrev(weeklyPoolByGameId.previous || "")
                      }
                    >
                      <Icomoon className="icon-Full-Arrow-Left" />
                    </button>
                    <button
                      type="button"
                      className={`${buttonArrow} border-l-[1px] border-neutral-700`}
                      aria-label="next"
                      onClick={() =>
                        onClickedNext(weeklyPoolByGameId.next || "")
                      }
                    >
                      <Icomoon className="icon-Full-Arrow-Right" />
                    </button>
                  </div>
                }
                startDate={weeklyPoolByGameId.started_at}
                endDate={weeklyPoolByGameId.ended_at}
              />
            )}
          </Box>
        )
    }
  }

  useEffect(() => {
    let cancel = false
    if (!cancel) {
      fetchStatsGameById(gameData._id)
    }
    return () => {
      cancel = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Box
      component="div"
      className="flex min-h-[100vh] flex-col bg-[#121212] p-[0_24px_24px]"
    >
      <h2
        className="flex items-center justify-between gap-4 py-[30px] font-urbanist text-[24px] font-bold text-white-primary"
        onClick={() => {
          // setOpen("")
          handleClickOpenLoading()
          router.push("/")
        }}
        aria-hidden="true"
      >
        <Icomoon className="icon-Full-Arrow-Left" />
      </h2>
      <Box
        component="section"
        className="game-section flex flex-col gap-6 font-urbanist text-white-primary"
      >
        <GameInfoCard
          key={gameData._id}
          id={gameData._id}
          image={gameData.image_category_list}
          title={gameData.name}
          categories={gameData.category_list}
        />
        {/* Game Analystic */}
        <div className="game-section__analytics grid grid-cols-2">
          <StatsDetailMobile
            icon={<Icomoon className="icon-Joystick" />}
            title={t("games_per_day")}
            type="normal"
            amount={statsGameById?.data.numnber_game_play || 0}
            unit={t("Games")}
          />
          <StatsDetailMobile
            icon={<Icomoon className="icon-ATM-Dollar" />}
            title={t("costs_per_game")}
            type="range"
            amount={statsGameById?.data.cost_per_game_doller || 0}
            unit={`= ${statsGameById?.data.cost_per_game_naka || 0}`}
          />
        </div>

        {/* Game Banner */}
        <div className="game-section__banner relative overflow-hidden rounded-[20px] pt-[56%]">
          <ImageCustom
            src={gameData.image_gif || gameData.image_category_list}
            alt={gameData.name}
            width={300}
            height={300}
            className="absolute left-0 top-0 h-full w-full scale-105 object-cover object-center"
          />
        </div>

        {/* Game Item Balance */}
        <div className="game-section__playGame">
          <CardBuyItemMobile gameObject={gameData} />
        </div>

        {/* Game detail */}
        <div className="game-section__about flex flex-col gap-6">
          <div className="game-section__about--header flex items-end justify-between text-[24px] font-bold">
            About this Game
            <Box
              component="button"
              className="rotate-180"
              onClick={() => setOpenAboutGame(true)}
            >
              <Icomoon className="icon-Full-Arrow-Left" />
            </Box>
          </div>
          <Typography
            className="game-section__description line-clamp-2"
            dangerouslySetInnerHTML={{
              __html: `${gameData.story}`
            }}
          />
        </div>

        {/* Game categories */}
        <div className="game-section__categories flex flex-wrap items-center gap-3">
          {gameData.category_list.map((_category) => (
            <div
              key={_category.id}
              className="game-section__categories--item"
            >
              <ButtonOutlineTemplate>{_category.name}</ButtonOutlineTemplate>
            </div>
          ))}
          <div className="game-section__categories--item game-section__categories--item-gameType">
            <ButtonOutlineTemplate className="capitalize">
              {gameData.game_type.replace("player", " player")}
            </ButtonOutlineTemplate>
          </div>
        </div>

        {renderWeeklyTopPlayer()}

        {/* Modal About Game */}
        <AboutGameModal
          open={openAboutGame}
          setOpenAboutGame={setOpenAboutGame}
          gameData={gameData}
        />
      </Box>
    </Box>
  )
}

export default GameDetailLayoutMobile
