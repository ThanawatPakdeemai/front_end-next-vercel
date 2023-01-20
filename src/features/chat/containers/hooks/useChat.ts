import { useSocketProviderWaiting } from "@providers/SocketProviderWaiting"
import React from "react"

const useChat = () => {
  const propsSocket = useSocketProviderWaiting()
  const { onSendMessage } = propsSocket

  const handleInputChat = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      onSendMessage()
    }
  }

  return {
    handleInputChat
  }
}

export default useChat
