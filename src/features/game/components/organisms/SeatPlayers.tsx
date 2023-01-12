import React, { memo } from "react"
import { IGameCurrentPlayer } from "@feature/game/interfaces/IGameService"
import { Box, Typography } from "@mui/material"
import Ellipse from "@components/icons/Ellipse/Ellipse"
import ButtonGame from "../atoms/ButtonGame"
import PlayerCard from "../molecules/PlayerCard"

interface IProps {
  players: IGameCurrentPlayer[] | undefined[]
}

const SeatPlayers = ({ players }: IProps) => {
  const OnPlayGame = () => {}
  return (
    <>
      <Box>
        <PlayerCard players={players} />
        <Box className="mb-10  flex justify-center">
          <Box className="w-fit items-center justify-center gap-3 rounded-[50px] border border-neutral-800 bg-primary-main p-3 md:flex">
            <Typography className=" mx-4 w-[200px] font-neue-machina text-sm text-error-main">
              The game will begin as soon as all players are ready
            </Typography>

            <ButtonGame
              startIcon={<Ellipse />}
              handleClick={OnPlayGame}
              text={
                <Typography className="w-full font-neue-machina text-2xl text-neutral-800">
                  START
                </Typography>
              }
              className="btn-green-rainbow h-[60px] w-[194px] rounded-[50px] bg-green-lemon font-bold capitalize text-neutral-900"
            />
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default memo(SeatPlayers)
