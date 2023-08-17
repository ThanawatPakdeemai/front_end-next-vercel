import { IGame } from "@feature/game/interfaces/IGameService"
import { IGameItemList } from "@feature/gameItem/interfaces/IGameItemService"

export interface IPlayToEarnRewardData {
  claim_status: boolean
  item_amount: number
  event_number: number
  score: number
  is_active: boolean
  _id: string
  player_id: string
  item_id: IGameItemList
  game_id: IGame
  createdAt: Date
  updatedAt: Date
  current_time: Date
}

export interface IGameReward {
  _id: string
  room_id: string
  player_id: string
  current_score: number
  avatar: string
  user_name: string
  naka_for_player: number
  tx_address: string
}
