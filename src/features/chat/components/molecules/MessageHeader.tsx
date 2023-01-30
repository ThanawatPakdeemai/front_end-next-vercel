import MessageIcon from "@components/icons/MessageIcon"
import React from "react"
import { useTranslation } from "next-i18next"

const MessageHeader = () => {
  const { t } = useTranslation()
  return (
    <div className="mb-4 rounded-lg bg-neutral-800">
      <div className="flex items-center p-3 font-neue-machina-semi text-sm uppercase text-neutral-400">
        <MessageIcon className="mr-2" />
        {`${t("chat")}: ${t("in_room")}`}
      </div>
    </div>
  )
}

export default MessageHeader
