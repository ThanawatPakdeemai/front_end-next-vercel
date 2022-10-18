// Game room type response
export interface IGameRoomResponse {
  gameRoomDetail: IGameRoom[];
}

export interface IGameRoom {
  start_time: string;
  end_time: string;
  room_status: string;
  amount_current_player: number;
  amount_send_reward: number;
  mutiplayer: boolean;
  tournament: boolean;
  user_create: boolean;
  createdAt: string;
  updatedAt: string;
  no_limit_time: boolean;
  _id: string;
  current_player: CurrentPlayer[];
  // Current_player_item_status: any[];
  history_user_play: HistoryUserPlay[];
  // Rewards: any[];
  current_time: string;
  game_id: string;
  max_players: number;
  rank_id: string;
  amount_played: number;
  is_active: boolean;
  status: string;
  room_number: number;
  stage_id: number;
  id: string;
  rank_name: string;
  room_no: number;
  // Create_room_detail: any;
}

export interface CurrentPlayer {
  status: 'played' | 'playing';
  item_burn: boolean;
  transaction_status: boolean;
  _id: string;
  player_id: string;
  avatar: string;
  username: string;
  timestamp: Date;
  rank: string;
}

export interface HistoryUserPlay {
  status: 'played' | 'playing';
  _id: string;
  player_id: string;
  timestamp: Date;
  qty: number;
}

export interface IRoom {
  _id: string;
  item: IRoomItem;
}

export interface IRoomItem {
  item_id: string;
  qty: number;
}
