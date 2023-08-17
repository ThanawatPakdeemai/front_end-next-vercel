import { IconButton } from "@mui/material"
import ChatIcon from "@mui/icons-material/Chat"
import { useTranslation } from "next-i18next"
import dynamic from "next/dynamic"
import { ChatProvider } from "@feature/chat/containers/contexts/ChatProvider"

const ModalCustom = dynamic(
  () => import("@components/molecules/Modal/ModalCustom"),
  {
    suspense: true,
    ssr: false
  }
)
const PanelHeader = dynamic(
  () => import("@feature/game/components/atoms/PanelHeader"),
  {
    suspense: true,
    ssr: false
  }
)
const MessageContent = dynamic(
  () => import("@feature/chat/components/molecules/MessageContent"),
  {
    suspense: true,
    ssr: false
  }
)
const MessageFooter = dynamic(
  () => import("@feature/chat/components/molecules/MessageFooter"),
  {
    suspense: true,
    ssr: false
  }
)
const Icomoon = dynamic(() => import("@components/atoms/icomoon/Icomoon"), {
  suspense: true,
  ssr: false
})

interface IProps {
  modalChat: boolean
  setModalChat: (_data: boolean) => void
}
const ChatMobile = ({ modalChat, setModalChat }: IProps) => {
  const { t } = useTranslation()
  return (
    <>
      <ChatProvider>
        <IconButton onClick={() => setModalChat(!modalChat)}>
          <ChatIcon />
        </IconButton>
        <ModalCustom
          open={modalChat}
          onClose={() => setModalChat(false)}
          className="m-auto h-full !w-full gap-3 !rounded-less !p-0 max-[420px]:w-[370px]"
          width={515}
          boderChide="!rounded-less h-full w-full"
        >
          <div className="relative h-full">
            <PanelHeader
              title={`${t("chat")}: ${t("in_room")}`}
              icon={
                <>
                  <IconButton onClick={() => setModalChat(false)}>
                    <Icomoon className="icon-Full-Arrow-Left" />
                  </IconButton>
                  <Icomoon className="icon-Two-Messages" />
                </>
              }
            />
            <MessageContent
              height="!h-[calc(100%-120px)] "
              heightParent="h-full"
            />
            <div className=" absolute bottom-0 w-full">
              <MessageFooter />
            </div>
          </div>
        </ModalCustom>
      </ChatProvider>
    </>
  )
}
export default ChatMobile
