import { IFormatService } from "@interfaces/IHelper"

interface IID {
  _id: string
}

interface IStatus {
  status: string
}

interface IIDName extends IID {
  name: string
}

interface ITourId {
  tournament_id: number
}
interface IIsActive {
  is_active: boolean
}

interface IDateStartEnd {
  date_start: Date
  date_end: Date
}

interface IRoomId {
  room_id: null | string
}

interface IMatchType extends IRoomId {
  match_type: string
}

interface IRoundNumber {
  round: number
}

interface ITimeStemp {
  time_stemp: Date
}
interface IPlayerID {
  player_id: string
}

interface IUsername {
  username: string
}
interface IPlayerInfo extends IPlayerID, IUsername {
  avatar: string
}
interface ITournamentGamePlay extends IPlayerInfo {
  email: string
}

interface IScore {
  score: number
}
interface ITournamentDateSlot {
  date_time: Date
}

interface ITourData extends IID, ITourId, IStatus, IIsActive {
  createdAt: Date
  updatedAt: Date
  __v: number
}
interface ITournamentRoundPlayedQty {
  round: string
  number_played: number
}

interface IRoundPlayedQTY {
  round_played_qty: Array<IID & ITournamentRoundPlayedQty>
}

interface ITournamentPlayData extends IScore, IID, IRoomId, ITimeStemp {
  match_id: string
}

interface IPlayerData {
  play_data: ITournamentPlayData[]
}

interface ILimitScore {
  max_score: number
  sum_score: number
  count_match: number
}

interface ITournamentPlayerData extends ITournamentGamePlay, ILimitScore {
  min_score: number
}
export interface ITournamentCondition {
  number_of_played: number
  ticket_for_join: number
  qualifying_play: number
  max_player_register: number
}

export interface ITournamentGames extends IIDName, IIsActive {
  game_type: string
}

export interface ITournamentRound extends IIDName, IStatus, IDateStartEnd {
  detail: string
  number_play?: number
  summary?: boolean
  number_player?: number
}

export interface ITournamentData extends IIDName, IStatus, IDateStartEnd {
  condition: ITournamentCondition
  register_button: boolean
  desc: string
  reward: string
  current_player_register: number
  tournament_type: string
  banner_image: string
  round: ITournamentRound[]
  privacy_policy: string
  games: ITournamentGames
}

type ITournamentGamePlayedData = ITournamentGamePlay &
  IStatus &
  Partial<IScore> &
  IRoundNumber

export interface ITournamentMatchData
  extends IDateStartEnd,
    ITourId,
    IMatchType,
    IRoundNumber {
  id: string
  round: number
  player_data: ITournamentPlayerData[]
  played_data: Array<ITournamentGamePlayedData[]>
  winner: string
}

export interface ITournamentPlayerList
  extends ILimitScore,
    IPlayerInfo,
    IID,
    IStatus,
    IPlayerData {
  address: string
  rank: number
}

export interface ITournamentMatch extends IID {
  match_data: ITournamentMatchData[]
}

export interface ITournamentHistory
  extends ITourId,
    IStatus,
    IPlayerData,
    IIsActive,
    IRoundPlayedQTY {
  id: string
}

export interface ITournamentLiveData
  extends ITourData,
    IDateStartEnd,
    IMatchType,
    IRoundNumber {
  player_data: Array<IID & IPlayerID & IStatus & IUsername & ITimeStemp>
  date_slot: ITournamentDateSlot[]
}

export interface ITournamentCheckPlayerData
  extends ITourData,
    IPlayerID,
    IPlayerData {
  round_player_qty: ITournamentRoundPlayedQty[]
  item_burn: boolean
  qualifying: number
}

export interface ITournamentPlayerDataDetail
  extends ITournamentGamePlay,
    IScore,
    IStatus,
    IRoundPlayedQTY {
  rank_in_game: number
}

export interface ITournamentMatchRoomData
  extends IID,
    IDateStartEnd,
    ITourId,
    IMatchType {
  player_data: ITournamentPlayerDataDetail[]
}

// services
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
