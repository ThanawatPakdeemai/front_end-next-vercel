import React from "react"
import { Box, Chip, SxProps } from "@mui/material"
import { IGetType } from "@feature/game/interfaces/IGameService"
import useGameOverview from "@feature/game/containers/hooks/useGameOverview"
import HorizontalThumbSlide from "@feature/slider/components/templates/HorizontalThumbSlide"
import FullWidthSlide from "@feature/slider/components/templates/FullWidthSlide"
import ArcadeEmporiumIcon from "@components/icons/ArcadeEmporiumIcon"
import GamePlayTime from "@feature/game/components/atoms/GamePlayTime"
import { useTranslation } from "react-i18next"

export const StartButtonCustomStyle: SxProps = {
  "& > div": {
    width: "100%"
  },
  "& > div > .MuiTypography-root": {
    color: "#A0ED61"
  },
  "button": {
    marginRight: "0"
  }
}

interface IGameContentProps {
  gameId: string
  gameType: IGetType
  themeColor?: string
}

const GameContent = ({
  gameId,
  gameType,
  themeColor = "!bg-green-lemon"
}: IGameContentProps) => {
  const { gameDataState, gameMedia, playCount } = useGameOverview(
    gameId,
    gameType
  )
  const { t } = useTranslation()

  return (
    <div
      className={`relative mx-auto flex h-full flex-col ${
        gameMedia && gameMedia.length > 1 ? "items-center" : ""
      }`}
    >
      <Box
        component="section"
        id={`${gameType}-overview`}
        className="w-full"
      >
        <div className="relative z-[1] w-full rounded-2xl border-[1px] border-neutral-700 border-opacity-80 bg-neutral-780 p-4 uppercase text-neutral-300">
          <div className="flex items-center gap-3">
            {gameType === "arcade-emporium" && <ArcadeEmporiumIcon />}
            <Chip
              label={t(
                gameType
                  ?.split("-")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")
                  .replace(" Games", "")
              )}
              size="small"
              color="success"
              className={`${themeColor.toString()} font-bold uppercase`}
            />
            <h2>{gameDataState && gameDataState.name}</h2>
            {playCount !== undefined && (
              <div className="ml-auto">
                <GamePlayTime playTime={playCount} />
              </div>
            )}
          </div>
        </div>
        {gameMedia && gameMedia.length > 1 ? (
          <HorizontalThumbSlide items={gameMedia} />
        ) : (
          <FullWidthSlide items={gameMedia} />
        )}
      </Box>
    </div>
  )
}

export default GameContent
