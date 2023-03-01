import axios from "axios"
import { IRefreshToken, IRevorkToken } from "@interfaces/IAuth"
import useProfileStore from "@stores/profileStore"
import Helper from "@utils/helper"
import services from "@configs/axiosGlobalConfig"
import { IProfile } from "@feature/profile/interfaces/IProfileService"
import { ELocalKey } from "@interfaces/ILocal"
import {
  ICreateNewPassword,
  ICreateNewPasswordResponse,
  IForgetPasswordResponse,
  IGetVerifyCode,
  ILoginWithMetamask,
  ISignIn,
  ISignUp
} from "@feature/authentication/interfaces/IAuthService"
import { ILoginProvider, IProfileRegister } from "@src/types/profile"

export const signIn = ({ _email, _password }: ISignIn) =>
  new Promise<IProfile>((resolve, reject) => {
    const data = {
      data: {
        email: _email,
        password: _password
      }
    }
    services
      .put<IProfile>("/auth/authentication", { ...data })
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => reject(error))
  })

export const signUp = ({
  _email,
  _password,
  _verifycode,
  _referral,
  _subscription
}: ISignUp) =>
  new Promise<IProfile>((resolve, reject) => {
    const data = {
      data: {
        email: _email,
        password: _password,
        verifycode: _verifycode.toString(),
        referral: _referral,
        subscription: _subscription
      }
    }
    services
      .post<IProfile>("/profile/create", { ...data })
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => reject(error))
  })

/**
 * @description Function has avariable for user role "ADMIN"
 * @param _token JWT token
 * @returns
 */
export const signOut = async () =>
  new Promise((resolve) => {
    resolve(null)
  })

export const refreshProfileToken = async (
  callBeckWhenError?: () => void
): Promise<any | undefined> => {
  try {
    services
      .post<IRefreshToken>(
        `/auth/refresh-token`,
        {},
        {
          withCredentials: true
        }
      )
      .then((_response) => {
        Helper.setLocalStorage({
          key: ELocalKey.token,
          value: _response.data.jwtToken
        })
        axios.defaults.headers.common = {
          Authorization: `Bearer ${_response.data.jwtToken}`
        }

        return _response.data.jwtToken
      })
      .catch((error) => {
        useProfileStore.getState().onReset()
        Helper.resetLocalStorage()
        callBeckWhenError && callBeckWhenError()
        if (error instanceof Error) {
          // console.error("Error", error.message)
          throw Error(`refreshToken : ${error}`)
        }
      })
  } catch (error) {
    useProfileStore.getState().onReset()
    Helper.resetLocalStorage()
    callBeckWhenError && callBeckWhenError()
    if (error instanceof Error) {
      // console.error("Error", error.message)
      throw Error(`refreshToken : ${error}`)
    }
  }
}

export const getVerifyCode = ({ _email, _recaptcha }: IGetVerifyCode) =>
  new Promise<{ message: string }>((resolve, reject) => {
    services
      .get<{ message: string }>(`/profile/getcode/${_email}`, {
        headers: {
          "g-recaptcha-token": _recaptcha
        }
      })
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => reject(error))
  })

export const forgotPassword = (_email: string) =>
  new Promise<IForgetPasswordResponse>((resolve, reject) => {
    services
      .get<IForgetPasswordResponse>(`/profile/reset-password/${_email}`)
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => reject(error))
  })

export const createNewPassword = ({
  _email,
  _token,
  _password,
  _confirmPassword
}: ICreateNewPassword) =>
  new Promise<ICreateNewPasswordResponse>((resolve, reject) => {
    const data = {
      email: _email,
      password: _password,
      confirmPassword: _confirmPassword,
      token: _token
    }
    services
      .post<ICreateNewPasswordResponse>(`/profile/reset-password`, { ...data })
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => reject(error))
  })

export const revokeToken = async () => {
  const token = localStorage.getItem("token")
  return (
    axios
      // สั่งให้ token รอบต่อไป จะหมดอายุ เพื่อไม่ให้ refresh อีก
      .post<IRevorkToken>(`/auth/revoke-token`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((res) => res.data)
      .catch((error: Error) => error)
  )
}

export const loginProvider = ({
  _email,
  _provider,
  _prevPath,
  _providerUUID,
  _referral
}: ILoginProvider) =>
  new Promise((resolve, reject) => {
    const data = {
      email: _email,
      provider: _provider,
      prevPath: _prevPath,
      providerUUID: _providerUUID,
      referral: _referral
    }
    const dataNoReferral = {
      email: _email,
      provider: _provider,
      providerUUID: _providerUUID
    }
    services
      .post<IProfileRegister>(
        "/auth/signin/with_provider",
        _referral === null || _referral === "" || _referral === undefined
          ? { ...dataNoReferral }
          : { ...data }
      )
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
  })

export const loginMetamask = ({
  _account,
  _accounts,
  _valueSigner
}: ILoginWithMetamask) =>
  new Promise<IProfile>((resolve, reject) => {
    const data = {
      wallet_address: _account || _accounts,
      signature: _valueSigner
    }
    services
      .post<IProfile>("/auth/signin/with_wallet", { ...data })
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
  })
