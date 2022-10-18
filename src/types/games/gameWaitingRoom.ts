import type { IPlayerInfo } from './gamePlayer';

// Wating Room type
export interface IWatingRoom {
  start_time: Date;
  end_time: Date;
  amount_current_player: number;
  amount_send_reward: number;
  createdAt: Date;
  updatedAt: Date;
  _id: string;
  current_player: IPlayerInfo[];
  rewards: [];
  game_id: string;
  max_players: number;
  rank_id: string;
  amount_played: number;
  is_active: boolean;
  status: string;
  room_number: number;
  room_no: number;
  id: string;
}
