import { IFormatService, IInfo } from "@interfaces/IHelper"

export interface ICommissionData {
  createAt: Date
  updateAt: Date
  current_time: Date
  game_id: string
  player_id: string
  wallet_address: string
  naka_for_player: number
  link_code: string
  is_active: boolean
  is_admin: boolean
  send_status: boolean
  transaction_status: string
  transaction_status_message: string
  type: string
  id: string
}

// need to refactor response from backend
export interface ICommissionService extends IFormatService {
  data: {
    data: ICommissionData[]
    info: IInfo
  }
}

export interface IParamCommission {
  _playerId: string
}

export interface IGetCommission extends IParamCommission {
  _limit: number
  _page: number
  _sort?: object
}
