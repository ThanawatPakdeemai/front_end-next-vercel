import React from "react"
import { Box, Button } from "@mui/material"
import FacebookColorIcon from "@components/icons/SocialIcon/FacebookColorIcon"
import GoogleColorIcon from "@components/icons/SocialIcon/GoogleColorIcon"
import TwitterIcon from "@components/icons/SocialIcon/TwitterIcon"
import useFormRegisterController from "@feature/authentication/containers/hooks/useFormRegisterController"

const MoreLoginMobile = () => {
  const { googleRegister } = useFormRegisterController()

  return (
    <Box
      component="div"
      className="flex justify-center gap-5"
    >
      <Button
        variant="outlined"
        className="h-[60px] !min-w-[88px] rounded-2xl border border-solid border-neutral-690 bg-neutral-800"
      >
        <FacebookColorIcon />
      </Button>
      <Button
        variant="outlined"
        className="h-[60px] !min-w-[88px] rounded-2xl border border-solid border-neutral-690 bg-neutral-800"
        onClick={() => googleRegister("")}
      >
        <GoogleColorIcon />
      </Button>
      <Button
        variant="outlined"
        className="h-[60px] !min-w-[88px] rounded-2xl border border-solid border-neutral-690 bg-neutral-800"
      >
        <TwitterIcon
          fill="#1D9BF0"
          width={32}
          height={32}
        />
      </Button>
    </Box>
  )
}

export default MoreLoginMobile
