import React from "react"
import Image from "next/image"
import MessageText, { IMessageTextProps } from "./MessageText"

interface IMessageInfoProps {
  avatar: string
  username: string
  date: string
  isMe: boolean
}

const MessageInfo = ({ avatar, username, date, isMe }: IMessageInfoProps) => (
  <div
    className={`mb-2 flex items-center gap-3 font-neue-machina-semi ${
      isMe ? "flex-row-reverse text-right" : ""
    }`}
  >
    <Image
      src={avatar}
      alt="avatar"
      width={30}
      height={30}
      className="rounded-lg"
    />
    <div>
      <div className="text-sm uppercase text-neutral-400">{username}</div>
      <div className="text-xs text-neutral-600">{date}</div>
    </div>
  </div>
)

export default MessageInfo
