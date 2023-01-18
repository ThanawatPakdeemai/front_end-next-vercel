import { IChat } from "@feature/chat/interface/IChat"
import useProfileStore from "@stores/profileStore"
import React, { useState } from "react"
import MessageBody from "./MessageBody"

export interface IMessageContentProps {
  chat: IChat[]
}

const MessageContent = ({ chat }: IMessageContentProps) => {
  const profile = useProfileStore((state) => state.profile.data)
  return (
    <div className="messages-list relative">
      <div className="custom-scroll flex h-[347px] flex-col-reverse overflow-y-scroll pr-4">
        {chat.map((data) => {
          return (
            <MessageBody
              message={data.message}
              username={data.username}
              avatar={data.avatar}
              time={data.time}
              player_id={data.player_id}
              isMe={data.player_id === profile?.id ? true : false}
            />
          )
        })}
      </div>
      <div className="absolute bottom-0 left-0 h-20 w-full bg-gradient-to-b from-neutral-900/0 to-neutral-900" />
    </div>
  )
}
export default MessageContent
