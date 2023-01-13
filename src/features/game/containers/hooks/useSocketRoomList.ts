import EVENTS from "@configs/events"
import { IDataRoomListSocket } from "@feature/game/interfaces/IGameService"
import { useSocket } from "@feature/socket"

export interface IPropsSocketRoomList {
  _path: string
  _profileId: string
  _gameId: string
  _itemId: string
}

const useSocketRoomList = (props: IPropsSocketRoomList) => {
  const { _path, _profileId, _gameId, _itemId } = props

  const {
    socketInit: socketRoomList,
    onSetConnectedSocket,
    isConnected
  } = useSocket({
    path: _path,
    query: {
      player_id: _profileId,
      game_id: _gameId,
      item_id: _itemId
    }
  })

  const getRoomListMultiPlayer = () =>
    new Promise((resolve, reject) => {
      socketRoomList.on(
        EVENTS.LISTENERS.LOBBY_ONLINE,
        (response: IDataRoomListSocket) => {
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
