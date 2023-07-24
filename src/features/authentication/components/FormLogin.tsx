/* eslint-disable max-len */
import React, { memo, useState } from "react"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { motion } from "framer-motion"
import {
  Box,
  ButtonGroup,
  InputAdornment,
  TextField,
  Typography,
  CircularProgress,
  Grid,
  Alert
} from "@mui/material"
import { signIn } from "next-auth/react"
import LoginIcon from "@mui/icons-material/Login"
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined"
import LockOpenIcon from "@mui/icons-material/LockOpen"
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined"
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined"
import { useForm } from "react-hook-form"
import ButtonLink from "@components/atoms/button/ButtonLink"
import ButtonIcon from "@components/atoms/button/ButtonIcon"
import TwitterIcon from "@components/icons/SocialIcon/TwitterIcon"
import GoogleIcon from "@components/icons/SocialIcon/GoogleIcon"
import MetaMarkIcon from "@components/icons/SocialIcon/Metamask"
import useLoginTypeStore from "@stores/loginTypes"
import { useTranslation } from "react-i18next"
import { isMobile } from "@hooks/useGlobal"
import DiscordIcon from "@components/icons/SocialIcon/DiscordIcon"
import CONFIGS from "@configs/index"
import FacebookIcon from "@components/icons/SocialIcon/FacebookIcon"
import FromForgotPassword from "./FromForgotPassword"
import useFormLoginController from "../containers/hooks/useFormLoginController"
import { ISignIn } from "../interfaces/IAuthService"

const FormLogin = () => {
  const { metaMarkLogin, isLoading, onSubmitLogin } = useFormLoginController()

  const { t } = useTranslation()

  const { setClickLoginTypes: setLoginTypes } = useLoginTypeStore()

  const [showPassword, setShowPassword] = useState<boolean>(false)
  const handleShowPassword = () => setShowPassword(!showPassword)

  const SignUpSchema = yup
    .object({
      _email: yup.string().required(),
      _password: yup.string().required()
    })
    .required()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ISignIn>({
    resolver: yupResolver(SignUpSchema),
    defaultValues: {
      _email: "",
      _password: ""
    }
  })

  const handleLogin = async (_typeLogin: string) => {
    await setLoginTypes(_typeLogin)
    // await signIn(_typeLogin)
    await signIn("google", {
      callbackUrl: "/"
    })
  }
  return (
    <>
      <form onSubmit={handleSubmit(onSubmitLogin)}>
        <Box component="div">
          <Typography className="mb-2 font-neue-machina text-sm uppercase  text-neutral-500">
            {t("email_address")}
          </Typography>
          <TextField
            className="w-full"
            type="email"
            sx={{
              "& .MuiOutlinedInput-root": {
                width: "100%"
              }
            }}
            id="email-login"
            placeholder={`${t("email")}`}
            size="medium"
            autoComplete="email"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailOutlinedIcon />
                </InputAdornment>
              )
            }}
            {...register("_email")}
          />
          {errors._email && (
            <motion.div
              initial={{ opacity: 0, marginBottom: 0 }}
              animate={{
                opacity: 1,
                marginTop: 10
              }}
            >
              <Alert
                severity="warning"
                className="rounded-lg"
              >
                Email is a required field
              </Alert>
            </motion.div>
          )}
        </Box>
        <Box component="div">
          <Typography className="mb-2 mt-5 font-neue-machina text-sm uppercase text-neutral-500">
            {t("password")}
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
            type={showPassword ? "text" : "password"}
            placeholder={`${t("password")}`}
            helperText={errors._email ? t("helperText_login") : ""}
            autoComplete="current-password"
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
                  {showPassword ? (
                    <VisibilityOutlinedIcon
                      onClick={() => handleShowPassword()}
                    />
                  ) : (
                    <VisibilityOffOutlinedIcon
                      onClick={() => handleShowPassword()}
                    />
                  )}
                </InputAdornment>
              )
            }}
            {...register("_password")}
          />
          {errors._password && (
            <motion.div
              initial={{ opacity: 0, marginBottom: 0 }}
              animate={{
                opacity: 1,
                marginTop: 10
              }}
            >
              <Alert
                severity="warning"
                className="rounded-lg"
              >
                Password is a required field
              </Alert>
            </motion.div>
          )}
        </Box>

        <ButtonGroup className="mt-10 w-full gap-3 md:w-auto">
          <ButtonLink
            className="h-[40px] w-full !min-w-[150px]  text-sm md:w-auto"
            href="/register"
            text={t("register")}
            size="medium"
          />
          <ButtonLink
            icon={<LoginIcon />}
            size="medium"
            color="secondary"
            disabled={isLoading}
            className="h-[40px]  text-sm  md:!min-w-[200px]"
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
                  `${t("login")}`
                )}
              </>
            }
            type="submit"
            variant="contained"
          />
        </ButtonGroup>
      </form>
      <FromForgotPassword />
      <Grid
        item
        container
        justifyContent="space-between"
        alignItems="center"
        className="!mb-0 !mt-0"
      >
        <Grid item>
          <p className="text-xs uppercase">{t("or_join_us_with")}</p>
        </Grid>
        <Grid item>
          <hr className="w-[208px] border border-solid border-neutral-800" />
        </Grid>
      </Grid>
      <Grid
        item
        className="w-full"
        container
      >
        <div className="flex w-full flex-row flex-wrap justify-between gap-2">
          {CONFIGS.MODE === "production" ? undefined : (
            <>
              <ButtonIcon
                whileHover="hover"
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 4
                }}
                onClick={() => handleLogin("facebook")}
                // onClick={() => signOut()}
                icon={<FacebookIcon />}
                className="flex h-[40px] w-[75px] items-center justify-center rounded-lg border border-neutral-700 bg-neutral-800"
              />
              <ButtonIcon
                whileHover="hover"
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 4
                }}
                onClick={() => handleLogin("twitter")}
                icon={<TwitterIcon />}
                className="flex h-[40px] w-[75px] items-center justify-center rounded-lg border border-neutral-700 bg-neutral-800"
              />
              <ButtonIcon
                whileHover="hover"
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 4
                }}
                onClick={() => handleLogin("google")}
                icon={<GoogleIcon />}
                className="flex h-[40px] w-[75px] items-center justify-center rounded-lg border border-neutral-700 bg-neutral-800"
              />
              <ButtonIcon
                whileHover="hover"
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 4
                }}
                onClick={() => handleLogin("discord")}
                icon={<DiscordIcon />}
                className="flex h-[40px] w-[75px] items-center justify-center rounded-lg border border-neutral-700 bg-neutral-800"
              />
            </>
          )}
          {!isMobile && (
            <ButtonIcon
              whileHover="hover"
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 4
              }}
              onClick={metaMarkLogin}
              icon={<MetaMarkIcon />}
              className="flex h-[40px] w-[75px] items-center justify-center rounded-lg border border-neutral-700 bg-neutral-800"
            />
          )}
        </div>
      </Grid>
    </>
  )
}
export default memo(FormLogin)
