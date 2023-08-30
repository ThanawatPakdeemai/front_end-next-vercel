import React, { useState } from "react"
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Link,
  SwipeableDrawer,
  TextField,
  Typography
} from "@mui/material"
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff"
import VisibilityIcon from "@mui/icons-material/Visibility"
import CheckBoxOutlineBlankOutlinedIcon from "@mui/icons-material/CheckBoxOutlineBlankOutlined"
import { useTranslation } from "react-i18next"
import { useForm } from "react-hook-form"
import dynamic from "next/dynamic"
import useFormRegisterController from "@feature/authentication/containers/hooks/useFormRegisterController"
import useFormController from "@feature/authentication/containers/hooks/useFormController"

const MoreLoginMobile = dynamic(
  () => import("@mobile/components/atoms/MoreLoginMobile"),
  {
    suspense: true,
    ssr: false
  }
)
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

const CreateAccountModal = ({
  open,
  setOpenLogin
}: INotificationModalProps) => {
  const {
    verifiCode,
    showPassword,
    onSubmitRegister,
    onClickGetCode,
    isNumber,
    isCharacters,
    handleClickShowPassword,
    showConfirmPassword,
    handleClickShowConfirmPassword
  } = useFormRegisterController()

  const { register, handleSubmit } = useForm()
  const { isEmail, patternCode, emailCorrect } = useFormController()
  const [email, setEmail] = useState<string>("")

  const { t } = useTranslation()

  const onSubmit = (data) => {
    onSubmitRegister(data)
  }

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
        <button
          type="button"
          aria-label="Back"
          onClick={() => setOpenLogin(false)}
        >
          <Icomoon className="icon-Full-Arrow-Left" />
        </button>
        <Box
          component="div"
          className="flex justify-center"
        >
          <LogoNakaBigIcon />
        </Box>
        <Typography className="my-8 text-center font-urbanist text-2xl font-bold uppercase text-white-default">
          Create New Account
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            className="w-full"
            type="email"
            placeholder={String(t("email"))}
            onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
              isEmail(e.target.value.toString())
              setEmail(e.target.value)
            }}
            {...register("email")}
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
                  <Icomoon className="icon-Mail-Closed" />
                </InputAdornment>
              )
            }}
          />
          <TextField
            className="my-6 w-full"
            type={showPassword ? "text" : "password"}
            placeholder={`${t("password")}`}
            autoComplete="new-password'"
            onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
              e.target.value = e.target.value.slice(0, 128)
              isCharacters(e.target.value)
            }}
            {...register("password")}
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
                  <Icomoon className="icon-Lock" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <TextField
            className="mb-6 w-full"
            type={showConfirmPassword ? "text" : "password"}
            placeholder={`${t("confirm_password")}`}
            autoComplete="new-password'"
            onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
              e.target.value = e.target.value.slice(0, 128)
              isCharacters(e.target.value)
            }}
            {...register("confirmPassword")}
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
            id="confirmPassword"
            size="medium"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Icomoon className="icon-Lock" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowConfirmPassword}
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
            className="flex items-center gap-2"
          >
            <TextField
              className="hidden-arrow-number mb-4 w-full"
              type="number"
              placeholder={String(t("verification_code"))}
              onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                e.target.value = e.target.value.slice(0, 6)
                isNumber(e.target.value.toString())
              }}
              value={verifiCode}
              inputProps={{
                pattern: patternCode,
                maxLength: 6
              }}
              autoComplete="new-password'"
              {...register("code")}
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
                },
                "& .MuiOutlinedInput-root input": {
                  textAlign: "center"
                }
              }}
              id="code"
              size="medium"
            />
            <Box
              component="div"
              className="flex justify-center"
            >
              <Button
                disabled={!emailCorrect || email === ""}
                onClick={() => onClickGetCode(email)}
                variant="contained"
                className={`mb-4 h-[50px] w-full rounded-bl-3xl border border-solid border-error-100 !bg-error-100 ${
                  !emailCorrect || email === ""
                    ? "border-grey-default"
                    : "border-error-100"
                }`}
                aria-label="get-code"
              >
                <div className="flex items-center font-urbanist text-base font-bold">
                  {t("get_code")}
                </div>
              </Button>
            </Box>
          </Box>
          <Box
            component="div"
            className="mb-6"
          >
            <FormControlLabel
              className="!ml-0 !mr-0"
              control={
                <Checkbox
                  sx={{
                    "&:hover": { bgcolor: "transparent" },
                    ":hover": {
                      "& .MuiSvgIcon-root": {
                        background: "transparent",
                        border: "2px solid #F2C94C !important"
                      }
                    }
                  }}
                  icon={
                    <CheckBoxOutlineBlankOutlinedIcon
                      className="border-2 border-solid border-neutral-600 text-transparent"
                      sx={{
                        borderRadius: "8.5px"
                      }}
                    />
                  }
                  checkedIcon={
                    <Icomoon className="icon-Checkmark border-2 border-solid border-warning-100 bg-neutral-800 p-1 text-warning-100" />
                  }
                  {...register("subscription")}
                />
              }
              label={t("would_you_like_to_subscribe")}
              sx={{
                "& .MuiTypography-root": {
                  fontSize: 10,
                  color: "#70727B",
                  textTransform: "uppercase"
                }
              }}
            />
          </Box>
          <Box
            component="div"
            className="flex justify-center"
          >
            <Button
              type="submit"
              aria-label="sign-up"
              variant="contained"
              className="h-[50px] w-full rounded-bl-3xl border border-solid border-error-100 !bg-error-100"
            >
              <div className="flex items-center font-urbanist text-base font-bold">
                Sign up
              </div>
            </Button>
          </Box>
        </form>
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
          <Link
            href="/"
            className="text-sm font-normal text-warning-100"
          >
            Sign in
          </Link>
        </Box>
      </Box>
    </SwipeableDrawer>
  )
}

export default CreateAccountModal
