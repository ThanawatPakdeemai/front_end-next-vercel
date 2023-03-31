import React, { memo } from "react"
import {
  Box,
  InputAdornment,
  TextField,
  Typography,
  Grid,
  Link,
  Divider,
  Alert,
  Button,
  FormControlLabel,
  Checkbox,
  IconButton
} from "@mui/material"
import _ from "lodash"
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined"
import ButtonClose from "@components/atoms/button/ButtonClose"
import { motion } from "framer-motion"
import ButtonToggleIcon from "@components/molecules/gameSlide/ButtonToggleIcon"
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined"
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined"
import Beenhere from "@components/icons/Beenhere"
import ILock from "@components/icons/Lock"
import IEdit from "@components/icons/Edit"
import ButtonIcon from "@components/atoms/button/ButtonIcon"
import ButtonLink from "@components/atoms/button/ButtonLink"
import FacebookIcon from "@components/icons/SocialIcon/FacebookIcon"
import TwitterIcon from "@components/icons/SocialIcon/TwitterIcon"
import GoogleIcon from "@components/icons/SocialIcon/GoogleIcon"
import MetaMarkIcon from "@components/icons/SocialIcon/Metamask"
import CheckBoxOutlineBlankOutlinedIcon from "@mui/icons-material/CheckBoxOutlineBlankOutlined"
import ICheckMark from "@components/icons/CheckMark"
import FacebookLogin from "react-facebook-login"
import useRegisterAvatarStore from "@stores/registerAvater"
import useFormRegisterController from "../containers/hooks/useFormRegisterController"
import useFormController from "../containers/hooks/useFormController"

const FormRegister = () => {
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
    metaMarkLogin,
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

  const {
    setSubmitClickRegister: onSubmitRegisterForm,
    getClickRegisterFacebook: toggleFacebookRegister,
    setClickRegisterFacebook: setToggleFacebookRegister
  } = useRegisterAvatarStore()

  return (
    <>
      <form
        className="flex w-full justify-center"
        onSubmit={handleSubmit(onSubmitRegister)}
      >
        <Box
          className="w-full xl:w-[353px]"
          style={{ height: 638 }}
        >
          <Grid
            container
            spacing={2.25}
          >
            <Grid
              item
              xs={12}
            >
              <Box
                className="flex w-full items-center rounded-lg md:w-auto"
                sx={{ height: "54px" }}
              >
                <div className="flex flex-1 flex-row items-center">
                  <Typography className="text-lg uppercase text-neutral-300">
                    Register
                  </Typography>
                </div>
                <Link href="/">
                  <ButtonClose onClick={() => {}} />
                </Link>
              </Box>
              <Divider className="mx-0 mt-5 mb-8" />
              {formSubmitErrors && (
                <motion.div
                  animate={{
                    opacity: 1,
                    marginTop: -20,
                    marginBottom: 2
                  }}
                >
                  <Alert
                    severity="error"
                    className="rounded-lg"
                  >
                    The form is filled with incorrect information.
                  </Alert>
                </motion.div>
              )}
              <TextField
                className="w-full"
                type="email"
                placeholder="Email"
                label="Email Address"
                onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                  isEmail(e.target.value.toString())
                }}
                {...register("email")}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    width: "100%",
                    fontWeight: 400,
                    fontSize: 14,
                    fontWight: 700,
                    fontFamily: "neueMachina"
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
                      <EmailOutlinedIcon />
                    </InputAdornment>
                  )
                }}
              />
              {errors.email && (
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
              {!emailCorrect && (
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
                    Invalid Email Format
                  </Alert>
                </motion.div>
              )}
            </Grid>
            <Grid
              item
              xs={12}
              className=" grid w-full grid-cols-3 "
              container
              direction="row"
            >
              <Grid
                className="col-span-2 w-full md:pr-[5px]  xl:w-auto"
                item
              >
                <TextField
                  className="hidden-arrow-number Mui-error mr-2 w-full pb-4 xl:w-[235px] xl:pb-0"
                  type="number"
                  placeholder="Verification code"
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
                      fontWeight: 400,
                      fontSize: 14,
                      fontWight: 700,
                      fontFamily: "neueMachina",
                      padding: "0px 16px"
                    }
                  }}
                  id="code"
                  size="medium"
                />
              </Grid>
              <Grid
                className="w-full "
                item
              >
                <Button
                  disabled={!emailCorrect || watch("email") === ""}
                  onClick={() => onClickGetCode(watch("email"))}
                  className="btn-rainbow-theme h-[40px] w-full !min-w-[90px] rounded-lg bg-error-main text-sm text-neutral-300 "
                >
                  Get Code
                </Button>
              </Grid>
            </Grid>
            {errors.code && (
              <Grid
                item
                xs={12}
              >
                <motion.div
                  initial={{ opacity: 0, marginBottom: 0 }}
                  animate={{
                    opacity: 1,
                    marginTop: -10
                  }}
                >
                  <Alert
                    severity="warning"
                    className="rounded-lg"
                  >
                    Code is a required field
                  </Alert>
                </motion.div>
              </Grid>
            )}
            <Grid
              item
              xs={12}
            >
              <TextField
                className="w-full pt-3.5"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                label="Password"
                autoComplete="new-password'"
                onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                  e.target.value = e.target.value.slice(0, 128)
                  isCharacters(e.target.value)
                }}
                {...register("password")}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    width: "100%",
                    fontWeight: 400,
                    fontSize: 14,
                    fontWight: 700,
                    fontFamily: "neueMachina"
                  },
                  "& .MuiInputLabel-root": {
                    color: "#70727B",
                    fontFamily: "neueMachina",
                    textTransform: "uppercase"
                  }
                }}
                id="password"
                size="medium"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <ILock />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? (
                          <VisibilityOffOutlinedIcon className="text-neutral-300" />
                        ) : (
                          <VisibilityOutlinedIcon className="text-neutral-300" />
                        )}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              {errors.password && (
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
              {characterPasswordLength === false && (
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
                    The password must contain at least 6 characters.
                  </Alert>
                </motion.div>
              )}
              {characterUppercase === false && (
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
                    The password must contain at least one uppercase letter.
                  </Alert>
                </motion.div>
              )}
              <TextField
                className="mt-[5px] w-full"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                label="A Number or Symbol, Atleast 6 Characters"
                autoComplete="new-password'"
                onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                  e.target.value = e.target.value.slice(0, 128)
                  isCharacters(e.target.value)
                }}
                {...register("confirmPassword")}
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
                        onClick={handleClickShowConfirmPassword}
                        onMouseDown={handleMouseDownConfirmPassword}
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
              {errors.confirmPassword && (
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
                    ConfirmPassword is a required field
                  </Alert>
                </motion.div>
              )}
              {!passwordCorrect && (
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
                    Password is incorrect
                  </Alert>
                </motion.div>
              )}
            </Grid>
            <Grid
              item
              xs={12}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    sx={{
                      "&:hover": { bgcolor: "transparent" },
                      ":hover": {
                        "& .MuiSvgIcon-root": {
                          background: "transparent",
                          border: "2px solid #7a5be6 !important"
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
                      <ICheckMark
                        className="border-2 border-solid border-purple-primary bg-neutral-800 p-1 text-purple-primary"
                        style={{
                          borderRadius: "8.5px"
                        }}
                      />
                    }
                    {...register("subscription")}
                  />
                }
                label="Would you like to subscribe to Nakamoto Games Newsletter?"
                sx={{
                  "& .MuiTypography-root": {
                    fontSize: 10,
                    color: "#70727B",
                    textTransform: "uppercase"
                  }
                }}
              />
            </Grid>
            <Grid
              item
              container
              direction="row"
              justifyContent="space-between"
            >
              <Grid
                className="w-full md:w-auto"
                item
              >
                <ButtonLink
                  href="/"
                  text="Login"
                  icon={null}
                  size="medium"
                  disabledEndIcon
                  className="h-[40px] w-full !min-w-[108px] border border-solid border-neutral-700 text-sm hover:h-[45px] md:w-auto"
                />
              </Grid>
              <Grid
                className="mt-[10px] w-full md:mt-[0px] md:w-auto"
                item
              >
                <ButtonToggleIcon
                  handleClick={() => onSubmitRegisterForm(true)}
                  type="submit"
                  startIcon={<IEdit />}
                  text="Register"
                  className="btn-rainbow-theme h-[40px] w-full bg-secondary-main font-bold capitalize text-white-default md:!w-[209px] "
                />
              </Grid>
            </Grid>
            <Grid
              item
              container
              justifyContent="space-between"
              alignItems="center"
              className="mt-8 mb-8"
            >
              <Grid item>
                <p className="text-xs uppercase">OR join us with</p>
              </Grid>
              <Grid item>
                <hr className="w-[208px] border border-solid border-neutral-800" />
              </Grid>
            </Grid>
            <Grid
              item
              container
            >
              <div className="flex flex-wrap">
                <ButtonIcon
                  whileHover="hover"
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 4
                  }}
                  onClick={() => setToggleFacebookRegister(true)}
                  icon={
                    toggleFacebookRegister ? (
                      <FacebookLogin
                        appId={`${process.env.NEXT_PUBLIC_FACEBOOK_APPID}`}
                        autoLoad
                        fields="name,email,picture"
                        callback={(e) => facebookLogin(e, watch("referralId"))}
                        cssClass="my-facebook-button-class"
                        textButton={null}
                        icon={<FacebookIcon />}
                      />
                    ) : (
                      <FacebookIcon />
                    )
                  }
                  className={`m-1 flex h-[40px] w-[75px] justify-center rounded-lg border border-neutral-700 bg-neutral-800 ${
                    toggleFacebookRegister ? "items-end" : "items-center"
                  }`}
                />
                <ButtonIcon
                  whileHover="hover"
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 4
                  }}
                  onClick={() => twitterLogin(watch("referralId"))}
                  icon={<TwitterIcon />}
                  className="m-1 flex h-[40px] w-[75px] items-center justify-center rounded-lg border border-neutral-700 bg-neutral-800"
                />
                <ButtonIcon
                  whileHover="hover"
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 4
                  }}
                  onClick={() => googleRegister(watch("referralId"))}
                  icon={<GoogleIcon />}
                  className="m-1 flex h-[40px] w-[75px] items-center justify-center rounded-lg border border-neutral-700 bg-neutral-800"
                />
                <ButtonIcon
                  whileHover="hover"
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 4
                  }}
                  onClick={metaMarkLogin}
                  icon={<MetaMarkIcon />}
                  className="m-1 flex h-[40px] w-[75px] items-center justify-center rounded-lg border border-neutral-700 bg-neutral-800"
                />
              </div>
            </Grid>
          </Grid>
        </Box>
      </form>
    </>
  )
}
export default memo(FormRegister)
