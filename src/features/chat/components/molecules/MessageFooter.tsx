import React from "react"
import _ from "lodash"
import dynamic from "next/dynamic"
import Box from "@mui/material/Box"
import { useSocketProviderWaiting } from "@providers/SocketProviderWaiting"
import useChat from "@feature/chat/containers/hooks/useChat"
import useChatContext from "@feature/chat/containers/contexts/useChatContext"

const ButtonIcon = dynamic(
  () => import("@components/atoms/button/ButtonIcon"),
  {
    suspense: true,
    ssr: false
  }
)
const Icomoon = dynamic(() => import("@components/atoms/icomoon/Icomoon"), {
  suspense: true,
  ssr: false
})
const TextField = dynamic(() => import("@mui/material/TextField"), {
  suspense: true,
  ssr: false
})

const MessageFooter = () => {
  const { handleInputChat } = useChat()
  const { message, setMessage } = useChatContext()
  const propsSocket = useSocketProviderWaiting()
  const { onSendMessage } = propsSocket

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
    <Box
      component="div"
      className="message-input relative flex w-[-webkit-fill-available] items-center"
    >
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
        onKeyPress={(e) => {
          handleInputChat(e)
        }}
        onChange={(e) => setMessage(e.target.value)}
        autoComplete="off"
      />
      <ButtonIcon
        variants={iconmotion}
        whileHover="hover"
        transition={{ type: "spring", stiffness: 400, damping: 4 }}
        icon={<Icomoon className="icon-Send-to" />}
        className="absolute right-4 z-[999] flex h-[18px] w-[18px] cursor-pointer items-center justify-center rounded-lg bg-transparent"
        aria-label="send-button"
        onClick={() => {
          onSendMessage(message)
          setMessage("")
        }}
      />
    </Box>
  )
}
export default MessageFooter
