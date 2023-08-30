/* eslint-disable no-unused-vars */
import React, { useState } from "react"
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  SwipeableDrawer,
  TextField,
  Typography
} from "@mui/material"
import { useTranslation } from "react-i18next"
import dynamic from "next/dynamic"
import useFormLoginController from "@feature/authentication/containers/hooks/useFormLoginController"
import useLoadingStore from "@stores/loading"
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3"

const FromForgotPassword = dynamic(
  () => import("@feature/authentication/components/FromForgotPassword"),
  {
    suspense: true,
    ssr: false
  }
)
const CreateAccountModal = dynamic(() => import("./CreateAccountModal"), {
  suspense: true,
  ssr: false
})
const LogoNakaBigIcon = dynamic(
  () => import("@components/atoms/svg/LogoNakaBigIcon"),
  {
    suspense: true,
    ssr: false
  }
)
const Icomoon = dynamic(() => import("@components/atoms/icomoon/Icomoon"), {
  suspense: true,
  ssr: false
})

interface INotificationModalProps {
  open: boolean
  setOpenLogin: (_toggle: boolean) => void
}

const LoginModal = ({ open, setOpenLogin }: INotificationModalProps) => {
  const { onSubmitLogin, handleSubmit, register } = useFormLoginController()
  const { open: openLoading } = useLoadingStore()

  const { t } = useTranslation()

  const [showPassword, setShowPassword] = useState(false)
  const [openModalCreateAccount, setOpenModalCreateAccount] =
    useState<boolean>(false)

  return (
    <SwipeableDrawer
      anchor="right"
      open={open}
      onClose={() => {}}
      onOpen={() => {}}
      disableSwipeToOpen={false}
      ModalProps={{
        keepMounted: true
      }}
      sx={{
        ".MuiDrawer-paper": {
          background: "#121212",
          width: "100%",
          justifyContent: "center"
        }
      }}
    >
      <Box
        component="div"
        className={`login-modal flex h-full flex-col
        p-[8px_24px_36px] ${openLoading ? "opacity-0" : ""}`}
      >
        <button
          type="button"
          aria-label="Back"
          onClick={() => setOpenLogin(false)}
          className="text-left"
        >
          <Icomoon className="icon-app icon-Arrow---Left text-[32px] text-white-primary" />
        </button>
        <Box
          component="div"
          className="flex justify-center"
        >
          <LogoNakaBigIcon />
        </Box>
        <Typography className="my-8 text-center font-urbanist text-2xl font-bold uppercase text-white-default">
          Login with Email
        </Typography>
        <form onSubmit={handleSubmit(onSubmitLogin)}>
          <TextField
            className="w-full"
            type="email"
            placeholder={String(t("email"))}
            {...register("_email")}
            sx={{
              "& .MuiOutlinedInput-root": {
                width: "100%",
                height: "60px",
                borderRadius: "16px",
                fontWeight: 400,
                fontSize: 16,
                fontFamily: "Urbanist",
                color: "#9E9E9E",
                input: {
                  "&:-webkit-autofill": {
                    borderRadius: "0 16px 16px 0 !important",
                    padding: "0 10px !important"
                  }
                }
              },
              "& .MuiInputLabel-root": {
                color: "#70727B",
                fontFamily: "neueMachina",
                textTransform: "uppercase"
              }
            }}
            id="email"
            size="medium"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Icomoon className="icon-app-bold icon-Message" />
                </InputAdornment>
              )
            }}
          />
          <TextField
            className="my-6 w-full"
            type={showPassword ? "text" : "password"}
            placeholder={`${t("password")}`}
            autoComplete="new-password'"
            {...register("_password")}
            sx={{
              "& .MuiOutlinedInput-root": {
                width: "100%",
                height: "60px",
                borderRadius: "16px",
                fontWeight: 400,
                fontSize: 16,
                fontFamily: "Urbanist",
                color: "#9E9E9E",
                input: {
                  "&:-webkit-autofill": {
                    borderRadius: "0 !important",
                    padding: "0 10px !important"
                  }
                }
              },
              "& .MuiInputLabel-root": {
                width: "max-content",
                color: "#70727B",
                fontFamily: "neueMachina",
                textTransform: "uppercase",
                paddingTop: "0.5rem",
                paddingBottom: "0.5rem"
              }
            }}
            id="password"
            size="medium"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Icomoon className="icon-app-bold icon-Lock" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? (
                      <Icomoon className="icon-app-bold icon-Show" />
                    ) : (
                      <Icomoon className="icon-app-bold icon-Hide" />
                    )}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <Box
            component="div"
            className="flex justify-center"
          >
            <Button
              type="submit"
              aria-label="Sign in"
              variant="contained"
              className="mb-6 h-[50px] w-[293px] rounded-bl-3xl border border-solid border-error-100 !bg-error-100"
            >
              <div className="flex items-center font-urbanist text-base font-bold">
                Sign in
              </div>
            </Button>
          </Box>
        </form>
        {/* Modal ForgotPassword */}
        <GoogleReCaptchaProvider
          reCaptchaKey={`${process.env.NEXT_PUBLIC_KEY_RECAPTCHA}`}
          scriptProps={{
            async: true,
            defer: false,
            appendTo: "head",
            nonce: undefined
          }}
        >
          <FromForgotPassword />
        </GoogleReCaptchaProvider>

        {/* <Box
          component="div"
          className="py-6"
        >
          <Divider className="font-urbanist text-lg font-semibold text-white-default">
            or continue with
          </Divider>
        </Box>
        <MoreLoginMobile /> */}
        <Box
          component="div"
          className="flex justify-center py-7 text-center"
        >
          <p className="pr-2 text-sm font-normal text-[#fff]">
            Already have an account?
          </p>
          <Typography
            onClick={() => setOpenModalCreateAccount(!openModalCreateAccount)}
            className="text-sm font-normal text-warning-100"
          >
            Sign up
          </Typography>
        </Box>
        {/* Modal CreateNewAccountModal */}
        {openModalCreateAccount && (
          <CreateAccountModal
            open={openModalCreateAccount}
            setOpenLogin={(_toggle) => setOpenModalCreateAccount(_toggle)}
          />
        )}
      </Box>
    </SwipeableDrawer>
  )
}

export default LoginModal
