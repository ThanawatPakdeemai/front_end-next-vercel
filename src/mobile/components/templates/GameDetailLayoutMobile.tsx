import React from "react"
import { IGame } from "@feature/game/interfaces/IGameService"
import { Box } from "@mui/material"
import { ImageCustom } from "@components/atoms/image/Image"
import ArrowBackIcon from "@mobile/components/atoms/icons/ArrowBackIcon"
import ButtonOutlineTemplate from "@mobile/components/templates/ButtonOutlineTemplate"
import AboutGameModal from "@mobile/components/organisms/modal/AboutGameModal"
import CardBuyItemMobile from "@mobile/features/gameItem/components/molecules/CardBuyItemMobile"
import ControllerIcon from "@components/icons/ControllerIcon"
import BankIcon from "@components/icons/BankIcon"
import { useTranslation } from "react-i18next"
import useGetStatisticsGameById from "@feature/game/containers/hooks/useGetStatisticsGameById"
import StatsDetailMobile from "@mobile/components/molecules/statistic/StatsDetailMobile"
import TopPlayer from "@feature/ranking/components/template/TopPlayer"
import useGameOverview from "@feature/game/containers/hooks/useGameOverview"
import IconArrowLeft from "@components/icons/arrowLeftIcon"
import IconArrowRight from "@components/icons/arrowRightIcon"
import useDrawerControllerMobile from "@mobile/features/game/containers/hooks/useDrawerControllerMobile"
import GameInfoCard from "@mobile/features/game/components/molecules/GameInfoCard"
import { StyleRanking } from "@mobile/features/game/styles/StyleRanking"
import { useRouter } from "next/router"

export interface IGameDetailLayoutMobileProps {
  gameData: IGame
}

export const buttonArrow =
  "flex flex-1 items-center justify-center p-[0_10px_0_15px] h-full"

const GameDetailLayoutMobile = ({ gameData }: IGameDetailLayoutMobileProps) => {
  const router = useRouter()
  const { t } = useTranslation()
  const { openAboutGame, setOpenAboutGame } = useDrawerControllerMobile()
  const { statsGameById } = useGetStatisticsGameById()
  const { onClickedPrev, onClickedNext, weeklyPoolByGameId } = useGameOverview(
    gameData.id,
    gameData.game_mode
  )

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
                      className={buttonArrow}
                      onClick={() =>
                        onClickedPrev(weeklyPoolByGameId.previous || "")
                      }
                    >
                      <IconArrowLeft />
                    </button>
                    <button
                      type="button"
                      className={`${buttonArrow} border-l-[1px] border-neutral-700`}
                      onClick={() =>
                        onClickedNext(weeklyPoolByGameId.next || "")
                      }
                    >
                      <IconArrowRight />
                    </button>
                  </div>
                }
              />
            )}
          </Box>
        )
    }
  }

  return (
    <Box
      component="div"
      className="flex flex-col bg-[#121212] p-[0_24px_24px]"
    >
      <h2
        className="flex items-center justify-between gap-4 py-[30px] font-urbanist text-[24px] font-bold text-white-primary"
        onClick={() => router.push("/")}
        aria-hidden="true"
      >
        <ArrowBackIcon />
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
            icon={<ControllerIcon />}
            title={t("games_per_day")}
            type="normal"
            amount={statsGameById?.data.numnber_game_play || 0}
            unit={t("Games")}
          />
          <StatsDetailMobile
            icon={<BankIcon />}
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
            className="absolute left-0 top-0 h-full w-full object-cover object-center"
          />
        </div>

        {/* Game Item Balance */}
        <div className="game-section__playGame">
          <CardBuyItemMobile
            buttonStyle="purple"
            gameObject={gameData}
          />
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
              <ArrowBackIcon />
            </Box>
          </div>
          <p className="game-section__description line-clamp-2">
            {gameData.story}
          </p>
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
              {gameData.game_type}
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
