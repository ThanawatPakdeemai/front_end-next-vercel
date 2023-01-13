import CONFIGS from "@configs/index"
import { Manager } from "socket.io-client"

export interface ISocketContext {
  socketIO: Manager
}

export interface IUseSocket {
  path: string
  query?: any
}

export const socketSetupManager = new Manager(`${CONFIGS.BASE_URL.API}`, {
  autoConnect: false,
  reconnection: true,
  secure: true,
  withCredentials: true,
  transports: ["polling", "websocket"]
})
