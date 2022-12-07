export interface ICreateRoom {
  _gameId: string
  _playerId: string
  _walletAddress: string
  _itemId: string
  _mapId: number
  _numberItem: number
  _maxPlayer: number
  _publicRoom: boolean
}

export interface ICurrentPlayerSocket {
  status: string
  item_burn: boolean
  transaction_status: boolean
  _id: string
  player_id: string
  avatar: string
  username: string
  timestamp: Date
  socket_id: string
}

export interface RoomData {
  data?: any
  status: number
}

export interface RoomsMapDetail {
  map_name: string
  map_id: number
  id: any
}

export interface ICreateGetRoom {
  _game_id: string
  _email: string
  _item_id: string
  method?: "get" | "post" | ""
}

export interface ICreateGetRoomDetail {
  data: any
  status: number
}

export interface IRoomMap {
  status: boolean
  data: RoomsMapDetail[]
}
