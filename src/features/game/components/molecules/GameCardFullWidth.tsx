import ButtonLink from "@components/atoms/button/ButtonLink"
import { ImageCustom } from "@components/atoms/image/Image"
import JoinStickIcon from "@components/icons/JoinStickIcon"
import useEventController from "@feature/event/containers/hooks/useEventController"
import { IGame } from "@feature/game/interfaces/IGameService"
import { Box } from "@mui/material"
import { useRouter } from "next/router"
import React from "react"
import { useTranslation } from "react-i18next"

interface IGameCardFullWidthProps {
  image: string
  name: string
  gameData: IGame
}

const GameCardFullWidth = ({
  image,
  name,
  gameData
}: IGameCardFullWidthProps) => {
  const { t } = useTranslation()
  const { getTypeGamePathFolder, onSetGameStore, isRedirectRoomlist } =
    useEventController()
  const router = useRouter()

  return (
    <Box
      component="div"
      className="game-card-fullwidth__wrapper flex h-full w-full flex-col items-center justify-center p-[68px]"
    >
      <div className="relative w-full overflow-hidden rounded-2xl pt-[48%]">
        <ImageCustom
          height={885}
          width={404}
          src={image}
          alt={name}
          className="absolute left-0 top-0 h-full w-full object-cover"
        />
      </div>
      <h2 className="my-6 font-bold uppercase text-neutral-300">{name}</h2>
      <Box
        component="div"
        sx={{
          "button": {
            maxHeight: "50px",
            fontFamily: "neueMachina,Helvetica,Arial,sans-serif"
          }
        }}
      >
        <ButtonLink
          text={t("play_now")}
          icon={<JoinStickIcon />}
          size="large"
          color="secondary"
          variant="contained"
          className="w-full"
          onClick={() => {
            onSetGameStore(gameData)
            router.push(
              `/${getTypeGamePathFolder(gameData)}/${
                gameData.path
              }${isRedirectRoomlist(gameData).toString()}`
            )
          }}
        />
      </Box>
    </Box>
  )
}

export default GameCardFullWidth
