import React, { memo, useMemo, useState } from "react"
import {
  // CurrentPlayer,
  // IGameCurrentPlayer,
  IGameCurrentPlayerMulti
} from "@feature/game/interfaces/IGameService"
import { Box, Typography } from "@mui/material"
import Ellipse from "@components/icons/Ellipse/Ellipse"
import useProfileStore from "@stores/profileStore"
import ButtonGame from "../atoms/ButtonGame"
import PlayerCard from "../molecules/PlayerCard"

interface IProps {
  players: IGameCurrentPlayerMulti[] | undefined[]
}

const SeatPlayersSingle = ({ players }: IProps) => {
  const profile = useProfileStore((state) => state.profile.data)
  const [ownerPressReady, setOwnPressReady] = useState(false)
  const [playerPressReady] = useState(false)

  const playerInroom = useMemo(() => {
    if (players) {
      const __player = [...players].filter((ele) => ele)
      return __player
    }
  }, [players])

  // const playerMe = useMemo(() => {
  //   if (profile && playerInroom)
  //     return playerInroom.find((ele) => ele?.player_id === profile.id)
  // }, [playerInroom, profile])

  const playerOwnerRoom = useMemo(() => {
    if (profile && playerInroom)
      return playerInroom.find((ele) => {
        if (ele && "owner" in ele && ele.owner) {
          return ele.owner
        }
        return undefined
      })
  }, [playerInroom, profile])

  const playerReady = useMemo(() => {
    if (playerInroom) {
      const _player = [...playerInroom].filter((ele) => ele?.status === "ready")
      return _player
    }
  }, [playerInroom])

  const playerAllReady = useMemo(() => {
    if (playerReady && playerInroom) {
      return playerReady.length === playerInroom.length
    }
  }, [playerInroom, playerReady])

  // const playerNotReady = useMemo(() => {
  //   if (playerReady && playerInroom) {
  //     return playerReady.length < playerInroom.length
  //   }
  // }, [playerInroom, playerReady])

  // const onReady = () => {
  //   setPlayerPressReady(!playerPressReady)
  // }

  const onPlayGame = () => {
    setOwnPressReady(!ownerPressReady)
  }

  const checkText = useMemo(() => {
    if (profile?.id === playerOwnerRoom?._id) {
      // ผู้เล่น เป็น owner
      if (playerInroom?.length === 1) {
        return "The game will begin as soon as all players are ready"
      }
      if (playerAllReady) {
        return "Everyone's here and we're ready to go. Let's start the game!"
      }
    } else {
      // ผู้เล่น เป็น player
      if (playerPressReady) {
        return "Please wait for them to begin"
      }
      return "It's time to play! Press the Ready"
    }
    if (ownerPressReady) {
      return "The game is starting now, prepare to play!"
    }
  }, [
    ownerPressReady,
    playerAllReady,
    playerInroom?.length,
    playerOwnerRoom?._id,
    playerPressReady,
    profile?.id
  ])
  return (
    <>
      <Box>
        <PlayerCard players={players} />
        <Box className="mb-10  flex justify-center">
          <Box
            className={` ${
              (ownerPressReady || playerPressReady) && " border-secondary-main"
            } w-fit items-center justify-center gap-3 rounded-[50px] border border-neutral-800 bg-primary-main p-3 md:flex`}
          >
            <Typography
              className={`${
                (ownerPressReady || playerPressReady) && "text-secondary-main"
              }  ${playerAllReady && " text-green-lemon"} ${
                playerInroom?.length === 1 && " text-error-main"
              }  mx-4 w-[200px] font-neue-machina text-sm text-error-main `}
            >
              {checkText}
            </Typography>
            {}
            <ButtonGame
              startIcon={<Ellipse />}
              handleClick={onPlayGame}
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

export default memo(SeatPlayersSingle)
