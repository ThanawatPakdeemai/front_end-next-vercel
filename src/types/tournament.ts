/* eslint-disable no-use-before-define */
import { TGameType } from "@feature/game/interfaces/IGameService"
import { IGame, IGameItem } from "./games"

type ITournamentType = "play_for_all" | "tree_match"

export interface IProp {
  gameUrl: string
  gameObject: IGame
  room_no: string
  start_time: string
  end_time: string
  tournament?: ITournamentData
  gameItemSelected?: IGameItem
}

export interface ITournamentResponse {
  status: boolean
  data: boolean
}

export interface ITournamentMessageResponse {
  status: boolean
  message?: ITournamentMessage[]
}

export interface ITournamentMessage {
  msg: string
  param: string
  location: string
}

// Create Player
export interface ITournamentCreatePlayerResponse {
  status: boolean
  message: string
}

// Tournament Data
export interface IGetTournamentResponse {
  status: boolean
  data: ITournamentData
  tournament_type?: ITournamentType
}

export interface ITournamentData {
  _id: string
  condition: ITournamentCondition
  name: string
  desc: string
  reward: number
  status: string
  date_start: Date
  date_end: Date
  current_player_register: number
  banner_image: string
  round: ITournamentRound[]
  privacy_policy: string
  games: ITournamentGames
  tournament_type: string
  register_button: boolean
}

export interface IGetTournamentSumaryResponse {
  status: boolean
  data: ITournamentSumaryData
}
export interface ITournamentSumaryData {
  _id: string
  date_start: string
  date_end: string
  match_type: string
  tournament_id: string
  room_id: string
  player_data: IPlayerDataTournamentSumary[]
}

export interface IPlayerDataTournamentSumary {
  player_id: string
  username: string
  status: string
  score: number
  rank_in_game: number
  email: string
  avatar: string
  round_played_qty: ITournamentSumaryRoundPlayedQtyData[]
}

export interface ITournamentSumaryRoundPlayedQtyData {
  _id: string
  round: string
  number_played: number
}

export interface ITournamentCondition {
  number_of_played: number
  ticket_for_join: number
  qualifying_play: number
  max_player_register: number
}

export interface ITournamentGames {
  _id: string
  name: string
  is_active: boolean
  game_type: TGameType
}

export interface ITournamentRound {
  status: string
  name: string
  detail: string
  date_start: Date
  date_end: Date
  number_play: number
  summary: boolean
  active?: boolean
}

// Type tournament players
export interface ITournamentPlayersResponse {
  status: boolean
  data: ITournamentPlayers[]
  info: ITournamentPlayDataInfo
}
export interface ITournamentPlayers {
  _id: string
  play_data: ITournamentPlayData[]
  status: string
  player_id: string
  username: string
  avatar: string
  sum_score: number
  count_match: number
  rank: number
}

export interface ITournamentPlayData {
  _id: string
  room_id: string
  match_id: string
  score: number
  time_stemp: Date
}

export interface ITournamentPlayDataInfo {
  pages: number
  limit: number
  currentCount: number
  totalCount: number
}

// Type Get Match Tournament
export interface ITournamentMatchResponse {
  status: boolean
  data: ITournamentMatchData[]
}

export interface ITournamentMatchData {
  winner: any
  _id: string
  match_data: ITournamentMatch[]
}

export interface ITournamentMatch {
  id: string
  date_start: Date
  date_end: Date
  match_type: string
  tournament_id: string
  player_data: IPlayerData[]
  played_data: Array<ITournamentMatchPlayerData[]>
  winner: string
  room_id: string
  _id: string
}

export interface ITournamentMatchPlayerData {
  round: number
  avatar: string
  player_id: string
  status: string
  username: string
  date_confirm?: Date
  email: string
  rank_in_game: number
  count_match?: number
  max_score?: number
  min_score?: number
  play_data?: any[]
  sum_score?: number
  score: number
}

export interface IPlayerData {
  player_id: string
  play_data: PlayDaum[]
  username: string
  email: string
  avatar: string
  max_score: number
  min_score: number
  sum_score: number
  count_match: number
}

export interface PlayDaum {
  _id: string
  room_id: string
  match_id: string
  score: number
  time_stemp: string
}

export interface ITournamentLiveResponse {
  status: boolean
  data: boolean
}

// Get user
export interface ITournamentUserResponse {
  status: boolean
  data: ITournamentUserData
}
export interface ITournamentUserData {
  play_data: any[]
  round_played_qty: any[]
  tournament_id: string
  status: string
  is_active: boolean
  id: string
}

export interface ITourLeaderboardServ {
  status: boolean
  data: ITourLeaderData
}

export interface ITourLeaderData {
  match_count: number
  player_match_data: ITourLeadPlayerMatch[]
}

export interface ITourLeadPlayerMatch {
  player_id: string
  username: string
  sum_socre: number
  match_data: ITourLeadMatch[]
}

export interface ITourLeadMatch {
  match_id: string
  player_match_id: string
  username_match: string
  status: string
  room_no: string
}
