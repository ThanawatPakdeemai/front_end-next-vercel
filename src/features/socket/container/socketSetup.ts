import Config from "@src/configs"
import { Manager } from "socket.io-client"

export interface ISocketContext {
  socketIO: Manager
}

export const socketSetupManager = new Manager(`${Config.NEXT_PUBLIC_API_URL}`, {
  autoConnect: false,
  reconnection: true,
  secure: true,
  withCredentials: true,
  transports: ["polling", "websocket"]
})
