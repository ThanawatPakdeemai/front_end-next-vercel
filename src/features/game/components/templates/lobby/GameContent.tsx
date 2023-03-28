import React from "react"
import { Box, Chip, SxProps } from "@mui/material"
import VerticalThumbSlide from "@feature/slider/components/templates/VerticalThumbSlide"
import { IGetType } from "@feature/game/interfaces/IGameService"
import useGameOverview from "@feature/game/containers/hooks/useGameOverview"
import ButtonGame from "../../molecules/ButtonGame"

const CustomStyle: SxProps = {
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
}

const GameContent = ({ gameId, gameType }: IGameContentProps) => {
  const { gameDataState, gameMedia } = useGameOverview(gameId, gameType)

  /**
   * @description Handle Game URL
   * @returns {string}
   */
  const handleGameURL = (): string => {
    if (gameDataState && gameDataState.game_url) {
      if (gameDataState.game_url.includes("http")) {
        return `${gameDataState.game_url}`
      }
      return `/${gameType}/${gameDataState.game_url}/roomlist`
    }
    return "/"
  }

  return (
    <div className="mx-auto flex h-full max-w-[687px] flex-col items-center justify-around">
      <Box
        component="section"
        id="game-partners-overview"
        className="w-full"
      >
        <div className="w-full rounded-2xl border-[1px] border-neutral-700 border-opacity-80 bg-neutral-780 p-4">
          <div className="flex items-center gap-3">
            <Chip
              label={gameType.split("-").join(" ")}
              size="small"
              color="success"
              className="!bg-green-lemon font-bold uppercase"
            />
            <h2>{gameDataState && gameDataState.name}</h2>
          </div>
        </div>
        {gameMedia && gameMedia.length > 0 && (
          <VerticalThumbSlide items={gameMedia} />
        )}
      </Box>
      {gameDataState && (
        <Box
          sx={CustomStyle}
          className="flex w-full justify-center uppercase"
        >
          <ButtonGame
            description={"ready to go. Let's start the game!"}
            textButton="Play"
            url={handleGameURL()}
          />
        </Box>
      )}
    </div>
  )
}

export default GameContent
