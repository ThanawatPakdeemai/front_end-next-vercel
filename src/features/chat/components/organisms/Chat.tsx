import MessageIcon from "@components/icons/MessageIcon"
import React from "react"
import { useTranslation } from "react-i18next"
import MessageContent from "../molecules/MessageContent"
import MessageFooter from "../molecules/MessageFooter"
import PanelHeader from "../../../../components/molecules/PanelHeader"

const Chat = () => {
  const { t } = useTranslation()
  return (
    <div className="h-[490px] max-w-[333px] gap-2 rounded-2xl border-[1px] border-neutral-700 border-opacity-80 p-4 md:flex-row">
      <PanelHeader
        title={`${t("chat")}: ${t("in_room")}`}
        icon={<MessageIcon />}
      />
      <MessageContent />
      <MessageFooter />
    </div>
  )
}

export default Chat
