/* eslint-disable no-use-before-define */

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
  _verifycode: number | string
  _referral: string | string[]
  _subscription: boolean
}

export interface ISubmit {
  _name: string
  _player_type: string
  _categories: Array<string>
  _description: string
  _short_detail: ISubmitShort
  _game_play_url: string
  _how_to_play: string
}

export interface ISubmitShort {
  developer_name: string
  developer_email: string
  publisher: string
}

export interface IShareToEarnAction {
  player_id: string
  game_id: string
  code: string
}
export interface ITrackingResponse {
  time_expires: string
}
export interface IShareToEarnResponse {
  status: boolean
  message: string
  data: ITrackingResponse
}

export interface IGetVerifyCode {
  _email: string
  _recaptcha: string
}

export interface ICreateNewPassword extends ISignIn {
  _token: string
  _confirmPassword: string
  _recaptcha: string
}

export interface ILoginWithMetamask {
  _account: string | null | undefined
  _accounts: string
  _valueSigner:
    | string
    | { status: boolean; addressContract: string; err: unknown }
}
