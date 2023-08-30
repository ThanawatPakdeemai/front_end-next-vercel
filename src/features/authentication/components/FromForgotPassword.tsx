import React, { memo, useState } from "react"
import {
  Box,
  CircularProgress,
  InputAdornment,
  Stack,
  TextField,
  Typography
} from "@mui/material"
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined"
import { useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import dynamic from "next/dynamic"
import { useToast } from "@feature/toast/containers"
import { MESSAGES } from "@constants/messages"
import { isMobile } from "@hooks/useGlobal"
import { useGoogleReCaptcha } from "react-google-recaptcha-v3"
import useResetPassword from "../containers/hooks/useResetPassword"

const ModalCustom = dynamic(
  () => import("@components/molecules/Modal/ModalCustom"),
  {
    suspense: true,
    ssr: false
  }
)
const ButtonToggleIcon = dynamic(
  () => import("@components/molecules/gameSlide/ButtonToggleIcon"),
  {
    suspense: true,
    ssr: false
  }
)
const Icomoon = dynamic(() => import("@components/atoms/icomoon/Icomoon"), {
  suspense: true,
  ssr: false
})
const ButtonLink = dynamic(
  () => import("@components/atoms/button/ButtonLink"),
  {
    suspense: true,
    ssr: false
  }
)
const ModalHeader = dynamic(
  () => import("@components/molecules/Modal/ModalHeader"),
  {
    suspense: true,
    ssr: false
  }
)

interface IEmail {
  _email: string
}

const FromForgotPassword = () => {
  const [open, setOpen] = useState<boolean>(false)
  const { t } = useTranslation()
  const { executeRecaptcha } = useGoogleReCaptcha()

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const { errorToast, successToast } = useToast()
  const { register, handleSubmit } = useForm({
    defaultValues: {
      _email: ""
    }
  })
  const { mutateForgotPassword, isLoading } = useResetPassword()

  const onSubmit = ({ _email }: IEmail) => {
    if (!executeRecaptcha) {
      return
    }
    let _recaptcha = ""
    ;(async () => {
      try {
        _recaptcha = await executeRecaptcha("getCodeVerify")
        await mutateForgotPassword({ _email, _recaptcha })
          .then((_profile) => {
            if (_profile) {
              successToast(MESSAGES.success_get_code)
              handleClose()
            }
          })
          .catch((error: Error) => {
            errorToast(error.message)
          })
      } catch (_error) {
        errorToast("Verify Error")
      }
    })()
  }
  const onError = () => {
    errorToast(MESSAGES.please_fill)
  }

  return (
    <>
      {isMobile ? (
        <Box
          component="div"
          className="flex justify-center text-center"
          onClick={handleOpen}
        >
          <Typography className="text-lg font-bold text-warning-100">
            {t("forgot_password")}
          </Typography>
        </Box>
      ) : (
        <Typography
          className="cursor-pointer text-right text-sm text-neutral-500"
          onClick={handleOpen}
        >
          {t("forgot_password")}
        </Typography>
      )}
      <Box
        component="div"
        className="m-auto w-max p-1"
      >
        <Box
          component="div"
          className="xs:flex-col items-center justify-between gap-1 lg:flex"
        >
          {/* <ButtonLogin handleButton={handleOpen} /> */}
        </Box>
        <ModalCustom
          open={open}
          onClose={handleClose}
          className="w-auto gap-3 rounded-[34px] p-[10px]"
          width={400}
        >
          <Stack
            spacing={3}
            className="md:p-5"
          >
            <ModalHeader
              handleClose={handleClose}
              title="Forget Password"
            />
            <form onSubmit={handleSubmit(onSubmit, onError)}>
              <Box component="div">
                <Typography className="mb-2 font-neue-machina text-sm uppercase  text-neutral-500">
                  Email Address
                </Typography>
                <TextField
                  className="w-full"
                  required
                  type="email"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      width: "100%"
                    }
                  }}
                  {...register("_email")}
                  id="email-login"
                  placeholder="Email"
                  size="medium"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailOutlinedIcon />
                      </InputAdornment>
                    )
                  }}
                />
                <Box
                  component="div"
                  className="mt-8 flex justify-center"
                >
                  <ButtonToggleIcon
                    type="button"
                    className="border border-solid border-neutral-700 bg-transparent font-bold text-white-default !no-underline"
                    text="Back"
                    startIcon={null}
                    handleClick={handleClose}
                    endIcon={
                      <Icomoon className="icon-Full-Arrow-Right text-[#fff]" />
                    }
                    style={{ borderRadius: "24px 0px 0px 24px" }}
                  />
                  <ButtonLink
                    icon={<></>}
                    size="medium"
                    color="secondary"
                    disabled={isLoading}
                    className="min-w-auto h-[40px]  text-sm"
                    sxCustomStyled={{ borderRadius: "0px 24px 24px 0px" }}
                    href=""
                    onClick={() => {}}
                    text={
                      <>
                        {isLoading ? (
                          <CircularProgress
                            color="primary"
                            className="ml-4"
                            size={20}
                          />
                        ) : (
                          "Reset Password"
                        )}
                      </>
                    }
                    type="submit"
                    variant="contained"
                  />
                </Box>
              </Box>
            </form>
          </Stack>
        </ModalCustom>
      </Box>
    </>
  )
}

export default memo(FromForgotPassword)
