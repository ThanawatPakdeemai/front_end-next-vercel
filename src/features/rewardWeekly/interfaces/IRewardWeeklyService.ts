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
