import { useEffect, useMemo, useState, useCallback } from "react"
import useProfileStore from "@stores/profileStore"
import useGameStore from "@stores/game"
import { useRouter } from "next/router"
import useSocketWaitingRoom from "@feature/game/containers/hooks/useSocketWaitingRoom"
import helper from "@utils/helper"
import { IGameRoomListSocket } from "@feature/game/interfaces/IGameService"
import { useToast } from "@feature/toast/containers"
import { MESSAGES } from "@constants/messages"
import useBuyGameItemController from "@feature/buyItem/containers/hooks/useBuyGameItemController"
import { IGameItemListData } from "@feature/gameItem/interfaces/IGameItemService"
import useGameGlobal from "@hooks/useGameGlobal"
import { IPropWaitingSingle } from "@feature/game/components/templates/waitingRoom/singlePlayer/SingleWaiting"

const useWaitingRoomController = ({ _roomId }: IPropWaitingSingle) => {
  const profile = useProfileStore((state) => state.profile.data)
  const { data: gameData, onSetGameItemSelectd } = useGameStore()
  const router = useRouter()
  const { errorToast } = useToast()
  const { gameItemList } = useBuyGameItemController()
  const [dataPlayers, setDataPlayers] = useState<
    IGameRoomListSocket | undefined
  >()
  const {
    item: item_id
    // conditionGameFree
    // itemSelected,
    // conditionPlayToEarn
  } = useGameGlobal()

  // const item_id = useMemo(() => {
  //   if (gameData) {
  //     if (gameData.play_to_earn || gameData.tournament) {
  //       return gameData.item[0]._id
  //     }
  //     if (itemSelected) {
  //       return itemSelected._id
  //     }
  //   } else {
  //     return ""
  //   }
  // }, [gameData, itemSelected])

  const propsSocketWaitingRoom = useMemo(
    () => ({
      path: gameData?.socket_info?.url_room ?? "",
      room_id: _roomId,
      player_id: profile?.id ?? "",
      game_id: gameData?._id ?? "",
      item_id
    }),
    [
      _roomId,
      gameData?._id,
      gameData?.socket_info?.url_room,
      item_id,
      profile?.id
    ]
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
        const token = helper.getTokenFromLocal()

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
          const data = _dataPlayers as IGameRoomListSocket

          if (_dataPlayers && uniquePlayerIn) {
            const _p = uniquePlayerIn.map((ele) => {
              const owner =
                data.create_room_detail.player_create === ele.player_id
              return {
                ...ele,
                owner
              }
            })
            const player_blank = Array(
              (data.max_players <= 8 ? 8 : data.max_players) - _p.length
            ).map((ele) => ele)
            setDataPlayers({
              ...data,
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
      if (isConnected) {
        getPlayersMulti().then((res) => {
          if (res) {
            const data = res as IGameRoomListSocket
            mapPlayer(data)
            checkItemSelected()
          }
        })
      }
    }

    return () => {
      load = true
    }
  }, [checkItemSelected, getPlayersMulti, isConnected, mapPlayer])

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

  /**
   * @description Calling chatting function
   */
  // const onChat = useCallback(async () => {
  //   const _dataChat = await getChat()
  //   if (_dataChat) {
  //     setChat((oldData) => [_dataChat as IChat, ...oldData])
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

  // useEffect(() => {
  //   if (isConnected) {
  //     getChat()
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [onSendMessage])

  useEffect(() => {
    let load = false

    if (!load) {
      if (isConnected) {
        getPlayersCheckItemOfPlayerListen().then((res) => {
          if (res) {
            const data = res as IGameRoomListSocket
            mapPlayer(data)
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
            const data = res as IGameRoomListSocket
            checkItemSelected()
            mapPlayer(data)
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
  return {
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
    gameData,
    outRoom
  }
}

export default useWaitingRoomController
