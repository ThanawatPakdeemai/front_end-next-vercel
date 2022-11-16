import { createContext } from "react"
import { ISocketContext, socketSetupManager } from "../socketSetup"

const SocketContext = createContext<ISocketContext>({
  socketIO: socketSetupManager
})

export default SocketContext
