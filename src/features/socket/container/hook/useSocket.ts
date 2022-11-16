import { useCallback, useRef, useState } from "react"
import { Socket } from "socket.io-client"
import { socketSetupManager } from "@src/features/socket/container/socketSetup"

interface IUseSocket {
  path: string
}

export function useSocket({ path }: IUseSocket) {
  const [isConnected, setIsConnected] = useState(false)
  const socketInit = useRef<Socket>(socketSetupManager.socket(`${path}`))

  const onSetConnectedSocket = useCallback((_status: boolean) => {
    setIsConnected(_status)
  }, [])

  return {
    socketInit: socketInit.current,
    isConnected,
    onSetConnectedSocket
  }
}
