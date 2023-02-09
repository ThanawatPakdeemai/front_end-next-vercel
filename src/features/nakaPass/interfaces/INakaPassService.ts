interface IGameId {
  game_id: string
}
export interface IGetPropNakaPass extends IGameId {
  player_id: string
}

export interface IClaimData extends IGameId {
  claim_data: { season_pass_id: string[] }
}
