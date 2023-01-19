import { IGame } from "./games"

/**
 * Response type for Create New Password
 */
export interface ICreateNewPasswordResponse {
  status: boolean
  // eslint-disable-next-line no-use-before-define
  data: any // ICreateNewPasswordResponseMessage
}

interface ICreateNewPasswordResponseMessage {
  message: string[]
}

/**
 * Response type for Forgot Password
 */
export interface IForgotPasswordResponse {
  status: boolean
  // eslint-disable-next-line no-use-before-define
  data: any // IForgotPasswordResponseMessage
}

interface IForgotPasswordResponseMessage {
  message: string
}

/**
 * Response getNakaBalanceVault()
 */
export interface IBalanceResponse {
  status: boolean
  data: number
}

/**
 * Response updateWalletAddress
 */
export interface IUpdateWalletAddress {
  status: boolean
  message: string
  error?: string
}

/**
 * Response fetchGameById
 */

export interface IResponseGameById {
  status: boolean
  data: IGame[]
}
