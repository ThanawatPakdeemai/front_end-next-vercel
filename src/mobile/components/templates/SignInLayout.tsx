/* eslint-disable no-unused-vars */
import React, { useState } from "react"
import { Box, Button, Divider, Typography } from "@mui/material"
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  TwitterAuthProvider
} from "firebase/auth"
import { getApps, initializeApp } from "@firebase/app"
import CardNoReward from "@feature/game/containers/components/atoms/CardNoReward"
import TwitterIcon from "@components/icons/SocialIcon/TwitterIcon"
import useLoginTypeStore from "@stores/loginTypes"
// import FacebookLogin from "react-facebook-login"
import useLoginProvider from "@feature/authentication/containers/hooks/useLoginProvider"
import { useToast } from "@feature/toast/containers"
import { IProfileFaceBook } from "@src/types/profile"
import { IError } from "@src/types/contract"
import { MESSAGES } from "@constants/messages"
import LogoNakaBigIcon from "@components/icons/LogoNakaBigIcon"
import GoogleColorIcon from "@components/icons/SocialIcon/GoogleColorIcon"
import FacebookColorIcon from "@components/icons/SocialIcon/FacebookColorIcon"
import Link from "next/link"
import LoginModal from "../organisms/modal/LoginModal"

const SignInLayout = () => {
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

  const [openModal, setOpenModal] = useState<boolean>(false)

  const handleModalLogin = () => setOpenModal(!openModal)

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
        <Box
          component="div"
          className="mb-20 flex justify-center"
        >
          <LogoNakaBigIcon />
        </Box>
        <Typography className="my-8 text-center font-urbanist text-3xl font-bold uppercase text-red-card">
          Welcome Back
        </Typography>
        <Box component="div">
          <Button
            variant="contained"
            className="mb-[1.125rem] h-[50px] w-[293px] rounded-2xl border border-solid border-neutral-690 !bg-neutral-800"
            onClick={googleLogin}
          >
            <div className="flex items-center font-urbanist text-base font-medium">
              <span className="pr-2">
                <FacebookColorIcon />
              </span>
              <span>Sign in with Facebook</span>
            </div>
          </Button>
        </Box>
        <Box component="div">
          <Button
            variant="contained"
            className="mb-[1.125rem] h-[50px] w-[293px] rounded-2xl border border-solid border-neutral-690 !bg-neutral-800"
            onClick={googleLogin}
          >
            <div className="flex items-center font-urbanist text-base font-medium">
              <span className="pr-2">
                <GoogleColorIcon />
              </span>
              <span>Sign in with Google</span>
            </div>
          </Button>
        </Box>
        <Box component="div">
          <Button
            variant="contained"
            className="h-[50px] w-[293px] rounded-2xl border border-solid border-neutral-690 !bg-neutral-800"
            onClick={twitterLogin}
          >
            <div className="flex items-center font-urbanist text-base font-medium">
              <span className="pr-2">
                <TwitterIcon fill="#1D9BF0" />
              </span>
              <span>Sign in with Twitter</span>
            </div>
          </Button>
        </Box>
        <Box
          component="div"
          className="py-4"
        >
          <Divider className="font-urbanist font-medium text-white-default">
            or
          </Divider>
        </Box>
        <Box component="div">
          <Button
            variant="contained"
            className="mb-6 h-[50px] w-[293px] rounded-bl-3xl border border-solid border-error-100 !bg-error-100"
            onClick={handleModalLogin}
          >
            <div className="flex items-center font-urbanist text-base font-bold">
              Sign in with Email
            </div>
          </Button>
        </Box>
        <Box
          component="div"
          className="flex justify-center text-center"
        >
          <p className="pr-2 text-sm font-normal text-[#fff]">
            Don’t have an account?
          </p>
          <Link
            href="/register"
            className="text-sm font-normal text-warning-100"
          >
            Sign up
          </Link>
        </Box>
        <CardNoReward
          className="!rounded-none !border-none !bg-transparent !p-5"
          showIconTM={false}
        />
      </Box>
      {/* Modal Login */}
      <LoginModal
        open={openModal}
        setOpenLogin={(_toggle) => setOpenModal(_toggle)}
      />
    </>
  )
}

export default SignInLayout
