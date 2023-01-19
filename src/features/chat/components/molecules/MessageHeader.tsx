import MessageIcon from "@components/icons/MessageIcon"
import React from "react"

const MessageHeader = () => (
  <div className="mb-4 rounded-lg bg-neutral-800">
    <div className="flex items-center p-3 font-neue-machina-semi text-sm uppercase text-neutral-400">
      <MessageIcon className="mr-2" />
      Chat : In Room
    </div>
  </div>
)

export default MessageHeader
