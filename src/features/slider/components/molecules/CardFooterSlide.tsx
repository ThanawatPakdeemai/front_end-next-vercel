import React from "react"
import SportsEsportsOutlinedIcon from "@mui/icons-material/SportsEsportsOutlined"
import ButtonLink from "@components/atoms/button/ButtonLink"
import ButtonFavourite from "@components/atoms/button/ButtonFavourite"
import { IGame } from "@feature/game/interfaces/IGameService"
import { useRouter } from "next/router"
import useGameStore from "@stores/game"
import useProfileStore from "@stores/profileStore"
import { useToast } from "@feature/toast/containers"
import { MESSAGES } from "@constants/messages"
import { Box } from "@mui/material"

interface IContentFooterBannerSlide {
  gameData: IGame
  text?: string
}

const CardFooterSlide = ({
  gameData,
  text = "Play Now"
}: IContentFooterBannerSlide) => {
  const profile = useProfileStore((state) => state.profile.data)
  const { onSetGameData } = useGameStore()
  const router = useRouter()
  const { errorToast } = useToast()

  const onHandleClick = (_gameUrl: string, _gameData: IGame) => {
    if (profile) {
      router.push(`/${_gameUrl}`)
      onSetGameData(_gameData)
    } else {
      errorToast(MESSAGES.please_login)
    }
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
