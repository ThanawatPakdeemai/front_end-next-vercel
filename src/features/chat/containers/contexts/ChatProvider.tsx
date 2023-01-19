import { IChat } from "@feature/chat/interface/IChat"
import React, {
  createContext,
  PropsWithChildren,
  useMemo,
  useState
} from "react"

interface IChatContext {
  message: string
  setMessage: React.Dispatch<React.SetStateAction<string>>
  setChat: React.Dispatch<React.SetStateAction<IChat[]>>
  chat: IChat[]
}
export const ChatContext = createContext<IChatContext>({
  message: "",
  setMessage: () => {},
  chat: [],
  setChat: () => {}
})

ChatContext.displayName = "ChatContext"

export function ChatProvider({ children }: PropsWithChildren) {
  const [message, setMessage] = useState<string>("")
  const [chat, setChat] = useState<IChat[]>([])

  const chatMessage = useMemo(
    () => ({
      chat,
      setChat,
      message,
      setMessage
    }),
    [chat, message]
  )

  return (
    <ChatContext.Provider value={chatMessage}>{children}</ChatContext.Provider>
  )
}
