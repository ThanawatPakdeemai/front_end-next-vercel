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

export interface IGetWeeklyReward {
  game_id: string
  weeklyId: string
}

export interface IWeeklyPoolByGameIdDataRecord {
  player_id: string
  avatar: string
  username: string
  percent: number
  reward: number
}

export interface IWeeklyPoolByGameIdData {
  previous: string
  next: string
  started_at: string
  ended_at: string
  record: IWeeklyPoolByGameIdDataRecord[]
}

export interface IWeeklyPoolByGameIdResponse {
  data: IWeeklyPoolByGameIdData
}
