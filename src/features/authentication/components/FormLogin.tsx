import React, { memo, useState } from "react"
import {
  Box,
  ButtonGroup,
  InputAdornment,
  TextField,
  Typography,
  CircularProgress,
  Grid
} from "@mui/material"
import LoginIcon from "@mui/icons-material/Login"
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined"
import LockOpenIcon from "@mui/icons-material/LockOpen"
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined"
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined"
import { useForm } from "react-hook-form"
import ButtonLink from "@components/atoms/button/ButtonLink"
import { useToast } from "@feature/toast/containers"
import { MESSAGES } from "@constants/messages"
import ButtonIcon from "@components/atoms/button/ButtonIcon"
import FacebookIcon from "@components/icons/SocialIcon/FacebookIcon"
import TwitterIcon from "@components/icons/SocialIcon/TwitterIcon"
import GoogleIcon from "@components/icons/SocialIcon/GoogleIcon"
import MetaMarkIcon from "@components/icons/SocialIcon/Metamask"
import FacebookLogin from "react-facebook-login"
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  TwitterAuthProvider
} from "firebase/auth"
import { getApps, initializeApp } from "@firebase/app"
import { IError } from "@src/types/contract"
import { IProfileFaceBook } from "@src/types/profile"
import Web3 from "web3"
import useLoginTypeStore from "@stores/loginTypes"
import useConnectMetamaskAction from "@utils/useConnectMetamesk"
import { useWeb3Provider } from "@providers/Web3Provider"
import { useRouter } from "next/router"
import useSignIn from "../containers/hooks/useSignIn"
import { ISignIn } from "../interfaces/IAuthService"
import useLoginProvider from "../containers/hooks/useLoginProvider"
import useLoginMetamask from "../containers/hooks/useLoginMetamask"
import FromForgotPassword from "./FromForgotPassword"

interface IProp {
  href?: string
}

const FormLogin = ({ href }: IProp) => {
  const { mutateLoginProvider } = useLoginProvider()
  const { mutateLoginMetamask } = useLoginMetamask()

  const web3 = new Web3(Web3.givenProvider)
  const { address: account } = useWeb3Provider()
  const { getSignature } = useConnectMetamaskAction()

  const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTHDOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_Id,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SEND_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APPID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
  }

  if (!getApps().length) {
    initializeApp(firebaseConfig)
  }

  const auth = getAuth()
  const {
    getClickLoginFacebook: toggleFacebookLogin,
    setClickLoginFacebook: setToggleFacebookLogin
  } = useLoginTypeStore()

  const [showPassword, setShowPassword] = useState<boolean>(false)
  const handleShowPassword = () => setShowPassword(!showPassword)
  const { errorToast, successToast } = useToast()
  const { register, handleSubmit } = useForm({
    defaultValues: {
      _email: "",
      _password: ""
    }
  })
  const { mutateSignIn, isLoading } = useSignIn()
  const router = useRouter()

  const onSubmit = (_data: ISignIn) => {
    mutateSignIn({ _email: _data._email, _password: _data._password })
      .then((_profile) => {
        if (_profile) {
          successToast(MESSAGES.sign_in_success)
          if (href) {
            return router.push("/")
          }
        }
      })
      .catch(() => {})
  }
  const onError = () => {
    errorToast(MESSAGES.please_fill)
  }

  const facebookLogin = async (response: IProfileFaceBook) => {
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
        _referral: ""
      })
        .then((_res) => {
          if (_res) {
            successToast(MESSAGES.logged_in_successfully)
          }
        })
        .catch((_error: IError) => {
          errorToast(MESSAGES.logged_in_unsuccessfully || _error.message)
        })
    }
  }

  const twitterLogin = async () => {
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
            _provider: "google",
            _prevPath: "/",
            _providerUUID: user.uid,
            _referral: ""
          })
            .then((_res) => {
              if (_res) {
                successToast(MESSAGES.logged_in_successfully)
              }
            })
            .catch((_error: IError) => {
              errorToast(MESSAGES.logged_in_unsuccessfully || _error.message)
            })
        } else {
          errorToast(MESSAGES.logged_in_unsuccessfully)
        }
      })
      .catch((_error: IError) => {
        errorToast(MESSAGES.logged_in_unsuccessfully || _error.message)
      })
  }

  const googleLogin = async () => {
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
            _referral: ""
          })
            .then((_res) => {
              if (_res) {
                successToast(MESSAGES.logged_in_successfully)
              }
            })
            .catch((_error: IError) => {
              errorToast(MESSAGES.logged_in_unsuccessfully || _error.message)
            })
        } else {
          errorToast(MESSAGES.logged_in_unsuccessfully)
        }
      })
      .catch((_error: IError) => {
        errorToast(MESSAGES.logged_in_unsuccessfully || _error.message)
      })
  }

  const metaMarkLogin = async () => {
    let accounts: Array<string> = []
    try {
      await web3?.givenProvider?.request({ method: "eth_requestAccounts" })
      accounts = await web3.eth.getAccounts()
    } catch (_error) {
      errorToast(MESSAGES["please-connect-wallet"])
    }
    const valueSigner = await getSignature(account || accounts[0])
    if (
      ((typeof valueSigner === "string" || valueSigner instanceof String) &&
        account) ||
      accounts[0]
    ) {
      mutateLoginMetamask({
        _account: account,
        _accounts: accounts[0],
        _valueSigner: valueSigner
      })
        .then(async (_res) => {
          if (_res) {
            successToast(MESSAGES.logged_in_successfully)
          }
        })
        .catch((_error: IError) => {
          errorToast(MESSAGES.logged_in_unsuccessfully || _error.message)
        })
    } else {
      errorToast(MESSAGES["please-connect-wallet"])
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
            placeholder="Email"
            size="medium"
            autoComplete="email"
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
            placeholder="Password"
            helperText="A number or symbol, atleast 6 characters"
            required
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
            disabled={isLoading}
            className="h-[40px] !min-w-[200px]  text-sm"
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
                  "Login"
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
        className="w-full"
        container
      >
        <div className="flex w-full flex-row flex-wrap justify-between">
          <ButtonIcon
            whileHover="hover"
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 4
            }}
            onClick={() => setToggleFacebookLogin(true)}
            icon={
              toggleFacebookLogin ? (
                <FacebookLogin
                  appId={`${process.env.NEXT_PUBLIC_FACEBOOK_APPID}`}
                  autoLoad
                  fields="name,email,picture"
                  callback={facebookLogin}
                  cssClass="my-facebook-button-class"
                  textButton={null}
                  icon={<FacebookIcon />}
                />
              ) : (
                <FacebookIcon />
              )
            }
            className={`flex h-[40px] w-[75px] justify-center rounded-lg border border-neutral-700 bg-neutral-800 ${
              toggleFacebookLogin ? "items-end" : "items-center"
            }`}
          />
          <ButtonIcon
            whileHover="hover"
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 4
            }}
            onClick={twitterLogin}
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
            onClick={googleLogin}
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
            onClick={metaMarkLogin}
            icon={<MetaMarkIcon />}
            className="flex h-[40px] w-[75px] items-center justify-center rounded-lg border border-neutral-700 bg-neutral-800"
          />
        </div>
      </Grid>
    </>
  )
}
export default memo(FormLogin)
