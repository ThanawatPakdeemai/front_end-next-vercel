import React from "react"
import { useTranslation } from "react-i18next"
import dynamic from "next/dynamic"
import { SxProps } from "@mui/material/styles"

import Box from "@mui/material/Box"
import useGameOverview from "@feature/game/containers/hooks/useGameOverview"
import { IGetType } from "@feature/game/interfaces/IGameService"

const Chip = dynamic(() => import("@mui/material/Chip"), {
  suspense: true,
  ssr: false
})
const HorizontalThumbSlide = dynamic(
  () => import("@feature/slider/components/templates/HorizontalThumbSlide"),
  {
    suspense: true,
    ssr: false
  }
)
const FullWidthSlide = dynamic(
  () => import("@feature/slider/components/templates/FullWidthSlide"),
  {
    suspense: true,
    ssr: false
  }
)
const Icomoon = dynamic(() => import("@components/atoms/icomoon/Icomoon"), {
  suspense: true,
  ssr: false
})
const GamePlayTime = dynamic(
  () => import("@feature/game/components/atoms/GamePlayTime"),
  {
    suspense: true,
    ssr: false
  }
)

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
        <div className="relative z-[1] w-full rounded-2xl border-[1px] border-neutral-700 border-opacity-80 bg-neutral-800 p-4 uppercase text-neutral-300">
          <div className="flex items-center gap-3">
            {gameType === "arcade-emporium" && (
              <Icomoon className="icon-Diamond" />
            )}
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
            {playCount && (
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
