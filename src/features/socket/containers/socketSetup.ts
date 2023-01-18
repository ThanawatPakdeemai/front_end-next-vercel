import CONFIGS from "@configs/index"
import { Manager } from "socket.io-client"

export interface ISocketWaitingData {
  // eslint-disable-next-line no-unused-vars
  kickRoom: (playerId: string) => void
  room_id: string
}

export interface ISocketRoomData {
  getRoomListMultiPlayer: () => void
}
export interface ISocketContext {
  // socketIO: Manager
  socketWaiting: ISocketWaitingData | undefined
  socketRoomlist: ISocketRoomData | undefined
}

export interface IUseSocket {
  path: string
  query?: any
}

export const dataSetupSocketRoomList = {
  autoConnect: false,
  reconnection: true,
  secure: true,
  withCredentials: true,
  transports: ["polling", "websocket"]
}

// export const socketSetupManager = new Manager(`${CONFIGS.BASE_URL.API}`, {
//   ...dataSetupSocketRoomList
// })
