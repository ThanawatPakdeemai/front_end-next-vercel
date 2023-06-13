import React, { useState } from "react"
import {
  Box,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  SwipeableDrawer,
  TextField,
  Typography
} from "@mui/material"
import ArrowBackIcon from "@mobile/components/atoms/icons/ArrowBackIcon"
import LogoNakaBigIcon from "@components/icons/LogoNakaBigIcon"
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff"
import VisibilityIcon from "@mui/icons-material/Visibility"
import EmailIcon from "@components/icons/EmailIcon"
import { useTranslation } from "react-i18next"
import Lock2Icon from "@components/icons/Lock2Icon"
import useFormLoginController from "@feature/authentication/containers/hooks/useFormLoginController"
import FromForgotPassword from "@feature/authentication/components/FromForgotPassword"
import MoreLoginMobile from "@mobile/components/atoms/MoreLoginMobile"
import CreateAccountModal from "./CreateAccountModal"

interface INotificationModalProps {
  open: boolean
  setOpenLogin: (_toggle: boolean) => void
}

const LoginModal = ({ open, setOpenLogin }: INotificationModalProps) => {
  const { onSubmitLogin, handleSubmit, register } = useFormLoginController()

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
          width: "100%"
        }
      }}
    >
      <Box
        component="div"
        className="notification-list flex flex-col p-[8px_24px_36px]"
      >
        <ArrowBackIcon onClick={() => setOpenLogin(false)} />
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
                color: "#9E9E9E"
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
                  <EmailIcon />
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
                color: "#9E9E9E"
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
                  <Lock2Icon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
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
        <FromForgotPassword />
        <Box
          component="div"
          className="py-6"
        >
          <Divider className="font-urbanist text-lg font-semibold text-white-default">
            or continue with
          </Divider>
        </Box>
        <MoreLoginMobile />
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
        <CreateAccountModal
          open={openModalCreateAccount}
          setOpenLogin={(_toggle) => setOpenModalCreateAccount(_toggle)}
        />
      </Box>
    </SwipeableDrawer>
  )
}

export default LoginModal
