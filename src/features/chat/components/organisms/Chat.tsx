import React from "react"
import MessageContent from "../molecules/MessageContent"
import MessageFooter from "../molecules/MessageFooter"
import MessageHeader from "../molecules/MessageHeader"

const Chat = () => (
  <div className="h-[490px] max-w-[333px] gap-2 rounded-2xl border-[1px] border-neutral-700 border-opacity-80 p-4 md:flex-row">
    <MessageHeader />
    <MessageContent />
    <MessageFooter />
  </div>
)

export default Chat
