import React from "react"
import { useTranslation } from "react-i18next"
import dynamic from "next/dynamic"

const MessageContent = dynamic(() => import("../molecules/MessageContent"), {
  suspense: true,
  ssr: false
})
const MessageFooter = dynamic(() => import("../molecules/MessageFooter"), {
  suspense: true,
  ssr: false
})
const PanelHeader = dynamic(() => import("@components/molecules/PanelHeader"), {
  suspense: true,
  ssr: false
})
const Icomoon = dynamic(() => import("@components/atoms/icomoon/Icomoon"), {
  suspense: true,
  ssr: false
})

const Chat = () => {
  const { t } = useTranslation()
  return (
    <div className="h-[490px] w-full max-w-[333px] gap-2 rounded-2xl border-[1px] border-neutral-700 border-opacity-80 p-4 md:flex-row">
      <PanelHeader
        title={`${t("chat")}: ${t("in_room")}`}
        icon={<Icomoon className="icon-Two-Messages" />}
      />
      <MessageContent />
      <MessageFooter />
    </div>
  )
}

export default Chat
