import EVENTS from "@configs/events"
import { IResSocketRoomList } from "@feature/game/interfaces/IGameService"
import { useSocket } from "@feature/socket"
import { useState } from "react"

export interface IPropsSocketRoomList {
  path: string
  player_id: string
  game_id: string
  item_id: string | undefined
}

const useSocketRoomList = (props: IPropsSocketRoomList) => {
  const { path, player_id, game_id, item_id } = props
  const [search, setSearch] = useState("")
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

  const getRoomListMultiPlayer = () =>
    new Promise((resolve, reject) => {
      if (search === "")
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
    }).catch((_err) => {})

  const getRoomFromSearch = () =>
    new Promise((resolve, reject) => {
      if (search !== "")
        socketRoomList.on(
          EVENTS.LISTENERS.LOBBY_SEARCH_DATA,
          (response: IResSocketRoomList) => {
            if (response) {
              resolve(response)
            } else {
              reject(response)
            }
          }
        )
    }).catch((_err) => {})

  const searchRoom = (_searchRoom: string) =>
    new Promise(() => {
      if (isConnected) {
        if (_searchRoom.trim() !== "") {
          setSearch(_searchRoom)
          socketRoomList.emit(EVENTS.ACTION.LOBBY_SEARCH, {
            room_code: _searchRoom
          })
        } else {
          setSearch("")
          socketRoomList.emit(EVENTS.ACTION.LOBBY_IN)
        }
      }
    })

  return {
    socketRoomList,
    onSetConnectedSocket,
    isConnected,
    getRoomListMultiPlayer,
    searchRoom,
    getRoomFromSearch,
    search
  }
}

export default useSocketRoomList
