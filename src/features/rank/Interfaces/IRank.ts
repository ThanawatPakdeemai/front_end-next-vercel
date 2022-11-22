export interface IProfileRanks {
  name: string
  score: number
  _id: string
  rank_id: string
  game_id: string
}
export interface IRank {
  status: number
  createdAt: Date
  updatedAt: Date
  banned: []
  ban_time: Date
  friend: []
  email: string
  nonce: number
  role: string
  is_active: boolean
  avatar: string
  username: string
  address: string
  ranks: IProfileRanks[]
  id: string
  jwtToken: string
  subscription: boolean
  stamina_point: number
  total_stamina: number
  recovery_stamina_time: Date
  country: string
  user_ip_address: string
  max_exp: number
  exp: number
  level: number
}
