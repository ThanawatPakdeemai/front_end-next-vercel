import { IChat } from "@feature/chat/interface/IChat"
import { useSocketProviderWaiting } from "@providers/SocketProviderWaiting"
import React, { useCallback, useEffect } from "react"
import _ from "lodash"
import useChatContext from "../contexts/useChatContext"

const useChat = () => {
  const propsSocket = useSocketProviderWaiting()
  const { onSendMessage, getChat } = propsSocket
  const { setChat, setMessage } = useChatContext()

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

  const handleInputChat = (
    e:
      | React.KeyboardEvent<HTMLDivElement>
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if ((e as React.KeyboardEvent<HTMLDivElement>).key === "Enter") {
      onSendMessage(
        (e as React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>).target
          .value
      )
      manageChat()
      setMessage("")
    }
  }

  useEffect(() => {
    let load = false

    if (!load) manageChat()

    return () => {
      load = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onSendMessage, handleInputChat])

  return {
    handleInputChat,
    manageChat
  }
}

export default useChat
