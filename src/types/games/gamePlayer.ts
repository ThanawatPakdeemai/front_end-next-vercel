export interface IPlayerInfo {
  tag?: string
  owner?: boolean
  ready?: boolean
  // Custom
  isActive: boolean
  // Default
  status: string
  item_burn: boolean
  transaction_status: boolean
  _id: string
  player_id: string
  avatar: string
  username: string
  timestamp: string
  rank: string
}
