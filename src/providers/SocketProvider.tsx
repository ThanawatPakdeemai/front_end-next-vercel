import SocketContext from "@src/features/socket/containers/contexts/socketContext"
import { socketSetupManager } from "@src/features/socket/containers/socketSetup"
import { PropsWithChildren, useMemo } from "react"

function SocketProvider({ children }: PropsWithChildren<unknown>) {
  const socket = useMemo(() => ({ socketIO: socketSetupManager }), [])

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  )
}

export default SocketProvider
