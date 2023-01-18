import { createContext, PropsWithChildren, ReactNode, useState } from "react"

interface IChatContext {
  message: string
  setMessage: React.Dispatch<React.SetStateAction<string>>
}
export const ChatContext = createContext<IChatContext>({
  message: "",
  setMessage: () => ""
})

ChatContext.displayName = "ChatContext"

export function ChatProvider({ children }: PropsWithChildren) {
  const [message, setMessage] = useState<string>("")

  return (
    <ChatContext.Provider
      value={{
        message,
        setMessage
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}
