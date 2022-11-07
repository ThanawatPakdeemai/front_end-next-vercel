export interface IRewardPaymentRate {
  item_reward_amount: number
  no: number
}

export interface IPlayToEarnRewardData {
  claim_status: boolean
  item_amount: number
  event_number: number
  score: number
  is_active: boolean
  _id: string
  player_id: string
  item_id: string
  game_id: string
  createdAt: Date
  updatedAt: Date
  current_time: Date
  __v: number
  game_item_name?: string
  game_item_image?: string
  game_name?: string
  game_image?: string
}

export interface IPlayToEarnReward {
  status: boolean
  data: IPlayToEarnRewardData[]
  // Info: IPlayToEarnRewardInfo;
}
