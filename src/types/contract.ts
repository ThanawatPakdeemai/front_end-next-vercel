export interface IAmount {
  balance: number
}

export interface IStatus {
  status: boolean
}

export interface IUseitem {
  player_id: string
  item_id: string
  room_id: string
  qty: number
}

export interface IError {
  code: string
  message: string
}
