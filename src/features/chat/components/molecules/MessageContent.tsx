import React from "react"
import MessageBody from "./MessageBody"

const MessageContent = () => (
  <div className="messages-list relative">
    <div className="custom-scroll h-[347px] overflow-y-scroll pr-4">
      <MessageBody
        message="Hey, is anyone up for a match?"
        username="Birgit Smith"
        avatar="https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/naka-punk-new/9988.png"
        date="02:18 PM"
        isMe={false}
      />
      <MessageBody
        message="Hey, is anyone up for a match?"
        username="Birgit Smith"
        avatar="https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/naka-punk-new/9988.png"
        date="02:18 PM"
        isMe={false}
      />
      <MessageBody
        message="Hey, is anyone up for a match?"
        username="Birgit Smith"
        avatar="https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/naka-punk-new/9988.png"
        date="02:18 PM"
        isMe
      />
      <MessageBody
        message="Hey, is anyone up for a match?"
        username="Birgit Smith"
        avatar="https://nakamoto-prod-new.s3.eu-central-1.amazonaws.com/naka-punk-new/9988.png"
        date="02:18 PM"
        isMe={false}
      />
    </div>
    <div className="absolute bottom-0 left-0 h-20 w-full bg-gradient-to-b from-neutral-900/0 to-neutral-900" />
  </div>
)
export default MessageContent
