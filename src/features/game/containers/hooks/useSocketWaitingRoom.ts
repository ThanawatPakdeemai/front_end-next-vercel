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

export interface IPropsSocketWaiting extends IPropsSocketRoomList {
  room_id: string
}

const useSocketWaitingRoom = (props: IPropsSocketWaiting) => {
  const { errorToast } = useToast()
  const router = useRouter()
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

  return {
    socketWaitingRoom,
    onSetConnectedSocket,
    isConnected,
    getPlayersMulti,
    kickRoom,
    room_id
  }
}

export default useSocketWaitingRoom
