/* eslint-disable react/jsx-no-constructed-context-values */
import { ReactNode, createContext, useContext, useMemo } from "react"

interface IPropSocket {
  getRoomListMultiPlayer: () => void
  fetchRoom: () => void
  searchRoom: (_searchText: string) => void
}
interface IProp {
  propsSocket: IPropSocket
  children: ReactNode // PropsWithChildren<unknown>
}

const SocketContext = createContext<IPropSocket>({
  getRoomListMultiPlayer: () => {},
  fetchRoom: () => {},
  searchRoom: () => {}
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
export const useSocketProviderRoom = () => useContext(SocketContext)
export default SocketProvider
