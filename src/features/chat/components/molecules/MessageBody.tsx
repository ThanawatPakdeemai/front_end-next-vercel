import { IChat } from "@feature/chat/interface/IChat"
import dynamic from "next/dynamic"

const MessageInfo = dynamic(() => import("../atoms/MessageInfo"), {
  suspense: true,
  ssr: false
})

const MessageText = dynamic(() => import("../atoms/MessageText"), {
  suspense: true,
  ssr: false
})

const MessageBody = ({ ...props }: IChat) => (
  <div className="mb-4 flex flex-col gap-2">
    <MessageInfo
      avatar={props.avatar}
      username={props.username}
      time={props.time}
      isMe={props.isMe}
    />
    <MessageText
      message={props.message}
      isMe={props.isMe}
    />
  </div>
)

export default MessageBody
