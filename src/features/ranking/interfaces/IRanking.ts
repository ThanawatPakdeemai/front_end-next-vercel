export interface IRanking {
  _game_id: string
  _top_total: number
}

export interface IPlayerRanking {
  avatar: string
  naka_earn: number
  username: string
  _id?: string
  player_id: string
}
export interface IPlayerPlayToEarnRanking {
  bestScore: number
  email: string
  gameName: string
  playerId: string
  username: string
  walletAddress: string
  avatar: string
}
export interface IPlayerRankingResponse {
  data: IPlayerRanking[]
}

export interface IPlayerPlayToEarnRankingResponse {
  data: IPlayerPlayToEarnRanking[]
  status: boolean
  info: object
}
