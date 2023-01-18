/* eslint-disable no-new */
import EVENTS from "@configs/events"
import { IGameRoomListSocket } from "@feature/game/interfaces/IGameService"
import { useSocket } from "@feature/socket"
import { useToast } from "@feature/toast/containers"
import { useRouter } from "next/router"
import dayjs from "dayjs"
import { IChat } from "@feature/chat/interface/IChat"
import { useState } from "react"
import useChatContext from "@feature/chat/containers/contexts/useChatContext"

export interface IPropsSocketWaiting {
  _path: string
  _profileId: string
  _gameId: string
  _roomId: string
  _itemId: string | undefined
}

const useSocketWaitingRoom = (props: IPropsSocketWaiting) => {
  const { errorToast } = useToast()
  const router = useRouter()
  const { _path, _profileId, _gameId, _itemId, _roomId } = props
  const { message, setMessage } = useChatContext()

  const {
    socketInit: socketWaitingRoom,
    onSetConnectedSocket,
    isConnected
  } = useSocket({
    path: _path,
    query: {
      player_id: _profileId,
      game_id: _gameId,
      room_id: _roomId,
      item_id: _itemId
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

  const handleKick = () => {
    socketWaitingRoom.on(EVENTS.LISTENERS.WAITING_ROOM_KICK, (response) => {
      if (response) {
        errorToast("You were kicked out of the room.")
        router.back()
      }
    })
  }

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
    handleKick,
    getChat,
    onSend
  }
}

export default useSocketWaitingRoom
