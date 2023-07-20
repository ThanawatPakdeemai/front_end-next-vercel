import React, { memo } from "react"
import { Box, Typography } from "@mui/material"
import Ellipse from "@components/icons/Ellipse/Ellipse"
import useWaitingSingle from "@feature/game/containers/hooks/useWaitingSingle"
import { IGameCurrentPlayer } from "@feature/game/interfaces/IGameService"
import { useTranslation } from "react-i18next"
import PlayerCard from "../molecules/PlayerCard"
import ButtonGame from "../atoms/ButtonPlayer"

interface IProps {
  players: IGameCurrentPlayer[] | undefined[]
}

const SeatPlayers = ({ players }: IProps) => {
  const { onPlayGame } = useWaitingSingle()
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
          <Typography className=" mx-4 w-full font-neue-machina text-sm ">
            {t("its_time")}
          </Typography>
          <ButtonGame
            startIcon={<Ellipse fill="#AOED61" />}
            handleClick={onPlayGame}
            text={
              <Typography className="w-full font-neue-machina text-2xl uppercase text-neutral-600">
                {t("start")}
              </Typography>
            }
            className={`h-[60px] w-[194px] rounded-[50px] ${"bg-green-lemon "}${"btn-green-rainbow  "} font-bold capitalize text-neutral-900`}
          />
        </Box>
      </Box>
    </Box>
  )
}

export default memo(SeatPlayers)
