import { IFormatService } from "@src/interfaces/IHelper"

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
  game_type: string
}

export interface ITournamentRound {
  _id: string
  status: string
  name: string
  detail: string
  date_start: Date
  date_end: Date
  number_play?: number
  summary?: boolean
  number_player?: number
}

export interface ITournamentData {
  _id: string
  condition: ITournamentCondition
  register_button: boolean
  name: string
  desc: string
  reward: string
  date_start: Date
  date_end: Date
  current_player_register: number
  tournament_type: string
  banner_image: string
  round: ITournamentRound[]
  privacy_policy: string
  status: string
  games: ITournamentGames
}

export interface ITournamentGamePlay {
  player_id: string
  username: string
  email: string
  avatar: string
}

export interface ITournamentGamePlayedData extends ITournamentGamePlay {
  status: string
  score?: number
  round: number
}

export interface ITournamentPlayerData extends ITournamentGamePlay {
  max_score: number
  min_score: number
  sum_score: number
  count_match: number
}

export interface ITournamentMatchData {
  id: string
  date_start: Date
  date_end: Date
  match_type: string
  tournament_id: string
  round: number
  player_data: ITournamentPlayerData[]
  played_data: Array<ITournamentGamePlayedData[]>
  winner: string
  room_id: null
}

export interface ITournamentPlayData {
  _id: string
  room_id: string
  match_id: string
  score: number
  time_stemp: Date
}

export interface ITournamentPlayerList {
  _id: string
  play_data: ITournamentPlayData[]
  status: string
  player_id: string
  username: string
  avatar: string
  address: string
  sum_score: number
  max_score: number
  count_match: number
  rank: number
}

export interface ITournamentMatch {
  _id: string
  match_data: ITournamentMatchData[]
}

export interface ITournamentRoundPlayedQty {
  _id: string
  round: string
  number_played: number
}

export interface ITournamentHistory {
  play_data: ITournamentPlayData[]
  round_played_qty: ITournamentRoundPlayedQty[]
  tournament_id: string
  status: string
  is_active: boolean
  id: string
}

export interface ITournamentMatchPlayerData {
  _id: string
  player_id: string
  username: string
  status: string
  time_stemp: Date
}

interface ITournamentDateSlot {
  date_time: Date
}

export interface ITournamentLiveData {
  _id: string
  player_data: ITournamentMatchPlayerData[]
  date_slot: ITournamentDateSlot[]
  createdAt: Date
  updatedAt: Date
  status: string
  room_id: string
  date_start: Date
  date_end: Date
  tournament_id: string
  match_type: string
  is_active: boolean
  __v: number
  round: number
}

export interface ITournamentCheckPlayerData {
  _id: string
  play_data: ITournamentPlayData[]
  round_player_qty: ITournamentRoundPlayedQty[]
  createdAt: Date
  updatedAt: Date
  player_id: string
  tournament_id: string
  item_burn: boolean
  status: string
  is_active: boolean
  qualifying: number
  __v: number
}

export interface ITournamentPlayerDataDetail {
  player_id: string
  username: string
  status: string
  score: number
  rank_in_game: number
  email: string
  avatar: string
  round_played_qty: ITournamentRoundPlayedQty[]
}

export interface ITournamentMatchRoomData {
  _id: string
  date_start: Date
  date_end: Date
  match_type: string
  tournament_id: string
  room_id: string
  player_data: ITournamentPlayerDataDetail[]
}
export interface ITournamentService extends IFormatService {
  data: ITournamentData
}

export interface ITournamentMatchService extends IFormatService {
  data: ITournamentMatch
}

export interface ITournamentCheckStatusService extends IFormatService {
  data: boolean
}

export interface ITournamentPlayerListService extends IFormatService {
  data: ITournamentPlayerList
}

export interface ITournamentHistoryService extends IFormatService {
  data: ITournamentHistory
}

export interface ITournamentLiveService extends IFormatService {
  data: ITournamentLiveData
}

export interface ITournamentPlayerService extends IFormatService {
  data: ITournamentCheckPlayerData
}

export interface ITournamentMatchRoomService extends IFormatService {
  data: ITournamentMatchRoomData
}
