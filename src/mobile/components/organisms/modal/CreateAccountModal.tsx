import React from "react"
import {
  Box,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  Link,
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
import MoreLoginMobile from "@mobile/components/atoms/MoreLoginMobile"
import useFormRegisterController from "@feature/authentication/containers/hooks/useFormRegisterController"
import useFormController from "@feature/authentication/containers/hooks/useFormController"

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
    characterPasswordLength,
    characterUppercase,
    formSubmitErrors,
    register,
    handleSubmit,
    onSubmitRegister,
    onClickGetCode,
    isNumber,
    isCharacters,
    facebookLogin,
    twitterLogin,
    googleRegister,
    // metaMarkLogin,
    passwordCorrect,
    errors,
    watch,
    handleClickShowPassword,
    handleMouseDownPassword,
    showConfirmPassword,
    handleClickShowConfirmPassword,
    handleMouseDownConfirmPassword
  } = useFormRegisterController()
  const { isEmail, patternCode, emailCorrect } = useFormController()

  const { t } = useTranslation()

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
          Create New Account
        </Typography>
        <form onSubmit={handleSubmit(onSubmitRegister)}>
          <TextField
            className="w-full"
            type="email"
            placeholder={String(t("email"))}
            onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
              isEmail(e.target.value.toString())
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
                  <Lock2Icon />
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
                  <Lock2Icon />
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
              className="hidden-arrow-number mb-6 w-full"
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
                disabled={!emailCorrect || watch("email") === ""}
                onClick={() => onClickGetCode(watch("email"))}
                variant="contained"
                className={`mb-6 h-[50px] w-full rounded-bl-3xl border border-solid border-error-100 !bg-error-100 ${
                  !emailCorrect || watch("email") === ""
                    ? "border-grey-default"
                    : "border-error-100"
                }`}
              >
                <div className="flex items-center font-urbanist text-base font-bold">
                  {t("get_code")}
                </div>
              </Button>
            </Box>
          </Box>
          <Box
            component="div"
            className="flex justify-center"
          >
            <Button
              type="submit"
              variant="contained"
              className="mb-6 h-[50px] w-full rounded-bl-3xl border border-solid border-error-100 !bg-error-100"
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
