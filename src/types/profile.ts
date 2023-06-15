import { TGameType } from "@feature/game/interfaces/IGameService"

export interface IProfileResponse {
  status: number
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any // IProfile
  message: string
}

export interface IGameStatus {
  attribute: string
  value: number
  _id: string
}
export interface IProfile {
  game_status?: IGameStatus[] | null | undefined
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ranks: any // IProfileRank[]
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
  gold: number // for poker
}

export interface IGetUserById {
  status: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any // IGetUserByIdData[]
}
export interface IGetUserByIdData {
  _id: string
  status: number
  createdAt: Date
  email: string
  role: string
  is_active: boolean
  avatar: string
  username: string
  id: string
}

export interface IProfileRank {
  name: string
  score: number
  _id: string
  rank_id: string
  game_id: string
}

export interface IProfileUpdate {
  email: string
  username?: string
  avatar?: string
  subscription?: boolean
}

export interface IProfileVerify {
  email: string
  username: string
  avatar: string
  address: string
  password: string
}

// Type for Register user
export interface IRegister {
  email: string
  verifycode: string
  password: string
  referral?: string | null | undefined
  subscription: boolean
}

// Type for Login user
export interface ILogin {
  username: string
  password: string
  email?: string
}

// Type for provider Login user
export interface ILoginProvider {
  _email: string
  _provider: string
  _prevPath?: string
  _providerUUID: string
  _referral?: string | string[]
}

// Type for ResetPassword
export interface IResetPassword {
  email: string
  token: string
  password: string
  confirmPassword: string
}

// Waiting Room
export interface ICurrentPlayer {
  _id: string
  player_id: string
  avatar: string
  username: string
  rank: string
  timestamp: Date
}

// Badge
export interface IBadgeResponse {
  status: boolean
  message: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  badges: any[] // IBadge[]
}

export interface IBadge {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  criterias: any[] // IBadgeCriteria[]
  name: string
  image: string
  description: string
  is_active: boolean
  createdAt: string
  updatedAt: string
  id: string
}
export interface IBadgeCriteria {
  formula: string
}

// Player Profile -------------------------------------------------
export interface IDataPlayerStatistic {
  status?: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  info?: any // IPlayerPageInfo
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any // IDataPlayerStatisticData
  story: string
  game_type: TGameType
  gamename: string
  image_game: string
  tournament?: boolean
}

export interface IDataPlayerStatisticData {
  totel_earn: number
  winrate: string
  totel_deposit: number
  totel_withdraw: number
  rank: string
  score_rank: number
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user_detail?: any // IPlayerInfoUserDetail
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  game_data?: any[] // IPlayerInfoGameData[]
}

export interface IPlayerInfoGameData {
  name: string
  story: string
  image: string
  game_type: TGameType
  winrate: string
  played: number
  rank: string
  rankScore: number
  _id: string
  player_id: string
  wallet_address: string
  tx_address: string
  current_score: number
  cheat: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  play_detail: any // PlayDetail
  is_active: boolean
  naka_for_player?: number
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  gamerooms: any // IPlayerInfoGamerooms
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  games: any // IGamesData
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rewards: any[] // IPlayerInfoReward[]
  id: string
}

export interface IPlayerInfoGamerooms {
  _id: string
  start_time: Date
  end_time: Date
  amount_played: number
  room_number: number
}

export interface IGamesData {
  _id: string
  name: string
}

export interface PlayDetail {
  score?: number
  normal?: number
  item?: number
  kill?: number
  head_shot?: number
  win?: number
  death?: number
  die?: number
  distance?: number
  coins?: number
  player_name?: string
  rank?: number
  rank_score?: number
  kill_score?: number
  time_count?: number
  time_hidden?: number
  raccoon?: number
  ball?: number
  totol_raccoon?: number
  star?: number
  ring?: number
  level?: number
  speedTime?: number
  playerSpeed?: number
  bullet_used?: number
  bullet_left?: number
  bullet_holder?: string
}

export interface IPlayerInfoReward {
  _id: string
  send_status: boolean
  naka_for_player: number
}
export interface IPlayerInfoUserDetail {
  status?: number
  createdAt?: Date
  updatedAt?: Date
  banned?: any[]
  _id?: string
  ban_time?: Date
  friend?: any[]
  email?: string
  nonce?: number
  role?: string
  is_active?: boolean
  avatar?: string
  username?: string
  address?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ranks?: any[] // IPlayerInfoRankElement[]
  google_provider_id?: string
  current_time?: Date
  badges?: any[]
  id?: string
}

export interface IPlayerInfoRankElement {
  name: string
  score: number
  _id: string
  rank_id: string
  game_id: string
}

export interface IPlayerPageInfo {
  pages?: number
  limit?: number
  currentCount?: number
  totalCount?: number
}
export interface INaxtround {
  status: string
  name: string
  detail: string
  date_start: Date
  date_end: Date
  number_play: number
  summary: boolean
}

// Player Info
export interface IPlayerInfoResponse {
  status: boolean
  message: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any // IPlayerInfoData
}

export interface IPlayerInfoData {
  username: string
  email: string
  avatar: string
  total_deposit?: number
  total_withdraw?: number
  total_game_played: number
  total_reward: number
  total_win_rate: string
  game_data: IPlayerInfoGameData[]
}
export interface IProfileRegister {
  email: string
  exp: number
  stamina_point: number
  nonce: number
  status: number
  friend: any[]
  role: string
  banned: any[]
  is_active: boolean
  id: string
  subscription: boolean
  ranks: any[]
  level: number
  max_exp: number
  game_status: any[]
  jwtToken: string
  createdAt: string
  updatedAt: string
  private_user: boolean
  discord_reward_claimed: boolean
  sent_email_discord: boolean
  game_favorite: any[]
  _id: string
  badges: any[]
  current_time: string
}

export interface IDataFaceBook {
  height: number
  is_silhouette: boolean
  url: string
  width: number
}
export interface IPictureFaceBook {
  data: IDataFaceBook
}
export interface IProfileFaceBook {
  name: string
  email: string
  picture: IPictureFaceBook
  id: string
  accessToken: string
  userID: string
  expiresIn: number
  signedRequest: string
  graphDomain: string
  data_access_expiration_time: number
}
