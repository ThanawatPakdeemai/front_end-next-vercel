import React from "react"

const useChat = () => {
  const onSend = async () => {
    // socketWaitingRoom.emit(EVENTS.ACTION.CHAT_SEND_MESSAGE, {
    //   message: message
    // })
    // setMessage("")
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
