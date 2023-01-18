import { IChat } from "@feature/chat/interface/IChat"
import useSocketWaitingRoom from "@feature/game/containers/hooks/useSocketWaitingRoom"
import {
  createContext,
  PropsWithChildren,
  ReactNode,
  useMemo,
  useState
} from "react"

interface IChatContext {
  message: string
  setMessage: React.Dispatch<React.SetStateAction<string>>
  chat: IChat[]
  setChat: React.Dispatch<React.SetStateAction<IChat[]>>
}
export const ChatContext = createContext<IChatContext>({
  message: "",
  setMessage: () => "",
  chat: [],
  setChat: () => {}
})

ChatContext.displayName = "ChatContext"

export function ChatProvider({ children }: PropsWithChildren) {
  const [message, setMessage] = useState<string>("")
  const [chat, setChat] = useState<IChat[]>([])

  return (
    <ChatContext.Provider
      value={{
        message,
        setMessage,
        chat,
        setChat
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}
