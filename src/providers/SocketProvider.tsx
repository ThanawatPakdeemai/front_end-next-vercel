import { ISocketContext, useSocket } from "@feature/socket"
import { ReactNode, createContext, useContext, useMemo } from "react"

interface IProp {
  propsSocket: any
  children: ReactNode // PropsWithChildren<unknown>
}
function SocketProvider({ propsSocket, children }: IProp) {
  const { setUp } = useSocket({ ...propsSocket })

  const SocketContext = createContext<ISocketContext>({
    socketIO: setUp
  })

  const socket = useMemo(() => ({ socketIO: setUp }), [setUp])

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  )
}

export default SocketProvider
