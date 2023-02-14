import ButtonIcon from "@components/atoms/button/ButtonIcon"
import SendIcon from "@components/icons/SendIcon"
import { iconmotion } from "@components/organisms/Footer"
import useReviewContext from "@feature/review/containers/contexts/useReviewContext"
import useReview from "@feature/review/containers/hook/useReview"
import { Box, TextField } from "@mui/material"

interface IMessageFooter {
  onSubmit: () => void
}

const MessageFooter = ({ onSubmit }: IMessageFooter) => {
  const { handleInputMessage } = useReview()
  const { message, setMessage } = useReviewContext()

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
        onKeyPress={handleInputMessage}
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
        onClick={onSubmit}
      />
    </Box>
  )
}

export default MessageFooter
