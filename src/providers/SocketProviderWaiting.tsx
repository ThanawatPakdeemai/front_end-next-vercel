/* eslint-disable react/jsx-no-constructed-context-values */
import { ReactNode, createContext, useContext, useMemo } from "react"

interface IPropSocket {
  kickRoom: (_player_id: string) => void
  onSendMessage: () => void
  cancelReadyPlayer: () => void
  onReadyPlayerBurnItem: (
    _itemBurn: boolean,
    _item_id: string,
    _qty: number
  ) => void
}
interface IProp {
  propsSocket: IPropSocket
  children: ReactNode // PropsWithChildren<unknown>
}

const SocketContext = createContext<IPropSocket>({
  kickRoom: () => {},
  cancelReadyPlayer: () => {},
  onSendMessage: () => {},
  onReadyPlayerBurnItem: () => {}
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
