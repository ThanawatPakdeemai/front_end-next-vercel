export type RewardType =
  | "REWARD_WEEKLY"
  | "REWARD"
  | "REWARD_ITEM"
  | "RETURN_ITEM"
  | "REWARD_GAME_POOL"
  | "GAME_FREE"
export interface INotification {
  _id: string
  createdAt: Date
  room_id?: string
  game_id: string
  game_type: string
  player_id: string
  detail: string
  read: boolean
  type: RewardType
  naka_for_player: number
  game_name: string
  path: string
  weekly_pool_id?: string
  pool_id?: string
  game_mode?: string
}
