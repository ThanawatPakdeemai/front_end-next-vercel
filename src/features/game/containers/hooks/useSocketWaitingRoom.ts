import EVENTS from "@configs/events"
import { IGameRoomListSocket } from "@feature/game/interfaces/IGameService"
import { useSocket } from "@feature/socket"
import { useToast } from "@feature/toast/containers"
import { useRouter } from "next/router"
import { IChat } from "@feature/chat/interface/IChat"
import dayjs from "dayjs"
import useChatContext from "@feature/chat/containers/contexts/useChatContext"
import { useCallback, useEffect } from "react"
import useGameStore from "@stores/game"
import { MESSAGES } from "@constants/messages"
import { burnItem } from "@feature/inventory/containers/services/inventory.service"
import { IBurnItemResponse } from "@feature/inventory/interfaces/IInventoryService"
import { IPropsSocketRoomList } from "./useSocketRoomList"

export interface IPropsSocketWaiting extends IPropsSocketRoomList {
  room_id: string
}

const useSocketWaitingRoom = (props: IPropsSocketWaiting) => {
  const { errorToast, successToast } = useToast()
  const router = useRouter()
  const { message, setMessage } = useChatContext()

  const gameData = useGameStore((state) => state.data)

  const { path, player_id, game_id, room_id, item_id } = props

  const {
    socketInit: socketWaitingRoom,
    onSetConnectedSocket,
    isConnected
  } = useSocket({
    path,
    query: {
      player_id,
      game_id,
      room_id,
      item_id
    }
  })

  /**
   *
   * @returns
   */
  const getPlayersMulti = () =>
    new Promise((resolve, reject) => {
      socketWaitingRoom.on(
        EVENTS.LISTENERS.WAITING_ROOM_ONLINE,
        (response: IGameRoomListSocket) => {
          if (response) {
            resolve(response)
          } else {
            reject(response)
          }
        }
      )
    })

  /**
   *
   * @param _player_id
   */
  const kickRoom = (_player_id: string) => {
    socketWaitingRoom.emit(EVENTS.ACTION.WAITING_ROOM_KICKPLAYER, {
      player_id: _player_id
    })
  }

  const cancelReadyPlayer = () => {
    socketWaitingRoom.emit(EVENTS.ACTION.WAITING_ROOM_CANCEL)
    successToast(MESSAGES["you-cancel-ready"])
  }

  const startGame = () => {
    socketWaitingRoom.emit(EVENTS.ACTION.WAITING_ROOM_START, {
      player_id,
      room_id
    })
  }

  const waitingRoomPlay = () => {
    socketWaitingRoom.emit(EVENTS.ACTION.WAITING_ROOM_PLAY)
  }

  useEffect(() => {
    // check room time out
    socketWaitingRoom.on(EVENTS.LISTENERS.WAITING_ROOM_TIMEOUT, () => {
      if (gameData) {
        errorToast(MESSAGES["room-expried"])
        router.push(`/${router.query.typeGame}/${gameData.path}/roomlist`)
      }
    })
  }, [errorToast, gameData, router, socketWaitingRoom])

  useEffect(() => {
    // check owner kick
    socketWaitingRoom.on(EVENTS.LISTENERS.WAITING_ROOM_KICK, () => {
      if (gameData) {
        errorToast(MESSAGES["you-were-kicked"])
        router.push(`/${router.query.typeGame}/${gameData.path}/roomlist`)
      }
    })
  }, [errorToast, gameData, router, socketWaitingRoom])

  /**
   * @description Calling socket chatting
   */
  const getChat = useCallback(
    () =>
      new Promise((resolve, reject) => {
        socketWaitingRoom.on(
          EVENTS.LISTENERS.ROOM_MESSAGE,
          (response: IChat) => {
            if (response) {
              response["time"] = dayjs().format("HH:mm A")
              resolve(response)
            } else {
              reject(response)
            }
          }
        )
      }),
    [socketWaitingRoom]
  )

  const onSendMessage = async () => {
    await socketWaitingRoom.emit(EVENTS.ACTION.CHAT_SEND_MESSAGE, {
      message
    })
    await setMessage("")
    await getChat()
  }

  /**
   *
   * @param _player_id
   * @param _item_burn
   * @returns
   */
  const waitingRoomItemBurnAction = (_player_id: string, _item_burn: boolean) =>
    socketWaitingRoom.emit(EVENTS.ACTION.WAITING_ROOM_ITEMBURN, {
      player_id: _player_id,
      item_burn: _item_burn
    })

  /**
   *
   * @returns
   */
  const waitingRoomReadyAction = () =>
    socketWaitingRoom.emit(EVENTS.ACTION.WAITING_ROOM_READY)

  const waitingRoomRollbackAction = () =>
    socketWaitingRoom.emit(EVENTS.ACTION.WAITING_ROOM_DATA_ROLLBACK)

  /**
   *
   * @param _item_id
   * @param _qty
   * @param _owner
   * @returns
   */
  const burnItemNowStatus = (_item_id: string, _qty: number, _owner: boolean) =>
    new Promise((resolve, reject) => {
      burnItem({
        player_id,
        item_id: _item_id,
        room_id,
        qty: _qty
      }).then(async (_res: IBurnItemResponse) => {
        if (_res) {
          resolve(_res.status)
          successToast(MESSAGES["you-burn-item"])
        }
        reject(_res)
      })
    })

  /**
   *
   * @param status
   */
  const transactionAction = (status: boolean) => {
    socketWaitingRoom.emit(EVENTS.ACTION.WAITING_ROOM_TRANSACTION_PROCESS, {
      status
    })
  }

  /**
   *
   * @description for player
   * @param _player
   * @param _item_id
   * @param _qty
   * @param _owner
   * @returns
   */
  const onReadyPlayerBurnItem = (
    _item_burn: boolean,
    _item_id: string,
    _qty: number
  ) =>
    new Promise((resolve) => {
      if (_item_burn) {
        // system burn item
        waitingRoomReadyAction()
        resolve(true)
      }

      // system not burn item
      transactionAction(true)
      burnItemNowStatus(_item_id, _qty, false).then((res) => {
        if (res) {
          transactionAction(false)
          waitingRoomReadyAction()
          waitingRoomItemBurnAction(player_id, true)
          successToast(MESSAGES["burn-item-success"])
          resolve(true)
        } else {
          transactionAction(false)
          MESSAGES["transaction-error"]
          resolve(false)
        }
      })
    })

  /**
   *
   * @description for owner
   * @param _player
   * @param _item_id
   * @param _qty
   * @param _isOwner
   * @returns
   */
  const onOwnerBurnItem = (
    _item_burn: boolean,
    _item_id: string,
    _qty: number
  ) =>
    new Promise((resolve) => {
      if (!_item_burn) {
        transactionAction(true)
        burnItemNowStatus(_item_id, _qty, true).then((res) => {
          if (res) {
            transactionAction(false)
            waitingRoomItemBurnAction(player_id, true)
            resolve(true)
          } else {
            transactionAction(false)
            waitingRoomRollbackAction()
            errorToast(MESSAGES["transaction-error"])
            resolve(false)
          }
        })
      }
      transactionAction(false)
      waitingRoomItemBurnAction(player_id, true)
      resolve(true)
    })

  const getPlayersCheckItemOfPlayerListen = useCallback(
    () =>
      new Promise((resolve, reject) => {
        socketWaitingRoom.on(EVENTS.LISTENERS.WAITING_ROOM_ITEM, (response) => {
          if (response) {
            resolve(response)
          } else {
            reject(response)
          }
        })
      }),
    [socketWaitingRoom]
  )

  const getPlayersCheckRoomRollbackListen = useCallback(
    () =>
      new Promise((resolve, reject) => {
        socketWaitingRoom.on(
          EVENTS.LISTENERS.WAITING_ROOM_ROLLBACK,
          (response) => {
            if (response) {
              resolve(response)
            } else {
              reject(response)
            }
          }
        )
      }),
    [socketWaitingRoom]
  )

  useEffect(() => {
    getPlayersCheckRoomRollbackListen()
  }, [getPlayersCheckRoomRollbackListen, isConnected])

  useEffect(() => {
    getPlayersCheckItemOfPlayerListen()
  }, [getPlayersCheckItemOfPlayerListen, isConnected])

  return {
    socketWaitingRoom,
    onSetConnectedSocket,
    isConnected,
    getPlayersMulti,
    kickRoom,
    room_id,
    getChat,
    onSendMessage,
    cancelReadyPlayer,
    onReadyPlayerBurnItem,
    onOwnerBurnItem,
    getPlayersCheckItemOfPlayerListen,
    getPlayersCheckRoomRollbackListen,
    burnItemNowStatus,
    startGame,
    waitingRoomPlay
  }
}

export default useSocketWaitingRoom
