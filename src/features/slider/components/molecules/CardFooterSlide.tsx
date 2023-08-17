import React from "react"
import { Box } from "@mui/material"
import { useTranslation } from "react-i18next"
import { useRouter } from "next/router"
import dynamic from "next/dynamic"
import { IGame } from "@feature/game/interfaces/IGameService"
import useGlobal from "@hooks/useGlobal"
import useFavoriteGameContoller from "@feature/favourite/containers/hooks/useFavoriteGameContoller"

const ButtonLink = dynamic(
  () => import("@components/atoms/button/ButtonLink"),
  {
    suspense: true,
    ssr: false
  }
)
const ButtonFavourite = dynamic(
  () => import("@components/atoms/button/ButtonFavourite"),
  {
    suspense: true,
    ssr: false
  }
)
const Icomoon = dynamic(() => import("@components/atoms/icomoon/Icomoon"), {
  suspense: true,
  ssr: false
})

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
    getGameMode,
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
          icon={<Icomoon className="icon-Joystick text-[1.7rem]" />}
          size="large"
          color="secondary"
          variant="contained"
          className="w-full"
          onClick={() => {
            onHandleSetGameStore(getGameMode(gameData), gameData)
            router.push(
              `/${getGameMode(gameData)}/${gameData.path}${isRedirectRoomlist(
                gameData
              ).toString()}`
            )
          }}
        />
      </Box>
      <ButtonFavourite
        handleClick={onClickFavouriteButton}
        favouriteStatus={favouriteStatus}
        className="absolute right-0 top-0 text-[22px]"
      />
    </footer>
  )
}

export default CardFooterSlide
