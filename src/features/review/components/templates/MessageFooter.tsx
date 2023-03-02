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
    <Box className="message-input relative flex w-full items-center">
      <TextField
        className="w-full"
        required
        type="text"
        sx={{
          "& .MuiOutlinedInput-root": {
            width: "100%",
            padding: "9px 40px 9px 14px"
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
        className={`absolute right-4 flex h-[18px] w-[18px] cursor-pointer items-center justify-center rounded-lg bg-transparent ${
          message.length > 10 ? "opacity-100" : "cursor-not-allowed opacity-20"
        }`}
        aria-label="send-button"
        onClick={message.length > 10 ? onSubmit : () => {}}
      />
    </Box>
  )
}

export default MessageFooter
