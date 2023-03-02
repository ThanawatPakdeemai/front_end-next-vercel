import React, { memo, useEffect, useState } from "react"
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
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
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
import { MESSAGES } from "@constants/messages"
import { useToast } from "@feature/toast/containers"
import { useGoogleReCaptcha } from "react-google-recaptcha-v3"
import useVerifyCode from "@feature/authentication/containers/hooks/useVerifyCode"
import useSignUp from "@feature/authentication/containers/hooks/useSignUp"
import ButtonLink from "@components/atoms/button/ButtonLink"
import FacebookIcon from "@components/icons/SocialIcon/FacebookIcon"
import TwitterIcon from "@components/icons/SocialIcon/TwitterIcon"
import GoogleIcon from "@components/icons/SocialIcon/GoogleIcon"
import MetaMarkIcon from "@components/icons/SocialIcon/Metamask"
import CheckBoxOutlineBlankOutlinedIcon from "@mui/icons-material/CheckBoxOutlineBlankOutlined"
import ICheckMark from "@components/icons/CheckMark"
import FacebookLogin from "react-facebook-login"
import {
  TwitterAuthProvider,
  GoogleAuthProvider,
  getAuth,
  signInWithPopup
} from "firebase/auth"
import { initializeApp, getApps } from "@firebase/app"
import { useRouter } from "next/router"
import useLoginProvider from "@feature/authentication/containers/hooks/useLoginProvider"
import useRegisterAvatarStore from "@stores/registerAvater"
import { IProfileFaceBook } from "@src/types/profile"

interface TFormData {
  email: string
  password: string
  confirmPassword: string
  code: number
  subscription: boolean
  referralId: string | string[]
}

const SignUpSchema = yup
  .object({
    email: yup.string().required(),
    password: yup.string().required(),
    confirmPassword: yup.string().required(),
    code: yup.number().required().positive().integer(),
    subscription: yup.boolean().defined(),
    referralId: yup.string().defined()
  })
  .required()

const FormRegister = () => {
  const router = useRouter()
  const { referral } = router.query

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<TFormData>({
    resolver: yupResolver(SignUpSchema),
    defaultValues: {
      referralId: referral || ""
    }
  })

  const patternCode = "[0-9]{1,6}"
  const patternPasswordUppercase = /[A-Z]/
  const patternEmail =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

  const { executeRecaptcha } = useGoogleReCaptcha()
  const { mutateVerifyCode } = useVerifyCode()
  const { mutateSignUp } = useSignUp()
  const { mutateLoginProvider } = useLoginProvider()
  const { errorToast, successToast } = useToast()

  const firebaseConfig = {
    apiKey: "AIzaSyAszETPfcbQt0gd2Ifpep83_C05zOt_k1c",
    authDomain: "able-study-326414.firebaseapp.com",
    projectId: "able-study-326414",
    storageBucket: "able-study-326414.appspot.com",
    messagingSenderId: "104862138123",
    appId: "1:104862138123:web:2e7578e0d8a80277052c0e",
    measurementId: "G-4NN0JPG9X4"
  }

  if (!getApps().length) {
    initializeApp(firebaseConfig)
  }

  const auth = getAuth()
  const {
    setSubmitClickRegister: onSubmitRegisterForm,
    getClickRegisterFacebook: toggleFacebookRegister,
    setClickRegisterFacebook: setToggleFacebookRegister
  } = useRegisterAvatarStore()

  const [verifiCode, setVerifiCode] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [emailCorrect, setEmailCorrect] = useState(true)
  const [passwordCorrect, setPasswordCorrect] = useState(false)
  const [characterPasswordLength, setCharacterPasswordLength] = useState(true)
  const [characterUppercase, setCharacterUppercase] = useState(true)
  const [formSubmitErrors, setFormSubmitErrors] = useState(false)

  const handleClickShowPassword = () => setShowPassword((show) => !show)
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }

  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show)
  const handleMouseDownConfirmPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }

  const isEmail = (_email: string) => {
    if (patternEmail.test(_email)) {
      setEmailCorrect(true)
    } else {
      setEmailCorrect(false)
    }
  }

  const isNumber = (_keyCode: string) => {
    if (_keyCode.includes(".")) {
      setVerifiCode(_keyCode.split(".").join(""))
    } else {
      setVerifiCode(_keyCode)
    }
  }

  const isConfirmPassword = (_password: string, _confirmPassword: string) => {
    if (_password === _confirmPassword) {
      setPasswordCorrect(true)
    } else {
      setPasswordCorrect(false)
    }
  }

  const isCharacters = (_characters: string) => {
    if (_characters.length >= 6) {
      setCharacterPasswordLength(true)
      if (patternPasswordUppercase.test(_characters)) {
        setCharacterUppercase(true)
      } else {
        setCharacterUppercase(false)
      }
    } else {
      setCharacterPasswordLength(false)
    }
  }

  const onClickGetCode = async (_email: string) => {
    if (!executeRecaptcha) {
      return
    }
    let _recaptcha = ""

    ;(async () => {
      try {
        _recaptcha = await executeRecaptcha("getCodeVerify")
        await mutateVerifyCode({ _email, _recaptcha })
          .then((_profile) => {
            if (_profile) {
              successToast(MESSAGES.success_get_code)
            }
          })
          .catch(() => {
            errorToast(MESSAGES.code_number_not_expired)
          })
      } catch (error) {
        errorToast("Verify Error")
      }
    })()
  }

  const facebookLogin = async (
    response: IProfileFaceBook,
    referralId: string | string[]
  ) => {
    if (
      response.email !== null &&
      response.email !== undefined &&
      response.userID !== null &&
      response.userID !== undefined
    ) {
      mutateLoginProvider({
        _email: response.email,
        _provider: "facebook",
        _prevPath: "/",
        _providerUUID: response.userID,
        _referral: referralId
      })
        .then((_res) => {
          if (_res) {
            successToast(MESSAGES.create_successful_user)
          }
        })
        .catch((_error) => {
          errorToast(MESSAGES.create_not_successful_user)
        })
    }
  }

  const twitterLogin = async (referralId: string | string[]) => {
    const provider = new TwitterAuthProvider()
    provider.addScope("email")
    await signInWithPopup(auth, provider)
      .then((result) => {
        const { user } = result
        if (
          user.providerData[0].email !== null &&
          user.providerData[0].email !== undefined &&
          result.providerId !== null &&
          result.providerId !== undefined
        ) {
          mutateLoginProvider({
            _email: user.providerData[0].email,
            _provider: "twitter",
            _prevPath: "/",
            _providerUUID: user.uid,
            _referral: referralId
          })
            .then((_res) => {
              if (_res) {
                successToast(MESSAGES.create_successful_user)
              }
            })
            .catch((_error) => {
              errorToast(MESSAGES.create_not_successful_user)
            })
        } else {
          errorToast(MESSAGES.create_not_successful_user)
        }
      })
      .catch((error) => {
        if (error.code) {
          errorToast(MESSAGES.auth_popup_closed_by_user)
        }
      })
  }

  const googleRegister = async (referralId: string | string[]) => {
    const provider = new GoogleAuthProvider()
    provider.addScope("email")
    await signInWithPopup(auth, provider)
      .then((result) => {
        const { user } = result
        if (
          user.providerData[0].email !== null &&
          user.providerData[0].email !== undefined &&
          result.providerId !== null &&
          result.providerId !== undefined
        ) {
          mutateLoginProvider({
            _email: user.providerData[0].email,
            _provider: "google",
            _prevPath: "/",
            _providerUUID: user.uid,
            _referral: referralId
          })
            .then((_res) => {
              if (_res) {
                successToast(MESSAGES.create_successful_user)
              }
            })
            .catch((_error) => {
              errorToast(MESSAGES.create_not_successful_user)
            })
        } else {
          errorToast(MESSAGES.create_not_successful_user)
        }
      })
      .catch((error) => {
        if (error.code) {
          errorToast(MESSAGES.auth_popup_closed_by_user)
        }
      })
  }

  const metaMarkLogin = async () => {
    errorToast("This feature is unavailable.")
  }

  const onSubmitRegister = (values: TFormData) => {
    const { email, code, password, subscription, referralId } = values
    if (emailCorrect && characterPasswordLength && characterUppercase) {
      setFormSubmitErrors(false)
      mutateSignUp({
        _email: email,
        _password: password,
        _referral: referralId,
        _verifycode: code,
        _subscription: subscription
      })
        .then((_res) => {
          if (_res) {
            successToast(MESSAGES.create_successful_user)
          }
        })
        .catch(() => {
          errorToast(MESSAGES.please_fill)
        })
    } else {
      setFormSubmitErrors(true)
    }
  }

  useEffect(() => {
    isConfirmPassword(watch("password"), watch("confirmPassword"))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch("password"), watch("confirmPassword")])

  return (
    <>
      <form onSubmit={handleSubmit(onSubmitRegister)}>
        <Box style={{ width: 333, height: 638 }}>
          <Grid
            container
            spacing={2.25}
          >
            <Grid
              item
              xs={12}
            >
              <Box
                className="flex items-center rounded-lg"
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
              container
              direction="row"
            >
              <Grid item>
                <TextField
                  className="hidden-arrow-number Mui-error mr-2 w-[235px]"
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
              <Grid item>
                <Button
                  disabled={!emailCorrect || watch("email") === ""}
                  onClick={() => onClickGetCode(watch("email"))}
                  className="btn-rainbow-theme h-[40px] !min-w-[90px] rounded-lg bg-error-main text-sm text-neutral-300"
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
              <Grid item>
                <ButtonLink
                  href="/login"
                  text="Login"
                  icon={null}
                  size="medium"
                  disabledEndIcon
                  className="h-[40px] !min-w-[108px] border border-solid border-neutral-700 text-sm hover:h-[45px]"
                />
              </Grid>
              <Grid item>
                <ButtonToggleIcon
                  handleClick={() => onSubmitRegisterForm(true)}
                  type="submit"
                  startIcon={<IEdit />}
                  text="Regiter"
                  className="btn-rainbow-theme h-[40px] !w-[209px] bg-secondary-main font-bold capitalize text-white-default"
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
