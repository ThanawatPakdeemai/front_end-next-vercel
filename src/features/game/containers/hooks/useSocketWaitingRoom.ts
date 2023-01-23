import EVENTS from "@configs/events"
import { IGameRoomListSocket } from "@feature/game/interfaces/IGameService"
import { useSocket } from "@feature/socket"
import { useToast } from "@feature/toast/containers"
import { useRouter } from "next/router"
import { IChat } from "@feature/chat/interface/IChat"
import dayjs from "dayjs"
import useChatContext from "@feature/chat/containers/contexts/useChatContext"
import { useEffect } from "react"
import useGameStore from "@stores/game"
import { MESSAGES } from "@constants/messages"
import { IPropsSocketRoomList } from "./useSocketRoomList"

export interface IPropsSocketWaiting extends IPropsSocketRoomList {
  room_id: string
}

const useSocketWaitingRoom = (props: IPropsSocketWaiting) => {
  const { errorToast } = useToast()
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

  const kickRoom = (_player_id: string) => {
    socketWaitingRoom.emit(EVENTS.ACTION.WAITING_ROOM_KICKPLAYER, {
      player_id: _player_id
    })
  }

  const cancelReady = () => {
    socketWaitingRoom.emit(EVENTS.ACTION.WAITING_ROOM_CANCEL)
  }

  useEffect(() => {
    // check room time out
    socketWaitingRoom.on(EVENTS.LISTENERS.WAITING_ROOM_TIMEOUT, () => {
      if (gameData) {
        errorToast(MESSAGES["room-expried"])
        router.push(`/${gameData.path}/roomlist`)
      }
    })
  }, [errorToast, gameData, router, socketWaitingRoom])

  useEffect(() => {
    // check owner kick
    socketWaitingRoom.on(EVENTS.LISTENERS.WAITING_ROOM_KICK, () => {
      if (gameData) {
        errorToast(MESSAGES["you-were-kicked"])
        router.push(`/${gameData.path}/roomlist`)
      }
    })
  }, [errorToast, gameData, router, socketWaitingRoom])

  /**
   * @description Calling socket chatting
   */
  const getChat = () =>
    new Promise((resolve, reject) => {
      socketWaitingRoom.on(EVENTS.LISTENERS.ROOM_MESSAGE, (response: IChat) => {
        if (response) {
          response["time"] = dayjs().format("HH:mm A")
          resolve(response)
        } else {
          reject(response)
        }
      })
    })

  const onSendMessage = () => {
    socketWaitingRoom.emit(EVENTS.ACTION.CHAT_SEND_MESSAGE, {
      message
    })
    setMessage("")
  }

  return {
    socketWaitingRoom,
    onSetConnectedSocket,
    isConnected,
    getPlayersMulti,
    kickRoom,
    room_id,
    getChat,
    onSendMessage,
    cancelReady
  }
}

export default useSocketWaitingRoom
