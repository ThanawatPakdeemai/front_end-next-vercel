export type TStaking = "fixed" | "flexible"

// export interface IMyLockedResponse {
//   status: boolean
//   data: IMyLockedResponseData[]
// }

export interface IMyLockedResponseData {
  option_title: string
  period: number
  addressContract: string
  startDate: string
  endDate: string
  stakeAmount: number
  comInterest: number
  APR: number
  totalStake: number
  totalReward: number
}

export interface IStakingOption {
  option_title: string
  period: number
  addressContract: string
  startDate: string
  endDate: string
  APR: number
  userStaked?: string
}

export interface IStakingInfo {
  status: boolean
  option_title: string
  period: number
  addressContract: string
  startDate: string
  endDate: string
  // eslint-disable-next-line no-use-before-define
  stakeAmount: any // IStakingInfoCOMInterest
  // eslint-disable-next-line no-use-before-define
  comInterest: any // IStakingInfoCOMInterest
  APR: number
}

export interface IStakingInfoCOMInterest {
  type: string
  hex: string
}

export interface IPeriodOptions {
  status: boolean
  option_title: string
  period: number
  addressContract: string
  startDate: string
  endDate: string
  // eslint-disable-next-line no-use-before-define
  userStaked: any // IPeriodOptionsUserStaked | number
  APR: number
  err?: null
}
export interface IPeriodOptionsUserStaked {
  type: string
  hex: string
}

export interface IOptions {
  APR: number
  addressContract: string
  // eslint-disable-next-line no-use-before-define
  comInterest: any // BigNumber
  endDate: string
  option_title: string
  period: number
  stakeAmount: any // BigNumber
  startDate: string
  status: boolean
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

//
export interface IStaking {
  status: boolean
  // eslint-disable-next-line no-use-before-define
  data: any // IStakingdata
  message: string
}

export interface IStakingdata {
  // eslint-disable-next-line no-use-before-define
  data: any[] // IStakingAll[]
  info: {
    pages: number
    limit: number
    currentCount: number
    totalCount: number
  }
  message: string
  status: boolean
}

export interface IGetStack {
  limit: number
  skip: number
}

export interface IStakingAll {
  createdAt: string
  updatedAt: string
  type: TStaking
  status: string
  contract_address: string
  start_stake_time: string
  end_stake_time: string
  user_stake_limit: number
  pool_stake_limit: number
  pool_reward: number
  is_active: boolean
  id: string
  title: string
  date: string

  // Custom values
  apr: number
  period: number
  locked?: IMyLockedResponseData
}

export interface IStakingGroup {
  datetime: string
  data: IStakingAll[]
  data_staked?: IMyLockedResponseData
  type: TStaking
  locked_status: "locked" | "unlocked"
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
