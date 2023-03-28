import React from "react"
import SportsEsportsOutlinedIcon from "@mui/icons-material/SportsEsportsOutlined"
import ButtonLink from "@components/atoms/button/ButtonLink"
import ButtonFavourite from "@components/atoms/button/ButtonFavourite"
import { IGame } from "@feature/game/interfaces/IGameService"
import { Box } from "@mui/material"
import useGlobal from "@hooks/useGlobal"
import useFavoriteGameContoller from "@feature/favourite/containers/hooks/useFavoriteGameContoller"

interface IContentFooterBannerSlide {
  gameData: IGame
  text?: string
}

const CardFooterSlide = ({
  gameData,
  text = "Play Now"
}: IContentFooterBannerSlide) => {
  const { onHandleSetGameStore, getTypeGamePathFolder, stateProfile } =
    useGlobal()
  const { onClickFavouriteButton, favouriteStatus } = useFavoriteGameContoller({
    playerId: stateProfile?.id ?? "",
    gameId: gameData.id
  })

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
          icon={<SportsEsportsOutlinedIcon />}
          size="large"
          color="secondary"
          variant="contained"
          className="w-full"
          href={`/${getTypeGamePathFolder(gameData)}-games/${gameData.path}`}
          onClick={() =>
            onHandleSetGameStore(getTypeGamePathFolder(gameData), gameData)
          }
        />
      </Box>
      <ButtonFavourite
        handleClick={onClickFavouriteButton}
        favouriteStatus={favouriteStatus}
        className="absolute right-0 top-0"
      />
    </footer>
  )
}

export default CardFooterSlide
