import { IInfo } from "@interfaces/IHelper"

export interface IProfileRank {
  name: string
  score: number
  _id: string
  rank_id: string
  game_id: string
}

export interface IPlayerInfoRankElement extends IProfileRank {}

interface IProfileBase {
  subscription: boolean
  email: string
}

interface IProfileMain extends IProfileBase {
  status: number
  createdAt: Date
  role: string
  is_active: boolean
  avatar: string
  username: string
  address: string
  id: string
}

export interface IProfile extends IProfileMain {
  updatedAt: Date
  banned: []
  ban_time: Date
  friend: []
  nonce: number
  ranks: IProfileRank[]
  jwtToken: string
  stamina_point: number
  total_stamina: number
  recovery_stamina_time: Date
  country: string
  user_ip_address: string
  max_exp: number
  exp: number
  level: number
}

export interface IGetProfileResponse extends IProfileMain {
  _id: string
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

// Type for Register user
export interface IRegister extends IProfileBase {
  verifycode: string
  password: string
  referral?: string | null | undefined
}

export interface IProfileResponse {
  status: boolean
  data: IProfile | null
  message: string | null
}

export interface IGetUserById {
  status: boolean
  data: IGetUserByIdData[]
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

// Type for Login user
export interface ILogin {
  username: string
  password: string
  email?: string
}

// Type for provider Login user
export interface ILoginProvider {
  email: string
  provider: string
  providerUUID: string
  referral?: string
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
export interface IBadgeCriteria {
  formula: string
}

export interface IBadge {
  criterias: IBadgeCriteria[]
  name: string
  image: string
  description: string
  is_active: boolean
  createdAt: string
  updatedAt: string
  id: string
}

export interface IBadgeResponse {
  status: boolean
  message: string
  badges: IBadge[]
}

// Player Profile
export interface IPlayerInfoReward {
  _id: string
  send_status: boolean
  naka_for_player: number
}

export interface IGamesData {
  _id: string
  name: string
}

export interface IPlayerInfoGamerooms {
  _id: string
  start_time: Date
  end_time: Date
  amount_played: number
  room_number: number
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

export interface IPlayerInfoGameData {
  _id: string
  player_id: string
  wallet_address: string
  tx_address: string
  current_score: number
  cheat: boolean
  play_detail: PlayDetail
  is_active: boolean
  naka_for_player?: number
  gamerooms: IPlayerInfoGamerooms
  games: IGamesData
  rewards: IPlayerInfoReward[]
  id: string
}

export interface IPlayerPageInfo {
  pages?: number
  limit?: number
  currentCount?: number
  totalCount?: number
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
  ranks?: IPlayerInfoRankElement[]
  google_provider_id?: string
  current_time?: Date
  badges?: any[]
  id?: string
}

export interface IDataPlayerStatisticData {
  totel_earn: number
  winrate: string
  totel_deposit: number
  totel_withdraw: number
  rank: string
  score_rank: number
  user_detail?: IPlayerInfoUserDetail
  game_data?: IPlayerInfoGameData[]
}

export interface IDataPlayerStatistic {
  status?: boolean
  info?: IPlayerPageInfo
  data: IDataPlayerStatisticData
  story: string
  game_type: string
  gamename: string
  image_game: string
  tournament?: boolean
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

export interface IPlayerInfoResponse {
  status: boolean
  message: string
  data: IPlayerInfoData
}

export interface IDataPlayerInfoResponse {
  status: boolean
  data: IDataPlayerStatisticData
  info: IInfo
}

export interface IUpdateProfile {
  _email: string
  _username: string
  _avatar: string
  _subscription: boolean
  _country: string
  _user_ip_address: string
}

export interface IUpdateWalletAddress {
  _email: string
  _address: string
}

export interface IGetPlayerInfoByPlayerId {
  _playerId: string
  _limit: number
  _page: number
  _sort: string
}

export interface IGetDataPlayerInfo extends IGetPlayerInfoByPlayerId {
  _gameId: string
}
