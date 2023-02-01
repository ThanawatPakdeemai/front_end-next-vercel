import React, { useEffect, useState } from "react"
import { IPartnerGameData } from "@feature/game/interfaces/IPartnerGame"
import useGlobal from "@hooks/useGlobal"
import { Box, Chip, SxProps } from "@mui/material"
import VerticalThumbSlide from "@feature/slider/components/templates/VerticalThumbSlide"
import { IVerticalThumbSlide } from "@feature/slider/interfaces/ISlides"
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
const PartnerGame = () => {
  const { gamePartnerData } = useGlobal()
  const [gameData, setGameData] = useState<IPartnerGameData>()
  const gameDataMedia: IVerticalThumbSlide[] = []

  useEffect(() => {
    if (gamePartnerData) setGameData(gamePartnerData)
  }, [gamePartnerData])

  gameData &&
    gameData.media_list &&
    gameData.media_list.length > 0 &&
    gameData.media_list.map((item) =>
      gameDataMedia.push({
        id: item._id,
        src: item.path,
        type: item.media_type
      })
    )

  return gameData ? (
    <div className="mx-auto flex h-full max-w-[687px] flex-col items-center justify-around">
      <Box
        component="section"
        id="game-partners-overview"
      >
        <div className="w-full rounded-2xl border-[1px] border-neutral-700 border-opacity-80 bg-neutral-780 p-4">
          <div className="flex items-center gap-3">
            <Chip
              label="partner"
              size="small"
              color="success"
              className="font-bold uppercase"
            />
            <h2>{gameData.name}</h2>
          </div>
        </div>
        {gameDataMedia && gameDataMedia.length > 0 && (
          <VerticalThumbSlide items={gameDataMedia} />
        )}
      </Box>
      <Box
        sx={CustomStyle}
        className="flex w-full justify-center uppercase"
      >
        <ButtonGame
          description={"ready to go. Let's start the game!"}
          textButton="Play"
          url={gameData.game_url}
        />
      </Box>
    </div>
  ) : (
    <></>
  )
}

export default PartnerGame
