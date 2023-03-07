import ButtonIcon from "@components/atoms/button/ButtonIcon"
import SendIcon from "@components/icons/SendIcon"
import useChatContext from "@feature/chat/containers/contexts/useChatContext"
import useChat from "@feature/chat/containers/hooks/useChat"
import { IChat } from "@feature/chat/interface/IChat"
import { Box, TextField } from "@mui/material"
import { useSocketProviderWaiting } from "@providers/SocketProviderWaiting"
// import useProfileStore from "@stores/profileStore"
import React, { useEffect, useMemo } from "react"

const MessageFooter = () => {
  // const profile = useProfileStore((state) => state.profile.data)
  const { handleInputChat } = useChat()
  const { message, setMessage, setChat } = useChatContext()
  const propsSocket = useSocketProviderWaiting()
  const { onSendMessage, getChat } = propsSocket

  const iconmotion = {
    hover: {
      scale: 1.2,
      rotate: 20,
      ease: "easeIn",
      transition: {
        duration: 0.4,
        stiffness: 500,
        type: "spring"
      }
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const manageChat = useMemo(async () => {
    if (getChat) {
      const chat = await getChat()
      // if ((chat as unknown as IChat)?.player_id !== profile?.id)
      setChat((oldData) =>
        [chat as unknown as IChat, ...oldData].filter((ele) => ele)
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getChat])

  useEffect(() => {
    manageChat
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onSendMessage])

  return (
    <Box className="message-input relative flex w-full items-center">
      <TextField
        className="w-full"
        required
        type="text"
        sx={{
          "& .MuiOutlinedInput-root": {
            width: "100%",
            padding: "9px 15px"
          }
        }}
        id="message-input"
        placeholder="Message Here"
        size="medium"
        value={message}
        onKeyPress={handleInputChat}
        onChange={(e) => setMessage(e.target.value)}
        autoComplete="off"
      />
      <ButtonIcon
        variants={iconmotion}
        whileHover="hover"
        transition={{ type: "spring", stiffness: 400, damping: 4 }}
        icon={<SendIcon />}
        className="absolute right-4 flex h-[18px] w-[18px] cursor-pointer items-center justify-center rounded-lg bg-transparent"
        aria-label="send-button"
        onClick={async () => {
          await onSendMessage()
        }}
      />
    </Box>
  )
}
export default MessageFooter
