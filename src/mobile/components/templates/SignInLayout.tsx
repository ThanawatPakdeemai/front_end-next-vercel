import React, { useState } from "react"
import { Box, Button, Stack, Typography } from "@mui/material"
import { useTranslation } from "react-i18next"
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  TwitterAuthProvider
} from "firebase/auth"
import { getApps, initializeApp } from "@firebase/app"
import CardNoReward from "@feature/game/containers/components/atoms/CardNoReward"
import ButtonLink from "@components/atoms/button/ButtonLink"
import DraftsOutlinedIcon from "@mui/icons-material/DraftsOutlined"
import FacebookIcon from "@components/icons/SocialIcon/FacebookIcon"
import TwitterIcon from "@components/icons/SocialIcon/TwitterIcon"
import GoogleIcon from "@components/icons/SocialIcon/GoogleIcon"
import { ModalCustom } from "@components/molecules/Modal/ModalCustom"
import ModalHeader from "@components/molecules/Modal/ModalHeader"
import FormLogin from "@feature/authentication/components/FormLogin"
import useLoginTypeStore from "@stores/loginTypes"
import FacebookLogin from "react-facebook-login"
import useLoginProvider from "@feature/authentication/containers/hooks/useLoginProvider"
import { useToast } from "@feature/toast/containers"
import { IProfileFaceBook } from "@src/types/profile"
import { IError } from "@src/types/contract"
import { MESSAGES } from "@constants/messages"

const SignInLayout = () => {
  const { t } = useTranslation()

  const { mutateLoginProvider } = useLoginProvider()

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

  const { errorToast, successToast } = useToast()

  const [open, setOpen] = useState<boolean>(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

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

  return (
    <>
      <Box
        component="div"
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform"
      >
        <CardNoReward className="!rounded-none !border-none !bg-transparent" />
        <Typography className="my-8 text-center text-[22px] uppercase text-red-card">
          Welcome Back
        </Typography>
        <div>
          <Button
            variant="contained"
            className="mb-[1.125rem] h-[50px] w-[293px] rounded-lg border border-solid border-neutral-700
!bg-neutral-800 text-xs uppercase hover:border-secondary-main"
            onClick={handleOpen}
          >
            <div className="flex items-center font-neue-machina text-sm font-bold">
              <span className="absolute left-[15px]">
                <DraftsOutlinedIcon />
              </span>
              sign in with Email
            </div>
          </Button>
        </div>
        <div>
          <Button
            variant="contained"
            className="mb-[1.125rem] h-[50px] w-[293px] rounded-lg border border-solid border-neutral-700
!bg-neutral-800 text-xs uppercase hover:border-secondary-main"
            onClick={() => setToggleFacebookLogin(true)}
          >
            <div className="flex items-center font-neue-machina text-sm font-bold">
              <span className="absolute left-[15px] top-2.5">
                {toggleFacebookLogin ? (
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
                )}
              </span>
              sign in with Facebook
            </div>
          </Button>
        </div>
        <div>
          <Button
            variant="contained"
            className="mb-[1.125rem] h-[50px] w-[293px] rounded-lg border border-solid border-neutral-700
!bg-neutral-800 text-xs uppercase hover:border-secondary-main"
            onClick={googleLogin}
          >
            <div className="flex items-center font-neue-machina text-sm font-bold">
              <span className="absolute left-[15px]">
                <GoogleIcon />
              </span>
              sign in with Google
            </div>
          </Button>
        </div>
        <div>
          <Button
            variant="contained"
            className="mb-[2.813rem] h-[50px] w-[293px] rounded-lg border border-solid border-neutral-700
!bg-neutral-800 text-xs uppercase hover:border-secondary-main"
            onClick={twitterLogin}
          >
            <div className="flex items-center font-neue-machina text-sm font-bold">
              <span className="absolute left-[15px]">
                <TwitterIcon />
              </span>
              sign in with Twitter
            </div>
          </Button>
        </div>
        <Typography className="pb-[1.188rem] text-center text-xs uppercase text-neutral-500">
          Don’t have account
        </Typography>
        <Box
          component="div"
          className="flex justify-center"
        >
          <ButtonLink
            href="/register"
            text={t("Sign up")}
            icon={null}
            size="medium"
            disabledEndIcon
            className="h-[40px] w-auto !min-w-[108px] border border-solid border-neutral-700 text-sm hover:h-[45px]"
          />
        </Box>
      </Box>
      <ModalCustom
        open={open}
        onClose={handleClose}
        className="w-full gap-3 rounded-[34px] p-[10px] md:w-auto"
        width="auto"
      >
        <Stack
          spacing={3}
          className="md:p-5"
        >
          <ModalHeader
            handleClose={handleClose}
            title="Login"
          />

          <FormLogin />
        </Stack>
      </ModalCustom>
    </>
  )
}

export default SignInLayout
