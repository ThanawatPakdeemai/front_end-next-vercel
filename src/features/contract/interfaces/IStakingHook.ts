import {
  IStakingAll,
  IStakingResponse
} from "@features/staking/interfaces/IStakingService"

interface IStakingBase {
  option_title: string
  period: number
  addressContract: string
  startDate: string
  endDate: string
  APR: number
}

interface IStatus {
  status: boolean
}

export interface IStakingOption extends IStakingBase {
  userStaked?: string
}

export interface IStakingInfoCOMInterest {
  type: string
  hex: string
}

export interface IStakingInfo extends IStakingBase, IStatus {
  stakeAmount: IStakingInfoCOMInterest
  comInterest: IStakingInfoCOMInterest
}

export interface IPeriodOptionsUserStaked extends IStakingInfoCOMInterest {}

export interface IPeriodOptions extends IStakingBase, IStatus {
  userStaked: IPeriodOptionsUserStaked | number
  err?: null
}

export interface IOptions extends IStakingBase, IStatus {
  comInterest: string
  stakeAmount: string
  error: any
}

export interface BigNumber {
  _hex: string
  _isBigNumber: boolean
}

export interface IStakingProps {
  stakingProps: string
  stakingTypes: string
}

export interface IStaking {
  status: boolean
  data: IStakingResponse
  message: string
}

export interface IGetStack {
  limit: number
  skip: number
}

export interface IStakingGroup {
  contract_address: string
  date: string
}

export interface IValue {
  [name: string]: Array<string>
}

export interface MyType {
  [name: string]: string
}

export interface MyTypeGroup {
  [name: string]: IStakingAll
}
