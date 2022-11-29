import { IInfo } from "@interfaces/IHelper"

interface ICreateNewPasswordData {
  message: string
}

interface IForgetPasswordData extends ICreateNewPasswordData {
  token: string
}

export interface IForgetPassword {
  status: boolean
  data: IForgetPasswordData
  info: IInfo
}

export interface ICreateNewPassword {
  status: boolean
  data: ICreateNewPasswordData
  info: IInfo
}
