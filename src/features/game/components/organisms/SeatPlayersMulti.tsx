import React, { memo, useEffect, useMemo, useState } from "react"
import { IGameCurrentPlayerMulti } from "@feature/game/interfaces/IGameService"
import { Box, CircularProgress, Typography } from "@mui/material"
import Ellipse from "@components/icons/Ellipse/Ellipse"
import useProfileStore from "@stores/profileStore"
import HighlightOffIcon from "@mui/icons-material/HighlightOff"
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty"
import { useToast } from "@feature/toast/containers"
import Helper from "@utils/helper"
// import { IResGetIp } from "@interfaces/IGetIP"
import { MESSAGES } from "@constants/messages"
// import useGameStore from "@stores/game"
import { useSocketProviderWaiting } from "@providers/SocketProviderWaiting"
import useGameStore from "@stores/game"
import CONFIGS from "@configs/index"
import ButtonCountdown from "@feature/game/components/atoms/ButtonCountdown"
import ButtonPlayer from "@feature/game/components/atoms/ButtonPlayer"
import PlayerCard from "@feature/game/components/molecules/PlayerCard"
import { IResGetIp } from "@interfaces/IGetIP"
import { useRouter } from "next/router"
import useGetBalanceOf from "@feature/inventory/containers/hooks/useGetBalanceOf"
import useBuyGameItemController from "@feature/buyItem/containers/hooks/useBuyGameItemController"

interface IProps {
  players: IGameCurrentPlayerMulti[] | undefined[]
}

const baseUrlGame = CONFIGS.BASE_URL.GAME
const baseUrlApi = CONFIGS.BASE_URL.API
const baseUrlFront = CONFIGS.BASE_URL.FRONTEND

const SeatPlayersMulti = ({ players }: IProps) => {
  const {
    onReadyPlayerBurnItem,
    cancelReadyPlayer,
    room_id,
    onOwnerBurnItem,
    dataPlayers,
    waitingRoomPlay,
    startGame
  } = useSocketProviderWaiting()

  const profile = useProfileStore((state) => state.profile.data)
  const router = useRouter()
  const { data: gameData, itemSelected, qtyItemOfRoom } = useGameStore()
  const { gameItemList } = useBuyGameItemController()
  const [ownerPressPlay, setOwnPressPlay] = useState(false)
  const [playerPressReady, setPlayerPressReady] = useState(false)
  const [loading, setLoading] = useState<boolean>(false)

  const [ip, setIp] = useState("")

  const { errorToast } = useToast()
  const [gameUrl, setGameUrl] = useState<string>("")
  const [room_number] = useState<string>("")
  const [rank_name] = useState<string>("")
  const [start_time] = useState<string>("")
  const time = new Date()

  useEffect(() => {
    Helper.getIP().then((res) => {
      setIp((res as IResGetIp).ip)
    })
    return () => {
      setIp("")
    }
  }, [])

  const { balanceofItem } = useGetBalanceOf({
    _address: profile?.address ?? "",
    _item_id: itemSelected?.item_id_smartcontract ?? 0
  })

  const playerInroom = useMemo(() => {
    if (players) {
      const __player = [...players].filter((ele) => ele)
      return __player
    }
  }, [players])

  useEffect(() => {
    if (
      gameData &&
      itemSelected &&
      profile &&
      gameData.game_type === "multiplayer"
    ) {
      const frontendUrl = `${baseUrlFront}/${router.query.typeGame}/${gameData.path}/summary/${room_id}`

      let gameURL = ""
      if (gameData.type_code === "multi_02" && ip) {
        const dataLinkGame = `${room_id}:|:${profile?.id}:|:${
          itemSelected._id
        }:|:${profile?.email}:|:${Helper.getLocalStorage(
          "token"
        )}:|:${frontendUrl}:|:${baseUrlApi}:|:${rank_name}:|:${room_number}:|:${new Date(
          start_time
        ).getTime()}:|:${profile?.username}:|:${playerInroom?.length}:|:${
          dataPlayers?.map_id
        }:|:${ip}`

        gameURL = `${baseUrlGame}/${gameData.id}/?query=${Helper.makeID(
          8
        )}${btoa(dataLinkGame)}`
      } else {
        const dataLinkGame = `${room_id}:|:${profile?.id}:|:${
          itemSelected._id
        }:|:${profile?.email}:|:${Helper.getLocalStorage(
          "token"
        )}:|:${frontendUrl}:|:${baseUrlApi}:|:${rank_name}:|:${room_number}:|:${new Date(
          start_time
        ).getTime()}:|:${profile?.username}:|:${playerInroom?.length}:|:${
          dataPlayers?.map_id
        }:|:${ip}`
        gameURL = `${gameData.game_url}/${gameData.id}/?query=${Helper.makeID(
          8
        )}${btoa(dataLinkGame)}`
      }
      setGameUrl(gameURL)
    }

    return () => {
      setGameUrl("")
    }
  }, [
    dataPlayers?.map_id,
    gameData,
    ip,
    itemSelected,
    playerInroom,
    profile,
    rank_name,
    room_id,
    room_number,
    router.query.typeGame,
    start_time
  ])

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

  const playerAllBurnItem = useMemo(() => {
    if (playerBurnItem && playerInroom && playerInroom.length > 1) {
      return playerBurnItem.length === playerInroom?.length
    }
  }, [playerBurnItem, playerInroom])

  const playerAllReady = useMemo(() => {
    if (playerReady && playerInroom && playerInroom.length > 1) {
      return playerReady.length === playerInroom.length
    }
  }, [playerInroom, playerReady])

  const playerNotReady = useMemo(() => {
    if (playerReady && playerInroom) {
      return playerReady.length < playerInroom.length
    }
  }, [playerInroom, playerReady])

  const checkText = useMemo(() => {
    if (playerInroom && playerInroom.length > 0) {
      if (isOwnerRoom) {
        //  owner
        if (playerNotReady) {
          return "The game will begin as soon as all players are ready"
        }
        if (playerAllReady && playerAllBurnItem) {
          return "Everyone's here and we're ready to go. Let's start the game!"
        }
        return "The game will begin as soon as all players are ready"
      }

      // player
      if (
        playerPressReady &&
        playerMe &&
        playerMe?.status === "ready" &&
        playerMe.item_burn
      ) {
        return "Please wait for them to begin"
      }
      if (playerAllReady && playerAllBurnItem && ownerPressPlay) {
        return "The game is starting now, prepare to play!"
      }
      return "It's time to play! Press the Ready"
    }
    return "Don't have player in this room. please out room"
  }, [
    playerInroom,
    isOwnerRoom,
    playerPressReady,
    playerMe,
    playerAllReady,
    playerAllBurnItem,
    ownerPressPlay,
    playerNotReady
  ])

  useEffect(() => {
    if (dataPlayers && dataPlayers.room_status === "playing") {
      waitingRoomPlay()
    }
  }, [dataPlayers, waitingRoomPlay])

  useEffect(() => {
    if (dataPlayers?.room_status === "ready_play" && gameUrl && playerInroom) {
      if (playerInroom.length === dataPlayers.max_players) {
        setTimeout(() => {
          window.location.href = gameUrl
        }, 10000)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataPlayers])

  const onReady = async () => {
    if (profile) {
      if (
        playerMe &&
        itemSelected &&
        balanceofItem &&
        balanceofItem.data >= qtyItemOfRoom &&
        dataPlayers &&
        balanceofItem.data >= dataPlayers?.create_room_detail.number_of_item &&
        dataPlayers.item_id === itemSelected._id
      ) {
        setLoading(true)
        await onReadyPlayerBurnItem(
          playerMe?.item_burn,
          itemSelected._id,
          qtyItemOfRoom
        )
        await setPlayerPressReady(true)
        await setLoading(false)
      } else if (!playerMe) {
        setPlayerPressReady(false)
        errorToast(MESSAGES["no-player"])
      } else if (
        !balanceofItem ||
        (balanceofItem &&
          balanceofItem.data < qtyItemOfRoom &&
          dataPlayers &&
          balanceofItem.data <
            dataPlayers?.create_room_detail.number_of_item) ||
        dataPlayers?.item_id !== itemSelected?._id
      ) {
        if (
          !balanceofItem ||
          (balanceofItem && balanceofItem.data < qtyItemOfRoom)
        ) {
          errorToast(MESSAGES["you-not-enough"])
        } else if (
          dataPlayers &&
          itemSelected &&
          dataPlayers.item_id !== itemSelected._id
        ) {
          const item = gameItemList?.find(
            (_item) => _item?.id === dataPlayers?.item_id
          )
          errorToast(
            `${MESSAGES["please_item"]} for ${item?.name} ${item?.item_size}`
          )
        } else {
          errorToast(MESSAGES["please_item"])
        }
        setPlayerPressReady(false)
      } else {
        errorToast(MESSAGES["error-something"])
      }
    } else {
      setPlayerPressReady(false)
      errorToast(MESSAGES["please_login"])
    }
    setLoading(false)
  }

  const onPlayGame = () => {
    if (profile) {
      if (
        playerMe &&
        itemSelected &&
        playerAllReady &&
        balanceofItem &&
        balanceofItem.data >= qtyItemOfRoom &&
        dataPlayers &&
        balanceofItem.data >= dataPlayers?.create_room_detail.number_of_item &&
        dataPlayers.item_id === itemSelected._id
      ) {
        onOwnerBurnItem(playerMe.item_burn, itemSelected?._id, qtyItemOfRoom)
        setOwnPressPlay(true)
        startGame()
      } else if (!playerMe) {
        setOwnPressPlay(false)
        errorToast(MESSAGES["no-player"])
      } else if (
        qtyItemOfRoom < 1 ||
        !itemSelected ||
        !balanceofItem ||
        (dataPlayers &&
          itemSelected &&
          itemSelected.qty < dataPlayers?.create_room_detail.number_of_item) ||
        dataPlayers?.item_id !== itemSelected?._id
      ) {
        if (
          !itemSelected ||
          !balanceofItem ||
          (balanceofItem && balanceofItem.data < qtyItemOfRoom)
        ) {
          errorToast(MESSAGES["you-not-enough"])
        } else if (
          dataPlayers &&
          itemSelected &&
          dataPlayers.item_id !== itemSelected._id
        ) {
          const item = gameItemList?.find(
            (_item) => _item?.id === dataPlayers?.item_id
          )
          errorToast(
            `${MESSAGES["please_item"]} for ${item?.name} ${item?.item_size}`
          )
        } else {
          errorToast(MESSAGES["please_item"])
        }
        setPlayerPressReady(false)
      } else {
        errorToast(MESSAGES["error-something"])
      }
    } else {
      setOwnPressPlay(false)
      errorToast(MESSAGES["please_login"])
    }
  }

  return (
    <>
      {/* <Link href={gameUrl}>GO</Link> */}
      <Box>
        <PlayerCard players={players} />
        <Box className="mb-10  flex justify-center">
          {players.length > 0 && (
            <Box
              className={` ${
                ownerPressPlay &&
                playerAllBurnItem &&
                dataPlayers?.room_status === "ready_play" &&
                " border-secondary-main"
              } w-fit items-center justify-center gap-3 rounded-[50px] border border-neutral-800 bg-primary-main p-3 md:flex`}
            >
              <Typography
                className={`${
                  // || playerPressReady
                  // ownerPressPlay &&
                  playerAllBurnItem &&
                  playerAllReady &&
                  dataPlayers?.room_status === "ready_play" &&
                  "text-secondary-main"
                }  ${isOwnerRoom && " text-error-main"}  ${
                  playerAllReady &&
                  // !playerAllBurnItem &&
                  !ownerPressPlay &&
                  " text-green-lemon" // playerPressReady
                }  ${
                  playerMe &&
                  playerMe.status === "inroom" &&
                  "text-neutral-300 "
                } mx-4 w-full font-neue-machina text-sm `}
              >
                {checkText}
              </Typography>

              {/* owner */}
              {playerAllReady &&
                playerMe?.status === "ready" &&
                // play &&
                dataPlayers?.room_status === "ready_play" && (
                  <ButtonCountdown
                    time
                    endTime={
                      playerAllReady
                        ? new Date(time.setSeconds(time.getSeconds() + 10))
                        : new Date()
                    }
                    handleClick={() => {
                      isOwnerRoom &&
                        (playerAllReady && !ownerPressPlay
                          ? onPlayGame()
                          : !ownerPressPlay &&
                            errorToast(
                              MESSAGES["please-wait-player-all-ready"]
                            ))
                    }}
                    endIcon={
                      isOwnerRoom ? (
                        <HighlightOffIcon className="text-secondary-main " />
                      ) : (
                        <HourglassEmptyIcon className="text-primary-main " />
                      )
                    }
                    className={`h-[60px]  !w-[45%] rounded-full ${
                      isOwnerRoom
                        ? "!w-[30%] border border-secondary-main bg-neutral-900 text-secondary-main"
                        : "!w-[45%] bg-secondary-main text-neutral-900"
                    }   font-bold capitalize`}
                  />
                )}
              {/*  */}

              {/*  */}
              {isOwnerRoom &&
                !ownerPressPlay &&
                playerMe?.status === "ready" &&
                dataPlayers?.room_status !== "ready_play" && (
                  <ButtonPlayer
                    startIcon={
                      <Ellipse fill={playerAllReady ? "#A0ED61" : "#F42728"} />
                    }
                    handleClick={() => {
                      playerAllReady
                        ? onPlayGame()
                        : errorToast(MESSAGES["please-wait-player-all-ready"])
                    }}
                    text={
                      <Typography className="w-full font-neue-machina text-2xl uppercase text-primary-main">
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
              {/* player */}
              {!isOwnerRoom &&
                !playerPressReady &&
                playerMe?.status === "inroom" && (
                  <ButtonPlayer
                    startIcon={<Ellipse fill="#A0ED61" />}
                    handleClick={onReady}
                    text={
                      loading ? (
                        <CircularProgress
                          color="primary"
                          size={25}
                        />
                      ) : (
                        <Typography className="w-full font-neue-machina text-2xl uppercase text-primary-main">
                          READY
                        </Typography>
                      )
                    }
                    className={` btn-green-rainbow  
                     h-[60px] w-[194px]  rounded-[50px]
                      bg-green-lemon
                  font-bold capitalize text-neutral-900`}
                  />
                )}
              {!isOwnerRoom &&
                playerPressReady &&
                playerMe?.status === "ready" &&
                dataPlayers?.room_status !== "ready_play" && (
                  <ButtonCountdown
                    handleClick={() => {
                      cancelReadyPlayer()
                      setPlayerPressReady(false)
                    }}
                    text={
                      <Typography className="w-[195px] font-neue-machina text-2xl uppercase  text-green-lemon">
                        You are ready
                      </Typography>
                    }
                    endIcon={
                      <HighlightOffIcon className=" text-primary-main" />
                    }
                    className={` h-[60px]  !w-[45%]
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

export default memo(SeatPlayersMulti)
