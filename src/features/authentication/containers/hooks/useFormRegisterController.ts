import React, { useEffect, useState } from "react"
import * as yup from "yup"
import _ from "lodash"

import { MESSAGES } from "@constants/messages"
import { useToast } from "@feature/toast/containers"
import { useGoogleReCaptcha } from "react-google-recaptcha-v3"
import useVerifyCode from "@feature/authentication/containers/hooks/useVerifyCode"
import useSignUp from "@feature/authentication/containers/hooks/useSignUp"
import {
  TwitterAuthProvider,
  GoogleAuthProvider,
  getAuth,
  signInWithPopup
} from "firebase/auth"
import { initializeApp, getApps, getApp } from "@firebase/app"
import { useRouter } from "next/router"
import useLoginProvider from "@feature/authentication/containers/hooks/useLoginProvider"
import { IProfileFaceBook } from "@src/types/profile"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import useFormController from "./useFormController"

export interface TFormData {
  email: string
  password: string
  confirmPassword: string
  code: number
  subscription: boolean
  referralId: string | string[]
}

const useFormRegisterController = () => {
  const { executeRecaptcha } = useGoogleReCaptcha()
  const { mutateVerifyCode } = useVerifyCode()
  const { mutateSignUp } = useSignUp()
  const { mutateLoginProvider } = useLoginProvider()
  const { errorToast, successToast } = useToast()
  const { patternPasswordUppercase, emailCorrect } = useFormController()
  const router = useRouter()
  const { referral } = router.query

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

  const [verifiCode, setVerifiCode] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
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
          .catch((error: Error) => {
            errorToast(error.message)
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
    // const app = initializeApp(firebaseConfig)
    const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
    const auth = getAuth(app)
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
    // const app = initializeApp(firebaseConfig)
    const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
    const auth = getAuth(app)
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
        _referral: referralId ?? "",
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
    let load = false

    if (!load) isConfirmPassword(watch("password"), watch("confirmPassword"))

    return () => {
      load = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch("password"), watch("confirmPassword")])

  return {
    SignUpSchema,
    firebaseConfig,
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
    isConfirmPassword,
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
  }
}

export default useFormRegisterController
