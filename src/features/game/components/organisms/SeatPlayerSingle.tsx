import React, { memo } from "react"
import { useTranslation } from "react-i18next"
import dynamic from "next/dynamic"

import Box from "@mui/material/Box"
import { IGameCurrentPlayer } from "@feature/game/interfaces/IGameService"

const Typography = dynamic(() => import("@mui/material/Typography"), {
  suspense: true,
  ssr: false
})
const PlayerCard = dynamic(() => import("../molecules/PlayerCard"), {
  suspense: true,
  ssr: false
})
const ButtonGame = dynamic(() => import("../atoms/ButtonPlayer"), {
  suspense: true,
  ssr: false
})

interface IProps {
  players: IGameCurrentPlayer[] | undefined[]
  onPlayGame: () => void
}

const SeatPlayers = ({ players, onPlayGame }: IProps) => {
  const { t } = useTranslation()

  return (
    <Box component="div">
      <PlayerCard players={players} />
      <Box
        component="div"
        className="mb-10  flex justify-center"
      >
        <Box
          component="div"
          className="w-fit items-center justify-center gap-3 rounded-md border border-neutral-800 bg-primary-main p-3 md:flex md:rounded-[50px]"
        >
          <Typography className="mx-4 w-full font-neue-machina text-sm ">
            {t("its_time")}
          </Typography>
          <ButtonGame
            startIcon={
              <span className="flex h-[20px] w-[20px] items-center justify-center rounded-full bg-neutral-900 p-[6px] before:h-[100%] before:w-[100%] before:rounded-full before:bg-green-lemon" />
            }
            handleClick={onPlayGame}
            text={
              <Typography className="w-full font-neue-machina text-2xl uppercase text-neutral-900">
                {t("start")}
              </Typography>
            }
            className="h-[60px] w-[194px] rounded-[50px] bg-green-lemon font-bold capitalize text-neutral-900"
          />
        </Box>
      </Box>
    </Box>
  )
}

export default memo(SeatPlayers)
