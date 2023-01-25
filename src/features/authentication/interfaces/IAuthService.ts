import { IInfo } from "@interfaces/IHelper"

interface ICreateNewPasswordData {
  message: string
}

interface IForgetPasswordData extends ICreateNewPasswordData {
  token: string
}

export interface IForgetPasswordResponse {
  status: boolean
  data: IForgetPasswordData
  info: IInfo
}

export interface ICreateNewPasswordResponse {
  status: boolean
  data: ICreateNewPasswordData
  info: IInfo
}

export interface ISignIn {
  _email: string
  _password: string
}

export interface ISignUp extends ISignIn {
  _verifycode: string
  _referral: string
  _subscription: string
}

export interface IGetVerifyCode {
  _email: string
  _recaptcha: string
}

export interface ICreateNewPassword extends ISignIn {
  _token: string
  _confirmPassword: string
}
