export interface IRewardWeeklyData {
  _id: string
  player_id: string
  username: string
  walletAddress: string
  email: string
  avatar: string
  reward: number
  percentRate: number
  transaction_hash: string
}

export interface IRewardWeekly {
  status: boolean
  data: IRewardWeeklyData[]
}

export interface IWeeklyReward {
  player_id: string
  avatar: string
  username: string
  percent: number
  reward: number
}

export interface IRecord {
  previous: string
  next: string
  started_at: string
  ended_at: string
  record: IWeeklyReward[]
}

export interface IWeeklyRewardObject {
  data: IRecord
}
