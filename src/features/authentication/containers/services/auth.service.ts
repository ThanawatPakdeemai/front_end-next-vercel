import axios from "axios"
import { IRefreshToken } from "@interfaces/IAuth"
import useProfileStore from "@stores/profileStore"
import Helper from "@utils/helper"
import services from "@configs/axiosGlobalConfig"
import { IProfileResponse } from "@feature/profile/interfaces/IProfileService"
import { ELocalKey } from "@interfaces/ILocal"
import {
  ICreateNewPassword,
  ICreateNewPasswordResponse,
  IForgetPasswordResponse,
  IGetVerifyCode,
  ISignIn,
  ISignUp
} from "@feature/authentication/interfaces/IAuthService"

export const signIn = ({ _email, _password }: ISignIn) =>
  new Promise<IProfileResponse>((resolve, reject) => {
    const data = {
      data: {
        email: _email,
        password: _password
      }
    }
    services
      .put<IProfileResponse>("/auth/authentication", { ...data })
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
  new Promise<IProfileResponse>((resolve, reject) => {
    const data = {
      email: _email,
      password: _password,
      verifycode: _verifycode,
      referral: _referral,
      subscription: _subscription
    }
    services
      .post<IProfileResponse>("/profile/create", { ...data })
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
    const response = await axios.post<IRefreshToken>(
      `/auth/refresh-token`,
      {},
      {
        withCredentials: true
      }
    )
    Helper.setLocalStorage({
      key: ELocalKey.token,
      value: response.data.jwtToken
    })
    axios.defaults.headers.common = {
      Authorization: `Bearer ${response.data.jwtToken}`
    }

    return response.data.jwtToken
  } catch (error) {
    useProfileStore.getState().onReset()
    Helper.resetLocalStorage()
    callBeckWhenError && callBeckWhenError()
    if (error instanceof Error) {
      console.error("Error", error.message)
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
