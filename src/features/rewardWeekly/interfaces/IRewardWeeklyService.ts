import { IFormatService } from "@interfaces/IHelper"

export interface IWeeklyReward {
  player_id: string
  username: string
  avatar: string
  reward: number
  percent?: number
}

export interface IRewardWeeklyData extends IWeeklyReward {
  _id: string
  walletAddress: string
  email: string
  percentRate: number
  transaction_hash: string
}

export interface IRewardWeekly extends IFormatService {
  data: IRewardWeeklyData[]
}

export interface IRecord {
  previous: string
  next: string
  started_at: string
  ended_at: string
  record: IWeeklyReward[]
}

export interface IWeeklyRewardObject extends IFormatService {
  data: IRecord
}
