import React from "react"
import ButtonLink from "@components/atoms/button/ButtonLink"
import ButtonFavourite from "@components/atoms/button/ButtonFavourite"
import { IGame } from "@feature/game/interfaces/IGameService"
import { Box } from "@mui/material"
import useGlobal from "@hooks/useGlobal"
import useFavoriteGameContoller from "@feature/favourite/containers/hooks/useFavoriteGameContoller"
import { useTranslation } from "react-i18next"
import { useRouter } from "next/router"
import JoinStickIcon from "@components/icons/JoinStickIcon"

interface IContentFooterBannerSlide {
  gameData: IGame
  text?: string
}

const CardFooterSlide = ({
  gameData,
  text = "play_now"
}: IContentFooterBannerSlide) => {
  const router = useRouter()
  const { t } = useTranslation()
  const {
    onHandleSetGameStore,
    getTypeGamePathFolder,
    stateProfile,
    isRedirectRoomlist
  } = useGlobal()
  const { onClickFavouriteButton, favouriteStatus } = useFavoriteGameContoller({
    playerId: stateProfile?.id ?? "",
    gameId: gameData.id
  })

  return (
    <footer className="slide-item--footer relative mt-4 flex items-center justify-between md:mt-auto">
      <Box
        component="div"
        sx={{
          "button": {
            maxHeight: "50px",
            fontFamily: "neueMachina,Helvetica,Arial,sans-serif"
          }
        }}
        className="w-[calc(100%-80px)]"
      >
        <ButtonLink
          text={t(text)}
          icon={<JoinStickIcon />}
          size="large"
          color="secondary"
          variant="contained"
          className="w-full"
          // href={`/${getTypeGamePathFolder(gameData)}/${
          //   gameData.path
          // }${isRedirectRoomlist(gameData).toString()}`}
          onClick={() => {
            onHandleSetGameStore(getTypeGamePathFolder(gameData), gameData)
            router.push(
              `/${getTypeGamePathFolder(gameData)}/${
                gameData.path
              }${isRedirectRoomlist(gameData).toString()}`
            )
          }}
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
