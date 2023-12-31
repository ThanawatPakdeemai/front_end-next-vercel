import _ from "lodash"
import { MESSAGES } from "@constants/messages"
import { useToast } from "@feature/toast/containers"
import { useSession, signOut } from "next-auth/react"
import { initializeApp, getApps } from "@firebase/app"
import useLoginProvider from "@feature/authentication/containers/hooks/useLoginProvider"
import { useForm } from "react-hook-form"
import { ISignIn } from "@feature/authentication/interfaces/IAuthService"
import { IError } from "@src/types/contract"
import useConnectMetamaskAction from "@utils/useConnectMetamesk"
import { useWeb3Provider } from "@providers/Web3Provider"
import Web3 from "web3"
import { useCallback } from "react"
import { useLinkToDiscord } from "@feature/profile/containers/hook/useSyncProfileQuery"
import { providers } from "ethers"
import useSignIn from "./useSignIn"
import useLoginMetamask from "./useLoginMetamask"

export interface TFormData {
  email: string
  password: string
  confirmPassword: string
  code: number
  subscription: boolean
  referralId: string | string[]
}

const useFormLoginController = () => {
  const { mutateSignIn, isLoading } = useSignIn()
  const { mutateLoginProvider } = useLoginProvider()
  const { mutateLoginMetamask } = useLoginMetamask()
  const { successToast, errorToast } = useToast()

  const web3 = new Web3(Web3.givenProvider)
  const { address: account } = useWeb3Provider()
  const { getSignature } = useConnectMetamaskAction()
  // const { mutateLinkToFacebook } = useLinkToFacebook()
  // const { fetchProfile } = useProfileController()

  const { data: session }: any = useSession()
  const { mutateLinkToDiscord } = useLinkToDiscord()

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

  const { register, handleSubmit } = useForm({
    defaultValues: {
      _email: "",
      _password: ""
    }
  })

  const onSubmitLogin = (_data: ISignIn) => {
    mutateSignIn({ _email: _data._email, _password: _data._password })
      .then((_profile) => {
        if (_profile) {
          successToast(MESSAGES.sign_in_success)
          // isMobile && router.push("/")
        }
      })
      .catch(() => {})
  }

  const onError = () => {
    errorToast(MESSAGES.please_fill)
  }

  // const facebookLogin = useCallback(
  //   (response: IProfileFaceBook) => {
  //     if (
  //       response.email !== null &&
  //       response.email !== undefined &&
  //       response.userID !== null &&
  //       response.userID !== undefined
  //     ) {
  //       mutateLoginProvider({
  //         _email: response.email,
  //         _provider: "facebook",
  //         _prevPath: "/",
  //         _providerUUID: response.userID,
  //         _referral: ""
  //       })
  //         .then((_res) => {
  //           if (_res) {
  //             successToast(MESSAGES.logged_in_successfully)
  //             // Save user Facebook id to user's account
  //             mutateLinkToFacebook({
  //               player_id: _res.id,
  //               facebook_id: response.userID
  //             }).then((res) => {
  //               if (res.facebook_id) {
  //                 successToast(MESSAGES.sync_facebook_success)
  //                 // Fetch profile without reloading page
  //                 fetchProfile(_res, false)
  //               }
  //             })
  //           }
  //         })
  //         .catch((_error: IError) => {
  //           errorToast(MESSAGES.logged_in_unsuccessfully || _error.message)
  //         })
  //     }
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   },
  //   [
  //     errorToast,
  //     mutateLoginProvider,
  //     successToast,
  //     mutateLinkToFacebook,
  //     fetchProfile
  //   ]
  // )

  const facebookLogin = useCallback(async () => {
    if (session && session?.user?.email && session?.user?.id) {
      mutateLoginProvider({
        _email: session.user.email,
        _provider: "facebook",
        _prevPath: "/",
        _providerUUID: session.user.id,
        _referral: ""
      })
        .then((_res) => {
          if (_res) {
            successToast(MESSAGES.logged_in_successfully)
          }
        })
        .catch((_error) => {
          errorToast(MESSAGES.logged_in_unsuccessfully || _error.message)
        })
    } else {
      errorToast(MESSAGES.logged_in_unsuccessfully)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorToast, mutateLoginProvider, successToast, session])

  /**
   * @description Login with Google
   */
  const googleLogin = useCallback(async () => {
    if (session && session?.user?.email && session?.user?.id) {
      mutateLoginProvider({
        _email: session.user.email,
        _provider: "google",
        _prevPath: "/",
        _providerUUID: session.user.id,
        _referral: ""
      })
        .then((_res) => {
          if (_res) {
            successToast(MESSAGES.logged_in_successfully)
          }
        })
        .catch((_error) => {
          errorToast(MESSAGES.logged_in_unsuccessfully || _error.message)
        })
    } else {
      errorToast(MESSAGES.logged_in_unsuccessfully)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorToast, mutateLoginProvider, successToast, session])

  /**
   * @description Login with Twitter
   */
  const twitterLogin = useCallback(async () => {
    if (session && session?.user?.email && session?.user?.id) {
      mutateLoginProvider({
        _email: session.user.email,
        _provider: "twitter",
        _prevPath: "/",
        _providerUUID: session.user.id,
        _referral: ""
      })
        .then((_res) => {
          if (_res) {
            successToast(MESSAGES.logged_in_successfully)
          }
        })
        .catch((_error) => {
          errorToast(MESSAGES.logged_in_unsuccessfully || _error.message)
        })
    } else {
      errorToast(MESSAGES.logged_in_unsuccessfully)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorToast, mutateLoginProvider, successToast, session])

  /**
   * @description Login with Twitter
   */
  const discordLogin = useCallback(async () => {
    if (session && session?.user?.email && session?.user?.id) {
      mutateLoginProvider({
        _email: session.user.email,
        _provider: "discord",
        _prevPath: "/",
        _providerUUID: session.user.id,
        _referral: ""
      })
        .then((_res) => {
          if (_res && _res.email) {
            mutateLinkToDiscord({
              email: _res.email,
              discord_id: session?.user.id
            }).then((res) => {
              if (res.discord_id) {
                successToast(MESSAGES.logged_in_successfully)
              }
            })
            successToast(MESSAGES.logged_in_successfully)
          }
        })
        .catch((_error) => {
          errorToast(MESSAGES.logged_in_unsuccessfully || _error.message)
          if (_error.response.status === 404) {
            signOut({ redirect: false })
          }
        })
    } else {
      errorToast(MESSAGES.logged_in_unsuccessfully)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorToast, mutateLoginProvider, successToast, session])

  /**
   * @description Login with Metamask
   */
  const metaMarkLogin = useCallback(async () => {
    let accounts: Array<string> = []
    try {
      await web3?.givenProvider?.request({ method: "eth_requestAccounts" })
      accounts = await web3.eth.getAccounts()
    } catch (_error) {
      errorToast(MESSAGES["please-connect-wallet"])
    }
    if (!accounts) return
    const valueSigner = await getSignature(accounts[0])
    if (valueSigner.status && valueSigner.result) {
      mutateLoginMetamask({
        _account: account,
        _accounts: accounts[0],
        _valueSigner: valueSigner.result
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, errorToast, mutateLoginMetamask, successToast])

  /**
   * @description Login with Metamask
   */
  const okxLogin = useCallback(async () => {
    let accounts: Array<string> = []
    if (!window.okxwallet) return errorToast("OKX Wallet Extension not found!")
    try {
      await window.okxwallet
        .send("eth_requestAccounts", [])
        .then((response) => {
          if (response.result.length > 0) {
            accounts = response.result as Array<string>
          }
        })
    } catch (_error) {
      errorToast(MESSAGES["please-connect-wallet"])
    }
    const provider = new providers.Web3Provider(window.okxwallet)
    const signer = provider.getSigner(accounts[0])

    const _signature = await signer.signMessage(
      `NAKAMOTO Authentication: ${accounts[0]}`
    )
    if (_signature) {
      mutateLoginMetamask({
        _account: account,
        _accounts: accounts[0],
        _valueSigner: _signature
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, errorToast, mutateLoginMetamask, successToast])
  return {
    register,
    isLoading,
    onSubmitLogin,
    onError,
    handleSubmit,
    facebookLogin,
    googleLogin,
    twitterLogin,
    metaMarkLogin,
    discordLogin,
    okxLogin
  }
}

export default useFormLoginController
