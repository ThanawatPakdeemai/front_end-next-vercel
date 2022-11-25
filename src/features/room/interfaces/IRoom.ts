/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ICreateRoom {
  gameId: string
  playerId: string
  walletAddress: string
  itemId: string
  mapId: number
  numberItem: number
  maxPlayer: number
  publicRoom: boolean
}

export interface ICreateRoomDetail {
  no_room: string
  number_of_item: number
  public_room: boolean
  player_create?: any
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
export interface IRoomDataSocket {
  create_room_detail: ICreateRoomDetail
  start_time: Date
  end_time: Date
  room_status: string
  amount_current_player: number
  amount_send_reward: number
  mutiplayer: boolean
  tournament: boolean
  user_create: boolean
  createdAt: Date
  updatedAt: Date
  _id: string
  current_player: ICurrentPlayerSocket[]
  current_player_item_status: any[]
  history_user_play: any[]
  rewards: any[]
  current_time: Date
  game_id: string
  max_players: number
  rank_id: null
  amount_played: number
  is_active: boolean
  status: string
  room_number: number
  id: string
  map_id: number
}

export interface RoomData {
  data?: any
  status: number
}

export interface RoomDataDetail {
  data: {
    no_room: string
    room_id: string
  }
  message: string
  status: number
}

export interface ICreateGetRoom {
  game_id: string
  email: string
  item_id: string
  method?: "get" | "post" | ""
}

export interface ICreateGetRoomDetail {
  data: any
  status: number
}

export interface ICRoomListsContent {
  socket: any
  rooms: any
  search: any
  setRooms: any
  setSearch: any
}
