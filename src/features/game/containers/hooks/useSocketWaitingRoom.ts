/* eslint-disable no-new */
import EVENTS from "@configs/events"
import { IGameRoomListSocket } from "@feature/game/interfaces/IGameService"
import { useSocket } from "@feature/socket"
import { useToast } from "@feature/toast/containers"
import { useRouter } from "next/router"
import { useEffect } from "react"
import helper from "@utils/helper"
import useGameStore from "@stores/game"
import { IPropsSocketRoomList } from "./useSocketRoomList"
import useChatContext from "@feature/chat/containers/contexts/useChatContext"
import { IChat } from "@feature/chat/interface/IChat"
import dayjs from "dayjs"

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

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const kickRoom = (_player_id: string) => {
    socketWaitingRoom.emit(EVENTS.ACTION.WAITING_ROOM_KICKPLAYER, {
      player_id: _player_id
    })
  }

  useEffect(() => {
    socketWaitingRoom.on(EVENTS.LISTENERS.WAITING_ROOM_KICK, (value) => {
      if (gameData) {
        errorToast("You were kicked out of the room.")
        router.push(`/${gameData.path}/roomlist`)
      }
    })
  }, [errorToast, gameData, router, socketWaitingRoom])

  /**
   * @description Calling socket chatting
   */
  const getChat = () => {
    return new Promise((resolve, reject) => {
      socketWaitingRoom.on(EVENTS.LISTENERS.ROOM_MESSAGE, (response: IChat) => {
        if (response) {
          response["time"] = dayjs().format("HH:mm")
          resolve(response)
        } else {
          reject(response)
        }
      })
    })
  }

  /**
   * @description When enter to send message
   */
  const onSend = () => {
    return new Promise((resolve, reject) => {
      socketWaitingRoom.emit(
        EVENTS.ACTION.CHAT_SEND_MESSAGE,
        {
          message: message
        },
        (response: any, error: any) => {
          console.log("response", response)
          if (error) {
            reject(error)
            console.error("Error", error)
          } else {
            setMessage("")
            resolve(response)
          }
          console.log("response", response)
        }
      )
    })
  }

  return {
    socketWaitingRoom,
    onSetConnectedSocket,
    isConnected,
    getPlayersMulti,
    kickRoom,
    room_id,
    getChat,
    onSend
  }
}

export default useSocketWaitingRoom
