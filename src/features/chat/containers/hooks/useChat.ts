import { IChat } from "@feature/chat/interface/IChat"
import { useSocketProviderWaiting } from "@providers/SocketProviderWaiting"
import React, { useCallback, useEffect } from "react"
import _ from "lodash"
import useChatContext from "../contexts/useChatContext"

const useChat = () => {
  const propsSocket = useSocketProviderWaiting()
  const { onSendMessage, getChat } = propsSocket
  const { setChat } = useChatContext()

  const manageChat = useCallback(async () => {
    if (getChat) {
      const chat = await getChat()
      setChat((oldData) => {
        const data = [
          chat as unknown as IChat,
          ..._.uniqWith(oldData, _.isEqual)
        ]
        return _.uniqWith(data, _.isEqual)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleInputChat = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      onSendMessage()
      manageChat()
    }
  }

  useEffect(() => {
    let load = false

    if (!load) manageChat()

    return () => {
      load = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onSendMessage])

  return {
    handleInputChat,
    manageChat
  }
}

export default useChat
