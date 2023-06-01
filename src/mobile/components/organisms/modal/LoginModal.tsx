import React, { useState } from "react"
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
import FacebookColorIcon from "@components/icons/SocialIcon/FacebookColorIcon"
import GoogleColorIcon from "@components/icons/SocialIcon/GoogleColorIcon"
import TwitterIcon from "@components/icons/SocialIcon/TwitterIcon"
import Beenhere from "@components/icons/Beenhere"
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined"
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined"

interface INotificationModalProps {
  open: boolean
  setOpenLogin: (_toggle: boolean) => void
}

const LoginModal = ({ open, setOpenLogin }: INotificationModalProps) => {
  // eslint-disable-next-line no-unused-vars
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
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
          className="mb-20 flex justify-center"
        >
          <LogoNakaBigIcon />
        </Box>
        <Typography className="my-8 text-center font-urbanist text-2xl font-bold uppercase text-white-default">
          Login with Email
        </Typography>
        <TextField
          className="mt-[5px] w-full"
          // type={showConfirmPassword ? "text" : "password"}
          // placeholder={`${t("confirm_password")}`}
          // label={t("helperText_login")}
          autoComplete="new-password'"
          // onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
          //   e.target.value = e.target.value.slice(0, 128)
          //   isCharacters(e.target.value)
          // }}
          // {...register("confirmPassword")}
          sx={{
            "& .MuiOutlinedInput-root": {
              width: "100%",
              fontWeight: 400,
              fontSize: 14,
              fontWight: 700,
              fontFamily: "neueMachina"
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
                <Beenhere />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  // onClick={handleClickShowConfirmPassword}
                  // onMouseDown={handleMouseDownConfirmPassword}
                  edge="end"
                >
                  {showConfirmPassword ? (
                    <VisibilityOffOutlinedIcon className="text-neutral-300" />
                  ) : (
                    <VisibilityOutlinedIcon className="text-neutral-300" />
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
            variant="contained"
            className="mb-6 h-[50px] w-[293px] rounded-bl-3xl border border-solid border-error-100 !bg-error-100"
          >
            <div className="flex items-center font-urbanist text-base font-bold">
              Sign in
            </div>
          </Button>
        </Box>
        <Box
          component="div"
          className="flex justify-center text-center"
        >
          <Link
            href="/register"
            className="text-lg font-bold text-warning-100"
          >
            Forgot Password?
          </Link>
        </Box>
        <Box
          component="div"
          className="py-6"
        >
          <Divider className="font-urbanist text-lg font-semibold text-white-default">
            or continue with
          </Divider>
        </Box>
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
          >
            <GoogleColorIcon />
          </Button>
          <Button
            variant="outlined"
            className="h-[60px] !min-w-[88px] rounded-2xl border border-solid border-neutral-690 bg-neutral-800"
          >
            <TwitterIcon fill="#1D9BF0" />
          </Button>
        </Box>
        <Box
          component="div"
          className="flex justify-center py-7 text-center"
        >
          <p className="pr-2 text-sm font-normal text-[#fff]">
            Already have an account?
          </p>
          <Link
            href="/register"
            className="text-sm font-normal text-warning-100"
          >
            Sign up
          </Link>
        </Box>
      </Box>
    </SwipeableDrawer>
  )
}

export default LoginModal
