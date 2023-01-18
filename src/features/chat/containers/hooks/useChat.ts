import EVENTS from "@configs/events"
import CONFIGS from "@configs/index"
import { IChat } from "@feature/chat/interface/IChat"
import useSocketWaitingRoom from "@feature/game/containers/hooks/useSocketWaitingRoom"
import helper from "@utils/helper"
import dayjs from "dayjs"
import { useMemo } from "react"
import { Manager } from "socket.io-client"
import useChatContext from "../contexts/useChatContext"

const useChat = () => {
  const { message, setMessage, setChat, chat } = useChatContext()
  const onSend = async () => {
    // socketWaitingRoom.emit(EVENTS.ACTION.CHAT_SEND_MESSAGE, {
    //   message: message
    // })
    setMessage("")
  }

  const handleInputChat = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      onSend()
    }
  }

  return {
    handleInputChat,
    onSend
  }
}

export default useChat
