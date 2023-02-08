export type TStaking = "fixed" | "flexible"
export type TStakingStatus = "locked" | "available"

export interface IStakingBasicData {
  option_title: string
  period: number
  addressContract: string
  startDate: string
  endDate: string
  APR: number
  totalStake: number
  totalReward: number
  poolLimit: number
  stakeType: TStaking
}

export interface IUserStakedInfo {
  comInterest: number
  stakeAmount: number
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

export interface IPeriodOptionsUserStaked {
  type: string
  hex: string
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
  // apr: number
  period: number
  dataBasicStake: IStakingBasicData | null
  dataUserStaked?: IUserStakedInfo | null
}

export interface IStakingGroup {
  datetime: string
  dataAPI: IStakingAll[]
  type: TStaking
}

// export interface IValue {
//   [name: string]: Array<string>
// }

// export interface MyType {
//   [name: string]: string
// }

// export interface MyTypeGroup {
//   [name: string]: IStakingAll
// }
