import useProfileStore from "@stores/profileStore"
import { useRouter } from "next/dist/client/router"
import useGameStore from "@stores/game"
import useBuyGameItemController from "@feature/buyItem/containers/hooks/useBuyGameItemController"
import Helper from "@utils/helper"
import { useCallback, useEffect, useMemo, useState } from "react"
import {
  CurrentPlayer,
  IGameRoomListSocket
} from "@feature/game/interfaces/IGameService"
import { useToast } from "@feature/toast/containers"
import { IResGetIp } from "@interfaces/IGetIP"
import CONFIGS from "@configs/index"
import { IGameItemListData } from "@feature/gameItem/interfaces/IGameItemService"
import { MESSAGES } from "@constants/messages"
import useSocketWaitingRoom from "./useSocketWaitingRoom"
import useGetGameByPath from "./useFindGameByPath"

const baseUrlGame = CONFIGS.BASE_URL.GAME
const baseUrlApi = CONFIGS.BASE_URL.API
const baseUrlFront = CONFIGS.BASE_URL.FRONTEND

const useWaitingMulti = () => {
  const profile = useProfileStore((state) => state.profile.data)
  const { data, itemSelected, onSetGameItemSelectd, onSetGameData } =
    useGameStore()
  const router = useRouter()
  const { id, GameHome } = router.query
  const roomId = id as string
  const { gameData } = useGetGameByPath(GameHome ? GameHome.toString() : "")
  const [ownerPressPlay, setOwnPressPlay] = useState(false)
  const [playerPressReady, setPlayerPressReady] = useState(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [ip, setIp] = useState("")
  const [modalChat, setModalChat] = useState(false)

  const { errorToast } = useToast()
  const [gameUrl, setGameUrl] = useState<string>("")
  const [room_number] = useState<string>("")
  const [rank_name] = useState<string>("multiplayer_rank")
  const [start_time] = useState<string>("")
  const time = new Date()

  // const { errorToast } = useToast()
  const { balanceofItem, gameItemList } = useBuyGameItemController()

  const [dataPlayers, setDataPlayers] = useState<
    IGameRoomListSocket | undefined
  >()

  useEffect(() => {
    let load = false

    if (!load || ip === "") {
      Helper.getIP().then((res) => {
        setIp((res as IResGetIp).ip)
      })
    }

    return () => {
      setIp("")
      load = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const checkItemSelected = useCallback(() => {
    if (gameItemList && dataPlayers) {
      const item = gameItemList?.find(
        (_item: IGameItemListData) => _item.id === dataPlayers.item_id
      )
      if (item) {
        onSetGameItemSelectd(item)
      }
    }
  }, [gameItemList, dataPlayers, onSetGameItemSelectd])

  useEffect(() => {
    let load = false

    if (!load) {
      if (profile) {
        checkItemSelected()
      }
    }

    return () => {
      load = true
    }
  }, [checkItemSelected, profile])

  useEffect(() => {
    let load = false

    if (!load) {
      if (!gameData) return
      onSetGameData(gameData)
    }

    return () => {
      load = true
    }
  }, [gameData, onSetGameData])

  const item_id = useMemo(() => {
    if (data) {
      if (data.play_to_earn || data.tournament) {
        return data.item[0]._id
      }
      if (itemSelected) {
        return itemSelected._id
      }
    } else {
      return ""
    }
  }, [data, itemSelected])

  const propsSocketWaitingRoom = useMemo(
    () => ({
      path: data?.socket_info?.url_room || "",
      room_id: roomId,
      player_id: profile?.id || "",
      game_id: data?._id || "",
      item_id
    }),
    [roomId, data?._id, data?.socket_info?.url_room, item_id, profile?.id]
  )

  const {
    onSetConnectedSocket,
    isConnected,
    socketWaitingRoom,
    getPlayersMulti,
    kickRoom,
    onSendMessage,
    cancelReadyPlayer,
    onReadyPlayerBurnItem,
    onOwnerBurnItem,
    getPlayersCheckItemOfPlayerListen,
    getPlayersCheckRoomRollbackListen,
    room_id,
    waitingRoomPlay,
    startGame,
    getChat
  } = useSocketWaitingRoom({ ...propsSocketWaitingRoom })

  useEffect(() => {
    let load = false

    if (!load) {
      if (profile) {
        const token = Helper.getTokenFromLocal()

        if (token) {
          socketWaitingRoom.auth = { token }
          socketWaitingRoom.connect()
        }
      }
    }

    return () => {
      load = false
      if (socketWaitingRoom.connected === false) return
      socketWaitingRoom.disconnect()
    }
  }, [onSetConnectedSocket, profile, socketWaitingRoom])

  const mapPlayer = useCallback(
    (_dataPlayers: IGameRoomListSocket) => {
      if (_dataPlayers) {
        const _play = _dataPlayers as IGameRoomListSocket
        if ("current_player" in _play) {
          const uniquePlayerIn = _play.current_player.filter(
            (thing, index, self) =>
              index ===
              self.findIndex((_self) => _self?.player_id === thing?.player_id)
          )
          const _data = _dataPlayers as IGameRoomListSocket

          if (_dataPlayers && uniquePlayerIn) {
            const _p = uniquePlayerIn.map((ele) => {
              const owner =
                _data.create_room_detail.player_create === ele.player_id
              return {
                ...ele,
                owner
              }
            })
            const player_blank = Array(
              (_data.max_players <= 8 ? 8 : _data.max_players) - _p.length
            ).map((ele) => ele)
            setDataPlayers({
              ..._data,
              current_player: [..._p, ...player_blank]
            })
          }
        } else {
          errorToast(MESSAGES["no-player"])
        }
      }
    },
    [errorToast]
  )

  useEffect(() => {
    let load = false

    if (!load) {
      if (isConnected) {
        getPlayersMulti().then((res) => {
          if (res) {
            const _data = res as IGameRoomListSocket
            mapPlayer(_data)
            checkItemSelected()
          }
        })
      }
    }

    return () => {
      load = true
    }
  }, [
    checkItemSelected,
    getPlayersMulti,
    isConnected,
    mapPlayer,
    socketWaitingRoom
  ])

  const outRoom = useCallback(() => {
    if (gameData)
      router.push(`/${router.query.typeGame}/${gameData.path}/roomlist`)
  }, [gameData, router])

  /**
   *@description Will run when leaving the current page; on back/forward actions out room this game
   */
  useEffect(() => {
    let load = false

    if (!load) {
      router.beforePopState(({ as }) => {
        if (as !== router.asPath) {
          outRoom()
        }
        return true
      })
    }

    return () => {
      load = true
      router.beforePopState(() => true)
    }
  }, [outRoom, router])

  useEffect(() => {
    let load = false

    if (!load) {
      if (isConnected) {
        getPlayersCheckItemOfPlayerListen().then((res) => {
          if (res) {
            const _data = res as IGameRoomListSocket
            mapPlayer(_data)
            checkItemSelected()
          }
        })
      }
    }

    return () => {
      load = true
    }
  }, [
    getPlayersCheckItemOfPlayerListen,
    isConnected,
    mapPlayer,
    onReadyPlayerBurnItem,
    onOwnerBurnItem,
    gameItemList,
    checkItemSelected
  ])

  useEffect(() => {
    let load = false

    if (!load) {
      if (isConnected) {
        getPlayersCheckRoomRollbackListen().then((res) => {
          if (res) {
            const _data = res as IGameRoomListSocket
            checkItemSelected()
            mapPlayer(_data)
          }
        })
      }
    }

    return () => {
      load = true
    }
  }, [
    getPlayersCheckRoomRollbackListen,
    isConnected,
    mapPlayer,
    onReadyPlayerBurnItem,
    onOwnerBurnItem,
    checkItemSelected
  ])

  const playerInroom = useMemo(() => {
    if (dataPlayers) {
      const __player = [...dataPlayers.current_player].filter((ele) => ele)
      return __player
    }
  }, [dataPlayers])

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
    if (
      playerBurnItem &&
      playerInroom &&
      playerInroom.length > 1 &&
      playerBurnItem.length > 0
    ) {
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
        if (playerNotReady && playerInroom.length < 2) {
          return "The game will begin as soon as all players are ready"
        }
        if (playerAllReady && playerAllBurnItem) {
          return `Everyone's here and we're ready to go. Let's start the game!`
        }
        return "The game will begin as soon as all players are ready..."
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
    let load = false

    if (!load) {
      if (dataPlayers && dataPlayers.room_status === "playing") {
        waitingRoomPlay()
      }
    }

    return () => {
      load = true
    }
  }, [dataPlayers, waitingRoomPlay])

  useEffect(() => {
    let load = false

    if (!load) {
      if (
        dataPlayers?.room_status === "ready_play" &&
        gameUrl &&
        playerInroom &&
        playerReady &&
        playerAllBurnItem
      ) {
        if (playerInroom.length === playerReady.length) {
          setTimeout(() => {
            window.location.href = gameUrl
          }, 10000)
        }
      }
    }

    return () => {
      load = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataPlayers])

  useEffect(() => {
    let load = false

    if (!load) {
      if (
        gameData &&
        itemSelected &&
        profile &&
        gameData.game_type === "multiplayer" &&
        playerInroom &&
        dataPlayers &&
        ip
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
    }

    return () => {
      setGameUrl("")
      load = true
    }
  }, [
    dataPlayers,
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

  const onReady = async () => {
    if (profile) {
      if (
        (gameData && gameData?.play_to_earn_status === "free") ||
        (playerMe &&
          itemSelected &&
          balanceofItem &&
          // balanceofItem.data >= qtyItemOfRoom &&
          dataPlayers &&
          balanceofItem.data >=
            dataPlayers?.create_room_detail.number_of_item &&
          dataPlayers.item_id === itemSelected._id)
      ) {
        setLoading(true)
        if (playerMe && itemSelected && dataPlayers) {
          try {
            await onReadyPlayerBurnItem(
              playerMe?.item_burn,
              itemSelected._id,
              (dataPlayers?.create_room_detail?.number_of_item as number) ?? 1
            )
            await setPlayerPressReady(true)
          } catch (err) {
            setLoading(false)
            setPlayerPressReady(false)
          }
        }
        await setLoading(false)
      } else if (!playerMe) {
        setLoading(false)
        setPlayerPressReady(false)
        errorToast(MESSAGES["no-player"])
      } else if (
        !balanceofItem ||
        (balanceofItem &&
          dataPlayers &&
          balanceofItem.data <
            dataPlayers?.create_room_detail.number_of_item) ||
        (dataPlayers &&
          balanceofItem.data <
            dataPlayers?.create_room_detail.number_of_item) ||
        dataPlayers?.item_id !== itemSelected?._id
      ) {
        if (
          !balanceofItem ||
          (balanceofItem &&
            dataPlayers &&
            balanceofItem.data < dataPlayers?.create_room_detail.number_of_item)
        ) {
          errorToast(MESSAGES["you-not-enough"])
          setLoading(false)
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
          setLoading(false)
        } else {
          setLoading(false)
          errorToast(MESSAGES["please_item"])
        }
        setPlayerPressReady(false)
      } else {
        setLoading(false)
        errorToast(MESSAGES["error-something"])
      }
    } else {
      setPlayerPressReady(false)
      errorToast(MESSAGES["please_login"])
    }
    setLoading(false)
  }

  const onPlayGame = async () => {
    if (profile) {
      if (
        (gameData && gameData?.play_to_earn_status === "free") ||
        (playerMe &&
          itemSelected &&
          playerAllReady &&
          balanceofItem &&
          // balanceofItem.data >= qtyItemOfRoom &&
          dataPlayers &&
          balanceofItem.data >=
            dataPlayers?.create_room_detail.number_of_item &&
          dataPlayers.item_id === itemSelected._id)
      ) {
        if (playerMe && itemSelected && dataPlayers) {
          try {
            await setLoading(true)
            await onOwnerBurnItem(
              playerMe.item_burn,
              itemSelected?._id,
              (dataPlayers?.create_room_detail?.number_of_item as number) ?? 1
            )
            await setLoading(false)
            await setOwnPressPlay(true)
            await startGame()
          } catch (err) {
            await setLoading(false)
          }
        }
      } else if (!playerMe) {
        setLoading(false)
        setOwnPressPlay(false)
        errorToast(MESSAGES["no-player"])
      } else if (
        // qtyItemOfRoom < 1 ||
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
          (balanceofItem &&
            dataPlayers &&
            balanceofItem.data < dataPlayers?.create_room_detail.number_of_item)
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
    await setLoading(false)
  }

  const checkTextCard = useCallback(
    (item: CurrentPlayer) => {
      if (gameData?.game_type === "multiplayer" && dataPlayers) {
        const ownerMe = (dataPlayers?.current_player as CurrentPlayer[])?.find(
          (ele) =>
            ele?.player_id === dataPlayers?.create_room_detail?.player_create
        )

        if (item.owner) {
          return "owner"
        }

        if (!item.owner && item.player_id !== profile?.id) {
          // isn't owner and player_id != profile.id show button kick
          return (
            // eslint-disable-next-line react/button-has-type, jsx-a11y/no-redundant-roles
            !item.owner && ownerMe && ownerMe?.player_id === profile?.id
              ? "kick"
              : "player"
          )
        }
      }
      if (profile?.id === item?.player_id) {
        return "me"
      }

      return "player"
    },
    [dataPlayers, gameData?.game_type, profile?.id]
  )

  return {
    isConnected,
    balanceofItem,
    profile,
    gameData: data,
    itemSelected,
    ip,
    checkText,
    onPlayGame,
    onReady,
    loading,
    time,
    kickRoom,
    cancelReadyPlayer,
    onSendMessage,
    onReadyPlayerBurnItem,
    room_id,
    onOwnerBurnItem,
    dataPlayers,
    waitingRoomPlay,
    startGame,
    getChat,
    checkItemSelected,
    getPlayersMulti,
    mapPlayer,
    checkTextCard,
    isOwnerRoom,
    ownerPressPlay,
    playerMe,
    playerPressReady,
    playerAllReady,
    playerAllBurnItem,
    setPlayerPressReady,
    modalChat,
    setModalChat
  }
}

export default useWaitingMulti
