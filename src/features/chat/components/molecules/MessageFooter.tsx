import ButtonIcon from "@components/atoms/button/ButtonIcon"
import SendIcon from "@components/icons/SendIcon"
import useChatContext from "@feature/chat/containers/contexts/useChatContext"
import useChat from "@feature/chat/containers/hooks/useChat"
import { IChat } from "@feature/chat/interface/IChat"
import { Box, TextField } from "@mui/material"
import { useSocketProviderWaiting } from "@providers/SocketProviderWaiting"
import React, { useCallback, useEffect } from "react"
import _ from "lodash"

const MessageFooter = () => {
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

  const manageChat = useCallback(async () => {
    if (getChat) {
      const chat = await getChat()
      setChat((oldData) => {
        const data = [
          chat as unknown as IChat,
          ..._.uniqWith(oldData, _.isEqual)
        ]
        return _.uniqWith(data, _.isEqual)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    manageChat()
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
        onClick={() => {
          onSendMessage()
        }}
      />
    </Box>
  )
}
export default MessageFooter
