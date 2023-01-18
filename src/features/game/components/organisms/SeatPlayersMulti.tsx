import React, { memo, useMemo, useState } from "react"
import {
  CurrentPlayer,
  IGameCurrentPlayer,
  IGameCurrentPlayerMulti
} from "@feature/game/interfaces/IGameService"
import { Box, Typography } from "@mui/material"
import Ellipse from "@components/icons/Ellipse/Ellipse"
import useProfileStore from "@stores/profileStore"
import HighlightOffIcon from "@mui/icons-material/HighlightOff"
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty"
import ButtonPlayer from "../atoms/ButtonPlayer"
import PlayerCard from "../molecules/PlayerCard"
import ButtonOwner from "../atoms/ButtonOwner"
import ButtonCountdown from "../atoms/ButtonCountdown"

interface IProps {
  players: IGameCurrentPlayerMulti[] | undefined[]
}

const SeatPlayersSingle = ({ players }: IProps) => {
  const profile = useProfileStore((state) => state.profile.data)
  const [ownerPressReady, setOwnPressReady] = useState(false)
  const [playerPressReady, setPlayerPressReady] = useState(false)

  const playerInroom = useMemo(() => {
    if (players) {
      const __player = [...players].filter((ele) => ele)
      return __player
    }
  }, [players])

  const playerMe = useMemo(() => {
    if (profile && playerInroom)
      return playerInroom.find((ele) => ele?.player_id === profile.id)
  }, [playerInroom, profile])

  const isOwnerRoom = useMemo(
    () => playerMe && "owner" in playerMe && playerMe.owner,
    [playerMe]
  )

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

  const playerNotReady = useMemo(() => {
    if (playerReady && playerInroom) {
      return playerReady.length < playerInroom.length
    }
  }, [playerInroom, playerReady])

  const onReady = () => {
    setPlayerPressReady(!playerPressReady)
  }

  const onPlayGame = () => {
    setOwnPressReady(!ownerPressReady)
  }

  const checkText = useMemo(() => {
    if (isOwnerRoom) {
      // ผู้เล่น เป็น owner
      if (!playerAllReady && !ownerPressReady) {
        return "The game will begin as soon as all players are ready"
      }
      if (playerAllReady) {
        return "Everyone's here and we're ready to go. Let's start the game!"
      }
    }

    // ผู้เล่น เป็น player
    if (playerPressReady && !ownerPressReady) {
      return "Please wait for them to begin"
    }
    if (ownerPressReady || playerPressReady) {
      return "The game is starting now, prepare to play!"
    }
    return "It's time to play! Press the Ready"
  }, [isOwnerRoom, playerPressReady, ownerPressReady, playerAllReady])

  return (
    <>
      <Box>
        <PlayerCard players={players} />
        <Box className="mb-10  flex justify-center">
          <Box
            className={` ${
              ownerPressReady && " border-secondary-main"
            } w-fit items-center justify-center gap-3 rounded-[50px] border border-neutral-800 bg-primary-main p-3 md:flex`}
          >
            <Typography
              className={`${
                (ownerPressReady || playerPressReady) && "text-secondary-main"
              }  ${
                (playerAllReady || playerPressReady) && " text-green-lemon"
              } ${isOwnerRoom && " text-error-main"}  ${
                playerMe && playerMe.status === "inroom" && "text-neutral-300 "
              } mx-4 w-[200px] font-neue-machina text-sm `}
            >
              {checkText}
            </Typography>
            {ownerPressReady && (
              <ButtonCountdown
                time
                handleClick={onPlayGame}
                endIcon={
                  isOwnerRoom ? (
                    <HighlightOffIcon className="text-secondary-main " />
                  ) : (
                    <HourglassEmptyIcon className="text-primary-main " />
                  )
                }
                className={`h-[60px] w-[60px] rounded-full ${
                  isOwnerRoom
                    ? " border border-secondary-main bg-neutral-900 text-secondary-main"
                    : " bg-secondary-main text-neutral-900"
                }   font-bold capitalize`}
              />
            )}

            {isOwnerRoom && !ownerPressReady && (
              <ButtonOwner
                startIcon={
                  <Ellipse fill={playerAllReady ? "#A0ED61" : "#F42728"} />
                }
                handleClick={
                  playerAllReady
                    ? onPlayGame
                    : () => {
                        onPlayGame()
                      }
                }
                text={
                  <Typography className="w-full font-neue-machina text-2xl uppercase text-neutral-600">
                    START
                  </Typography>
                }
                className={`h-[60px] w-[194px] rounded-[50px] ${
                  playerAllReady
                    ? " btn-green-rainbow bg-green-lemon text-neutral-900"
                    : "bg-neutral-800  text-neutral-600"
                } font-bold capitalize`}
              />
            )}

            {!isOwnerRoom && !playerPressReady && (
              <ButtonPlayer
                startIcon={<Ellipse fill="#A0ED61" />}
                handleClick={onReady}
                text={
                  <Typography className="w-full font-neue-machina text-2xl uppercase text-primary-main">
                    READY
                  </Typography>
                }
                className={` btn-green-rainbow  
                     h-[60px] w-[194px]  rounded-[50px]
                      bg-green-lemon
                  font-bold capitalize text-neutral-900`}
              />
            )}

            {!isOwnerRoom && playerPressReady && (
              <ButtonCountdown
                handleClick={onReady}
                text={
                  <Typography className="w-full font-neue-machina text-2xl uppercase  text-green-lemon">
                    You are ready
                  </Typography>
                }
                endIcon={<HighlightOffIcon className=" text-primary-main" />}
                className={` h-[60px] w-[60px]
                  
                    rounded-full bg-green-lemon
                   
                text-primary-main ${
                  players ? " " : "btn-green-rainbow  "
                } font-bold capitalize text-neutral-900`}
              />
            )}
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default memo(SeatPlayersSingle)
