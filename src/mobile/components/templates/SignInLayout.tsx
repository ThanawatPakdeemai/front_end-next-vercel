import React, { useState } from "react"
import { Box, Button, Stack, Typography } from "@mui/material"
import { useTranslation } from "react-i18next"
import CardNoReward from "@feature/game/containers/components/atoms/CardNoReward"
import ButtonLink from "@components/atoms/button/ButtonLink"
import DraftsOutlinedIcon from "@mui/icons-material/DraftsOutlined"
import FacebookIcon from "@components/icons/SocialIcon/FacebookIcon"
import TwitterIcon from "@components/icons/SocialIcon/TwitterIcon"
import GoogleIcon from "@components/icons/SocialIcon/GoogleIcon"
import { ModalCustom } from "@components/molecules/Modal/ModalCustom"
import ModalHeader from "@components/molecules/Modal/ModalHeader"
import FormLogin from "@feature/authentication/components/FormLogin"

const SignInLayout = () => {
  const { t } = useTranslation()

  const [open, setOpen] = useState<boolean>(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <>
      <Box
        component="div"
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform"
      >
        <CardNoReward className="!rounded-none !border-none !bg-transparent" />
        <Typography className="my-8 text-center text-[22px] uppercase text-red-card">
          Welcome Back
        </Typography>
        <div>
          <Button
            variant="contained"
            className="mb-[1.125rem] h-[50px] w-[293px] rounded-lg border border-solid border-neutral-700
!bg-neutral-800 text-xs uppercase hover:border-secondary-main"
            onClick={handleOpen}
          >
            <div className="flex items-center font-neue-machina text-sm font-bold">
              <span className="absolute left-[15px]">
                <DraftsOutlinedIcon />
              </span>
              sign in with Email
            </div>
          </Button>
        </div>
        <div>
          <Button
            variant="contained"
            className="mb-[1.125rem] h-[50px] w-[293px] rounded-lg border border-solid border-neutral-700
!bg-neutral-800 text-xs uppercase hover:border-secondary-main"
          >
            <div className="flex items-center font-neue-machina text-sm font-bold">
              <span className="absolute left-[15px]">
                <FacebookIcon />
              </span>
              sign in with Facebook
            </div>
          </Button>
        </div>
        <div>
          <Button
            variant="contained"
            className="mb-[1.125rem] h-[50px] w-[293px] rounded-lg border border-solid border-neutral-700
!bg-neutral-800 text-xs uppercase hover:border-secondary-main"
          >
            <div className="flex items-center font-neue-machina text-sm font-bold">
              <span className="absolute left-[15px]">
                <GoogleIcon />
              </span>
              sign in with Google
            </div>
          </Button>
        </div>
        <div>
          <Button
            variant="contained"
            className="mb-[2.813rem] h-[50px] w-[293px] rounded-lg border border-solid border-neutral-700
!bg-neutral-800 text-xs uppercase hover:border-secondary-main"
          >
            <div className="flex items-center font-neue-machina text-sm font-bold">
              <span className="absolute left-[15px]">
                <TwitterIcon />
              </span>
              sign in with Twitter
            </div>
          </Button>
        </div>
        <Typography className="pb-[1.188rem] text-center text-xs uppercase text-neutral-500">
          Don’t have account
        </Typography>
        <Box
          component="div"
          className="flex justify-center"
        >
          <ButtonLink
            href="/register"
            text={t("Sign up")}
            icon={null}
            size="medium"
            disabledEndIcon
            className="h-[40px] w-auto !min-w-[108px] border border-solid border-neutral-700 text-sm hover:h-[45px]"
          />
        </Box>
      </Box>
      <ModalCustom
        open={open}
        onClose={handleClose}
        className="w-full gap-3 rounded-[34px] p-[10px] md:w-auto"
        width="auto"
      >
        <Stack
          spacing={3}
          className="md:p-5"
        >
          <ModalHeader
            handleClose={handleClose}
            title="Login"
          />

          <FormLogin />
        </Stack>
      </ModalCustom>
    </>
  )
}

export default SignInLayout