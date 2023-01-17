import ButtonIcon from "@components/atoms/button/ButtonIcon"
import SendIcon from "@components/icons/SendIcon"
import { Box, TextField } from "@mui/material"
import React from "react"

const MessageFooter = () => {
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
        // {...register("_email")}
        id="message-input"
        placeholder="Message Here"
        size="medium"
      />
      <ButtonIcon
        // onClick={handleOnNotiClick}
        variants={iconmotion}
        whileHover="hover"
        transition={{ type: "spring", stiffness: 400, damping: 4 }}
        icon={<SendIcon />}
        className="absolute right-4 flex h-[18px] w-[18px] cursor-pointer items-center justify-center rounded-lg bg-transparent"
        aria-label="notification-button"
      />
    </Box>
  )
}
export default MessageFooter
