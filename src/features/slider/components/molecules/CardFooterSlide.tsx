import React from "react"
import SportsEsportsOutlinedIcon from "@mui/icons-material/SportsEsportsOutlined"
import ButtonLink from "@components/atoms/button/ButtonLink"
import ButtonFavourite from "@components/atoms/button/ButtonFavourite"
import { IGame } from "@feature/game/interfaces/IGameService"
import { useRouter } from "next/router"
import useGameStore from "@stores/game"
import { Box } from "@mui/material"
import { validTypeGames } from "@pages/[typeGame]"

interface IContentFooterBannerSlide {
  gameData: IGame
  text?: string
}

const CardFooterSlide = ({
  gameData,
  text = "Play Now"
}: IContentFooterBannerSlide) => {
  const { onSetGameData } = useGameStore()
  const router = useRouter()

  const onHandleClick = (_gameUrl: string, _gameData: IGame) => {
    let type = validTypeGames?.[0]
    if (_gameData?.play_to_earn && _gameData?.play_to_earn_status === "free") {
      type = validTypeGames?.[1]
      router.push(`/${type}/${_gameUrl}/roomlist`)
    } else if (_gameData.game_type === "storymode") {
      type = validTypeGames?.[2]
      router.push(`/${type}/${_gameUrl}`)
    } else {
      router.push(`/${type}/${_gameUrl}`)
    }
    onSetGameData(_gameData)
  }

  return (
    <footer className="slide-item--footer relative mt-4 flex items-center justify-between md:mt-auto">
      <Box
        sx={{
          "button": {
            maxHeight: "50px",
            fontFamily: "neueMachina,Helvetica,Arial,sans-serif"
          }
        }}
        className="w-[calc(100%-80px)]"
      >
        <ButtonLink
          text={text}
          href={gameData.path}
          icon={<SportsEsportsOutlinedIcon />}
          size="large"
          color="secondary"
          variant="contained"
          className="w-full"
          onClick={() => onHandleClick(gameData.path, gameData)}
        />
      </Box>
      <ButtonFavourite className="absolute right-0 top-0" />
    </footer>
  )
}

export default CardFooterSlide
