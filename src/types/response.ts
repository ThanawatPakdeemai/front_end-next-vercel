/* eslint-disable no-unused-vars */
import { IGame } from "./games"

/**
 * Response type for Create New Password
 */

interface ICreateNewPasswordMessage {
  message: string[]
}
export interface ICreateNewPasswordResponse {
  status: boolean
  // eslint-disable-next-line no-use-before-define
  data: any // ICreateNewPasswordMessage
}

/**
 * Response type for Forgot Password
 */

interface IForgotPasswordResponseMessage {
  message: string
}
export interface IForgotPasswordResponse {
  status: boolean
  // eslint-disable-next-line no-use-before-define
  data: any // IForgotPasswordResponseMessage
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
