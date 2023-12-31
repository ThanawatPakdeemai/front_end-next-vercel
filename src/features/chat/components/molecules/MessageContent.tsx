import useChatContext from "@feature/chat/containers/contexts/useChatContext"
import useProfileStore from "@stores/profileStore"
import dynamic from "next/dynamic"
import React from "react"
import { v4 as uuidv4 } from "uuid"

const MessageBody = dynamic(() => import("./MessageBody"), {
  suspense: true,
  ssr: false
})

interface IProps {
  height?: string
  heightParent?: string
}
const MessageContent = ({ height, heightParent }: IProps) => {
  const profile = useProfileStore((state) => state.profile.data)
  const { chat } = useChatContext()

  return (
    <div className={`messages-list relative ${heightParent}`}>
      <div
        className={`custom-scroll flex ${
          height || "h-[347px]"
        } flex-col-reverse overflow-y-scroll pr-4`}
      >
        {chat.map((data) => (
          <MessageBody
            message={data.message}
            username={data.username}
            avatar={data.avatar}
            time={data.time}
            player_id={data.player_id}
            isMe={data.player_id === profile?.id}
            key={uuidv4()}
          />
        ))}
      </div>
      <div className="absolute bottom-0 left-0 h-20 w-full bg-gradient-to-b from-neutral-900/0 to-neutral-900" />
    </div>
  )
}
export default MessageContent
