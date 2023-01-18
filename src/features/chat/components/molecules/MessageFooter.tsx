import ButtonIcon from "@components/atoms/button/ButtonIcon"
import SendIcon from "@components/icons/SendIcon"
import useChatContext from "@feature/chat/containers/contexts/useChatContext"
import useChat from "@feature/chat/containers/hooks/useChat"
import useSocketWaitingRoom from "@feature/game/containers/hooks/useSocketWaitingRoom"
import { Box, TextField } from "@mui/material"
import React, { useState } from "react"

interface IMessageFooter {}

const MessageFooter = ({}: IMessageFooter) => {
  const { handleInputChat } = useChat()
  const { message, setMessage } = useChatContext()
  const { onSend } = useSocketWaitingRoom({
    "_path": "8ballpool-f2p",
    "_roomId": "63c7a5d2c9460f58eb3e35e2",
    "_profileId": "615d8646ef28627d2ff3da0d",
    "_gameId": "63636fb5c81000f1fbb2c0b2",
    _itemId: undefined
  })
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

  return (
    <Box className="message-input relative flex items-center">
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
        onClick={onSend}
      />
    </Box>
  )
}
export default MessageFooter
