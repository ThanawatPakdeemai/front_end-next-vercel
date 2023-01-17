/* eslint-disable no-new */
import EVENTS from "@configs/events"
import { IGameRoomListSocket } from "@feature/game/interfaces/IGameService"
import { useSocket } from "@feature/socket"
import { useToast } from "@feature/toast/containers"
import { useRouter } from "next/router"

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

  const kickRoom = (player_id: string) => {
    socketWaitingRoom.emit(EVENTS.ACTION.WAITING_ROOM_KICKPLAYER, {
      player_id
    })
  }

  return {
    socketWaitingRoom,
    onSetConnectedSocket,
    isConnected,
    getPlayersMulti,
    kickRoom
  }
}

export default useSocketWaitingRoom
