import { IChat } from "@feature/chat/interface/IChat"
import React, { useMemo, useState } from "react"
import MessageContent, {
  IMessageContentProps
} from "../molecules/MessageContent"
import MessageFooter from "../molecules/MessageFooter"
import MessageHeader from "../molecules/MessageHeader"

const Chat = ({ chat }: IMessageContentProps) => {
  return (
    <div className="h-[490px] max-w-[333px] gap-2 rounded-2xl border-[1px] border-neutral-700 border-opacity-80 p-4 md:flex-row">
      <MessageHeader />
      <MessageContent chat={chat} />
      <MessageFooter />
    </div>
  )
}

export default Chat
