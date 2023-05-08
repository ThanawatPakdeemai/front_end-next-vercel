import { ChatProvider } from "@feature/chat/containers/contexts/ChatProvider"
import { IconButton } from "@mui/material"
import ChatIcon from "@mui/icons-material/Chat"
import { ModalCustom } from "@components/molecules/Modal/ModalCustom"
import MessageContent from "@feature/chat/components/molecules/MessageContent"
import MessageFooter from "@feature/chat/components/molecules/MessageFooter"
import MessageIcon from "@components/icons/MessageIcon"
import { useTranslation } from "next-i18next"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import PanelHeader from "@feature/game/components/atoms/PanelHeader"

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
                    <ArrowBackIcon />
                  </IconButton>
                  <MessageIcon />
                </>
              }
            />
            <MessageContent height="!h-[calc(100%-120px)] " />
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
