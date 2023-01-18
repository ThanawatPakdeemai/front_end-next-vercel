import EVENTS from "@configs/events"
import { IResSocketRoomList } from "@feature/game/interfaces/IGameService"
import { useSocket } from "@feature/socket"
import helper from "@utils/helper"
import { useEffect } from "react"

export interface IPropsSocketRoomList {
  path: string
  player_id: string
  game_id: string
  item_id: string | undefined
}

const useSocketRoomList = (props: IPropsSocketRoomList) => {
  const { path, player_id, game_id, item_id } = props

  const {
    socketInit: socketRoomList,
    onSetConnectedSocket,
    isConnected
  } = useSocket({
    path,
    query: {
      player_id,
      game_id,
      item_id
    }
  })

  useEffect(() => {
    const token = helper.getTokenFromLocal()

    if (token && !socketRoomList.connected) {
      socketRoomList.auth = { token }
      socketRoomList.connect()
    }

    return () => {
      if (socketRoomList.connected === false) return
      socketRoomList.disconnect()
    }
  }, [socketRoomList])

  const getRoomListMultiPlayer = () =>
    new Promise((resolve, reject) => {
      socketRoomList.on(
        EVENTS.LISTENERS.LOBBY_ONLINE,
        (response: IResSocketRoomList) => {
          if (response) {
            resolve(response)
          } else {
            reject(response)
          }
        }
      )
    })

  return {
    socketRoomList,
    onSetConnectedSocket,
    isConnected,
    getRoomListMultiPlayer
  }
}

export default useSocketRoomList
