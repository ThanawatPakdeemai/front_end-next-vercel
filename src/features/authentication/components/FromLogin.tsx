import React, { memo, useState } from "react"
import {
  Box,
  ButtonGroup,
  InputAdornment,
  TextField,
  Typography
} from "@mui/material"
import LoginIcon from "@mui/icons-material/Login"
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined"
import LockOpenIcon from "@mui/icons-material/LockOpen"
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined"
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined"
import { useForm } from "react-hook-form"
import ButtonLink from "@components/atoms/button/ButtonLink"
import Link from "next/link"
import useProfileStore from "@stores/profileStore"
import {
  IProfile,
  IProfileResponse
} from "@feature/profile/interfaces/IProfileService"
import { useToast } from "@feature/toast/containers"
import { signIn } from "../containers/services/auth.service"
import { ISignIn } from "../interfaces/IAuthService"

const FormLogin = () => {
  const { onSetProfileData, onSetProfileAddress, onSetProfileJWT } =
    useProfileStore()
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const handleShowPassword = () => setShowPassword(!showPassword)
  const { errorToast } = useToast()
  const { register, handleSubmit } = useForm({
    defaultValues: {
      _email: "",
      _password: ""
    }
  })
  const onSubmit = (data: ISignIn) => {
    signIn({ _email: data._email, _password: data._password }).then(
      (_profile: IProfileResponse) => {
        const profile = _profile as unknown as IProfile
        if (profile) {
          onSetProfileData(profile)
          onSetProfileAddress(profile.address)
          onSetProfileJWT(profile.jwtToken)
        }
      }
    )
  }
  const onError = (data) => {
    if (data) {
      errorToast("Please fill completely")
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <Box>
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
            size="medium"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailOutlinedIcon />
                </InputAdornment>
              )
            }}
          />
        </Box>
        <Box>
          <Typography className="mb-2 mt-5 font-neue-machina text-sm uppercase text-neutral-500">
            Password
          </Typography>

          <TextField
            className="w-full"
            sx={{
              "& .MuiOutlinedInput-root": {
                width: "100%"
              }
            }}
            id="password-login"
            size="medium"
            {...register("_password")}
            type={showPassword ? "text" : "password"}
            helperText="A number or symbol, atleast 6 characters"
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOpenIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment
                  position="end"
                  className="cursor-pointer"
                >
                  <VisibilityOutlinedIcon
                    className={`${showPassword ? "" : "hidden"}`}
                    onClick={() => handleShowPassword()}
                  />
                  <VisibilityOffOutlinedIcon
                    className={`${showPassword ? "hidden" : ""}`}
                    onClick={() => handleShowPassword()}
                  />
                </InputAdornment>
              )
            }}
          />
        </Box>

        <ButtonGroup className="mt-10  gap-3">
          <ButtonLink
            className="h-[40px] !min-w-[150px] text-sm"
            href="/register"
            text="Register"
            size="medium"
          />
          <ButtonLink
            icon={<LoginIcon />}
            size="medium"
            color="secondary"
            className="h-[40px] !min-w-[200px]  text-sm"
            href=""
            onClick={() => {}}
            text="Login"
            type="submit"
            variant="contained"
          />
        </ButtonGroup>
      </form>
      <Link href="/forget-password">
        <Typography className="cursor-pointer text-right text-sm text-neutral-500">
          Forget Password?
        </Typography>
      </Link>
    </>
  )
}
export default memo(FormLogin)
