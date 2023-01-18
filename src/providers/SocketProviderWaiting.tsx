/* eslint-disable react/jsx-no-constructed-context-values */
import { ReactNode, createContext, useContext, useMemo } from "react"

interface IPropSocket {
  // eslint-disable-next-line no-unused-vars
  kickRoom: (player_id: string) => void
  cancelReady: () => void
}
interface IProp {
  propsSocket: IPropSocket
  children: ReactNode // PropsWithChildren<unknown>
}

const SocketContext = createContext<IPropSocket>({
  kickRoom: () => {},
  cancelReady: () => {}
})

function SocketProvider({ propsSocket, children }: IProp) {
  // const { setUp } = useSocket({ ...propsSocket })

  // socketIO: setUp,
  const contextSocket = useMemo(() => propsSocket, [propsSocket])

  return (
    <SocketContext.Provider value={contextSocket}>
      {children}
    </SocketContext.Provider>
  )
}
export const useSocketProviderWaiting = () => useContext(SocketContext)
export default SocketProvider
