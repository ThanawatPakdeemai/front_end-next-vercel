import services from "@configs/axiosGlobalConfig"
import {
  IGetPropNakaPass,
  IClaimData
} from "@feature/nakaPass/interfaces/INakaPassService"

export const getNakaPass = ({ player_id, game_id }: IGetPropNakaPass) =>
  new Promise((resolve, reject) => {
    const data = {
      player_id,
      game_id
    }
    services
      .post(`/game/story-mode/season-pass`, data)
      .then((_res) =>
        resolve({
          status: true
        })
      )
      .catch((_error) => reject(_error))
  })

export const claimNakaPass = ({ game_id, claim_data }: IClaimData) =>
  new Promise((resolve, reject) => {
    services
      .post(`/player-game-data/claim-season-pass`, {
        claim_data,
        game_id
      })
      .then((_res) =>
        resolve({
          status: true
        })
      )
      .catch((_error) => reject(_error))
  })
