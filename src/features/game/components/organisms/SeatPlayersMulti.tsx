import React, { memo, useEffect, useMemo, useState } from "react"
import { IGameCurrentPlayerMulti } from "@feature/game/interfaces/IGameService"
import { Box, Typography } from "@mui/material"
import Ellipse from "@components/icons/Ellipse/Ellipse"
import useProfileStore from "@stores/profileStore"
import HighlightOffIcon from "@mui/icons-material/HighlightOff"
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty"
import { useToast } from "@feature/toast/containers"
import Helper from "@utils/helper"
import { IResGetIp } from "@interfaces/IGetIP"
import { MESSAGES } from "@constants/messages"
// import useGameStore from "@stores/game"
import { useSocketProviderWaiting } from "@providers/SocketProviderWaiting"
import useGameStore from "@stores/game"
import CONFIGS from "@configs/index"
import ButtonPlayer from "../atoms/ButtonPlayer"
import PlayerCard from "../molecules/PlayerCard"
import ButtonOwner from "../atoms/ButtonOwner"
import ButtonCountdown from "../atoms/ButtonCountdown"

interface IProps {
  players: IGameCurrentPlayerMulti[] | undefined[]
}

const baseUrlGame = CONFIGS.BASE_URL.GAME
const baseUrlApi = CONFIGS.BASE_URL.API
const baseUrlFront = CONFIGS.BASE_URL.FRONTEND

const SeatPlayersSingle = ({ players }: IProps) => {
  const { onReadyPlayerBurnItem, cancelReadyPlayer, room_id } =
    useSocketProviderWaiting()

  const profile = useProfileStore((state) => state.profile.data)
  const { data: gameData, itemSelected, qtyItemOfRoom } = useGameStore()
  const [ownerPressPlay, setOwnPressPlay] = useState(false)
  const [playerPressReady, setPlayerPressReady] = useState(false)
  const { errorToast } = useToast()
  const [, setIp] = useState<string>("")
  const [, setGameUrl] = useState<string>("")
  const [room_number] = useState<string>("")
  const [rank_name] = useState<string>("")
  const [start_time] = useState<string>("")

  useEffect(() => {
    Helper.getIP().then((res) => {
      setIp((res as IResGetIp).ip)
    })
    return () => {
      setIp("")
    }
  }, [])

  useEffect(() => {
    if (
      gameData &&
      itemSelected &&
      profile &&
      gameData.game_type === "multiplayer"
    ) {
      const frontendUrl = `${baseUrlFront}/${gameData.path}/summary/${room_id}`
      let gameURL = ""
      if (gameData.type_code === "multi_02") {
        gameURL = `${baseUrlGame}/${gameData.id}/?query=${Helper.makeID(8)}`
        // console.log(">>>>>  02")
        // console.log(gameURL)
      } else {
        gameURL = `${gameData.game_url}/${gameData.id}/?query=${Helper.makeID(
          8
        )}${btoa(
          `${room_id}:|:${profile?.id}:|:${itemSelected._id}:|:${
            profile?.email
          }:|:${Helper.getLocalStorage(
            "token"
          )}:|:${frontendUrl}:|:${baseUrlApi}:|:${rank_name}:|:${room_number}:|:${new Date(
            start_time
          ).getTime()}:|:${profile?.username}`
        )}`
      }

      setGameUrl(gameURL)
      // console.log(">>>>> not 02")

      // console.log(
      //   `${gameData.game_url}/${gameData.id}/?query=${Helper.makeID(
      //     8
      //   )}${`${room_id}:|:${profile?.id}:|:${itemSelected._id}:|:${
      //     profile?.email
      //   }:|:${Helper.getLocalStorage(
      //     "token"
      //   )}:|:${frontendUrl}:|:${baseUrlApi}:|:${rank_name}:|:${room_number}:|:${new Date(
      //     start_time
      //   ).getTime()}:|:${profile?.username}`}`
      // )
    }

    return () => {
      setGameUrl("")
    }
  }, [
    gameData,
    itemSelected,
    profile,
    rank_name,
    room_id,
    room_number,
    start_time
  ])

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

  const playerBurnItem = useMemo(() => {
    if (playerInroom) {
      const _player = [...playerInroom].filter((ele) => ele?.item_burn)
      return _player
    }
  }, [playerInroom])

  const playerAllReady = useMemo(() => {
    if (
      playerReady &&
      playerInroom &&
      playerInroom.length > 1 &&
      playerBurnItem?.length === playerInroom.length
    ) {
      return playerReady.length === playerInroom.length
    }
  }, [playerBurnItem, playerInroom, playerReady])

  const playerNotReady = useMemo(() => {
    if (playerReady && playerInroom) {
      return playerReady.length < playerInroom.length
    }
  }, [playerInroom, playerReady])

  const checkText = useMemo(() => {
    if (isOwnerRoom) {
      //  owner
      if (!playerAllReady && !ownerPressPlay && playerNotReady) {
        return "The game will begin as soon as all players are ready"
      }
      if (playerAllReady) {
        return "Everyone's here and we're ready to go. Let's start the game!"
      }
    }

    // player
    if (playerPressReady && !ownerPressPlay) {
      return "Please wait for them to begin"
    }
    if (ownerPressPlay || playerPressReady) {
      return "The game is starting now, prepare to play!"
    }
    return "It's time to play! Press the Ready"
  }, [
    isOwnerRoom,
    playerPressReady,
    ownerPressPlay,
    playerAllReady,
    playerNotReady
  ])

  const onReady = async () => {
    if (playerMe && itemSelected && qtyItemOfRoom > 0) {
      await onReadyPlayerBurnItem(
        playerMe?.item_burn,
        itemSelected._id,
        qtyItemOfRoom
      )

      await setPlayerPressReady(!playerPressReady)
    } else if (!playerMe) {
      errorToast(MESSAGES["no-player"])
    } else if (!itemSelected || qtyItemOfRoom < 1) {
      errorToast(MESSAGES["please_item"])
    }
  }

  const onPlayGame = () => {
    setOwnPressPlay(!setOwnPressPlay)
  }

  return (
    <>
      <Box>
        <PlayerCard players={players} />
        <Box className="mb-10  flex justify-center">
          {players.length > 0 && (
            <Box
              className={` ${
                ownerPressPlay && " border-secondary-main"
              } w-fit items-center justify-center gap-3 rounded-[50px] border border-neutral-800 bg-primary-main p-3 md:flex`}
            >
              <Typography
                className={`${
                  // || playerPressReady
                  ownerPressPlay && "text-secondary-main"
                }  ${
                  (playerAllReady || playerPressReady) && " text-green-lemon"
                } ${isOwnerRoom && " text-error-main"}  ${
                  playerMe &&
                  playerMe.status === "inroom" &&
                  "text-neutral-300 "
                } mx-4 w-[200px] font-neue-machina text-sm `}
              >
                {checkText}
              </Typography>
              {ownerPressPlay && (
                <ButtonCountdown
                  time
                  handleClick={() => {
                    playerAllReady
                      ? onPlayGame()
                      : () => {
                          errorToast(MESSAGES["please-wait-player-all-ready"]) // TODO YUI
                        }
                  }}
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

              {isOwnerRoom && !ownerPressPlay && (
                <ButtonOwner
                  startIcon={
                    <Ellipse fill={playerAllReady ? "#A0ED61" : "#F42728"} />
                  }
                  handleClick={() => {
                    playerAllReady
                      ? onPlayGame()
                      : () => {
                          errorToast(MESSAGES["please-wait-player-all-ready"]) // TODO YUI
                        }
                  }}
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
                  handleClick={() => {
                    setPlayerPressReady(false)
                    cancelReadyPlayer()
                  }}
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
          )}
        </Box>
      </Box>
    </>
  )
}

export default memo(SeatPlayersSingle)
