export interface IStakingPaging {
  _limit: number
  _skip: number
}
export interface IStakingAll {
  createdAt: string
  updatedAt: string
  type: string
  status: string
  contract_address: string
  start_stake_time: string
  end_stake_time: string
  user_stake_limit: number
  pool_stake_limit: number
  pool_reward: number
  apr: number
  is_active: boolean
  id: string
  title: string
  date: string
}

export interface IStakingResponse {
  data: IStakingAll[]
  info: {
    pages: number
    limit: number
    currentCount: number
    totalCount: number
  }
  message: string
  status: boolean
}
