import { BigNumber } from "ethers"

export interface IPropsFormatNumberOption {
  notation?: "standard" | "scientific" | "engineering" | "compact"
  compactDisplay?: "short" | "long"
  maximumFractionDigits?: number
}

export interface IInfo {
  pages: number
  limit: number
  currentCount: number
  totalCount: number
}

export interface IInfoFormatServ {
  info: IInfo
}

export interface IStatusFormatServ {
  status: boolean
}

export interface IFormatService extends IInfoFormatServ, IStatusFormatServ {}

export interface IFormatMessageService extends IStatusFormatServ {
  message: string
}

export interface IBalance extends IStatusFormatServ {
  data: BigNumber
}
