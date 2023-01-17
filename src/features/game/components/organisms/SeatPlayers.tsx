import React, { memo } from "react"
import { IGameCurrentPlayer } from "@feature/game/interfaces/IGameService"
import { Box, Typography } from "@mui/material"
import Ellipse from "@components/icons/Ellipse/Ellipse"
import ButtonGame from "../atoms/ButtonGame"
import PlayerCard from "../molecules/PlayerCard"

interface IProps {
  players: IGameCurrentPlayer[] | undefined[]
  // eslint-disable-next-line no-unused-vars
  handleKick?: (player_id: string) => void
}

const SeatPlayers = ({ players, handleKick }: IProps) => {
  const OnPlayGame = () => {}
  return (
    <>
      <Box>
        <PlayerCard
          players={players}
          onKick={handleKick}
        />
        <Box className="mb-10  flex justify-center">
          <Box className="w-fit items-center justify-center gap-3 rounded-[50px] border border-neutral-800 bg-primary-main p-3 md:flex">
            <Typography className=" mx-4 w-[200px] font-neue-machina text-sm text-error-main">
              The game will begin as soon as all players are ready
            </Typography>

            <ButtonGame
              startIcon={<Ellipse />}
              handleClick={OnPlayGame}
              text={
                <Typography className="w-full font-neue-machina text-2xl text-neutral-600">
                  START
                </Typography>
              }
              className={`h-[60px] w-[194px] rounded-[50px] ${
                players ? " bg-neutral-800" : "bg-green-lemon "
              }${
                players ? " " : "btn-green-rainbow  "
              } font-bold capitalize text-neutral-900`}
            />
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default memo(SeatPlayers)
