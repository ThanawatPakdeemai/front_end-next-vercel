import React, { memo, useMemo } from "react"
import {
  CurrentPlayer,
  IGameCurrentPlayer
} from "@feature/game/interfaces/IGameService"
import { Box, Typography } from "@mui/material"
import Ellipse from "@components/icons/Ellipse/Ellipse"
import useProfileStore from "@stores/profileStore"
import useGetGameRoomById from "@feature/game/containers/hooks/useGetGameRoomById"
import { useRouter } from "next/router"
import useIpAddressStore from "@stores/ipAddress"
import CONFIGS from "@configs/index"
import useGameStore from "@stores/game"
import Helper from "@utils/helper"
import ButtonGame from "../atoms/ButtonPlayer"
import PlayerCard from "../molecules/PlayerCard"

interface IProps {
  players: IGameCurrentPlayer[] | undefined[]
  room_id: string
}
const baseUrlGame = CONFIGS.BASE_URL.GAME
const baseUrlApi = CONFIGS.BASE_URL.API
const baseUrlFront = CONFIGS.BASE_URL.FRONTEND

const SeatPlayers = ({ players, room_id }: IProps) => {
  const profile = useProfileStore((state) => state.profile.data)
  const gameData = useGameStore((state) => state.data)
  const ip = useIpAddressStore((state) => state.ipAddress)

  const router = useRouter()

  const item_id = useMemo(() => room_id, [room_id]) // TODO YUI ITEM

  const { gameRoomById } = useGetGameRoomById(room_id)

  const OnPlayGame = () => {
    if (gameRoomById && gameData && profile && room_id) {
      const gameURL = `${baseUrlGame}/${gameData.id}/?${Helper.makeID(8)}${btoa(
        `${room_id}:|:${profile.id}:|:${item_id}:|:${
          profile.email
        }:|:${Helper.getLocalStorage(
          "token"
        )}:|:${baseUrlFront}:|:${baseUrlApi}:|:${gameRoomById.rank_name}:|:${
          gameRoomById.room_number
        }:|:${new Date(gameRoomById.start_time).getTime()}${
          gameRoomById.stage_id !== undefined
            ? `:|:${gameRoomById.stage_id}`
            : ":|:0"
        }:|:${profile.username}:|:${
          gameData.play_to_earn === true ? "free" : "not_free"
        }`
      )}`
    }
  }

  return (
    <>
      <Box>
        <PlayerCard players={players} />
        <Box className="mb-10  flex justify-center">
          <Box className="w-fit items-center justify-center gap-3 rounded-[50px] border border-neutral-800 bg-primary-main p-3 md:flex">
            <Typography className=" mx-4 w-[200px] font-neue-machina text-sm ">
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
