import services from "@src/configs/axiosGlobalConfig"
import {
  ICreateGetRoom,
  ICreateGetRoomDetail,
  ICreateRoom,
  IRoomMap,
  RoomData
} from "../../interfaces/IRooms"

const createRoom = ({
  _gameId,
  _playerId,
  _walletAddress,
  _maxPlayer,
  _itemId,
  _numberItem,
  _mapId,
  _publicRoom
}: ICreateRoom) =>
  new Promise<RoomData>((resolve, reject) => {
    const data = {
      gameId: _gameId,
      playerId: _playerId,
      walletAddress: _walletAddress,
      maxPlayer: _maxPlayer,
      itemId: _itemId,
      numberItem: _numberItem,
      mapId: _mapId,
      publicRoom: _publicRoom
    }
    services
      .post<RoomData>("/game-multiplayer/create-play", { ...data })
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject(err)
      })
  })

const getRooms = ({ _game_id, _email, _item_id }: ICreateGetRoom) =>
  new Promise<ICreateGetRoomDetail>((resolve, reject) => {
    const data = {
      game_id: _game_id,
      email: _email,
      item_id: _item_id
    }
    services
      .post<ICreateGetRoomDetail>("/game-multiplayer/game-room/public", {
        ...data
      })
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
const getMap = () =>
  new Promise<IRoomMap>((resolve, reject) => {
    services
      .get("/game-map/all-map")
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject(err)
      })
  })

const getRoomAtHome = (game_id: string) =>
  new Promise<ICreateGetRoomDetail>((resolve, reject) => {
    if (game_id) {
      services
        .get(`/gameroom/get-game-id/${game_id}`)
        .then((res) => {
          resolve(res.data)
        })
        .catch((err) => {
          reject(err)
        })
    }
  })

export { createRoom, getRooms, getMap, getRoomAtHome }
