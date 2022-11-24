export interface INotification {
  _id: string
  createdAt: Date
  room_id?: string
  game_id: string
  player_id: string
  detail: string
  read: boolean
  type: string
  naka_for_player: number
  game_name: string
  path: string
  weekly_pool_id?: string
  pool_id?: string
}
