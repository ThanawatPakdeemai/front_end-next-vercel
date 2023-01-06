import services from "@configs/axiosGlobalConfig"
import { IPlayerRanking, IRanking } from "@feature/ranking/interfaces/IRanking"

// Call api to get players in the game order by NAKA
const getPlayersRanking = (url: string) =>
  new Promise<IPlayerRanking[]>((resolve, reject) => {
    if (url) {
      services
        .get<IPlayerRanking[]>(`/${url}`)
        .then((reponse) => {
          resolve(reponse.data)
        })
        .catch((error) => {
          reject(error)
        })
    }
  })

const getPlayerRankByGameId = (_gameId: string) =>
  new Promise<IPlayerRanking[]>((resolve, reject) => {
    if (_gameId) {
      services
        .get<IPlayerRanking[]>(`/game/ranks/${_gameId}`)
        .then((reponse) => {
          resolve(reponse.data)
        })
        .catch((error) => {
          reject(error)
        })
    }
  })

// Call api to get players in the game order by NAKA Play to Earn
const getPlayersPlayToEarnRanking = ({ _game_id, _top_total }: IRanking) =>
  new Promise<IPlayerRanking>((resolve, reject) => {
    const data = {
      gameId: _game_id,
      topTotal: _top_total
    }
    services
      .post<IPlayerRanking>("/play-to-earn/calculate-top-player", {
        ...data
      })
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject(err)
      })
  })

const getPlayersSurvivalRanking = ({ _game_id, _top_total }: IRanking) =>
  new Promise<IPlayerRanking>((resolve, reject) => {
    const data = {
      gameId: _game_id,
      topTotal: _top_total
    }
    services
      .post<IPlayerRanking>("/game-pool/calculate-top-player", {
        ...data
      })
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject(err)
      })
  })

export {
  getPlayersRanking,
  getPlayerRankByGameId,
  getPlayersPlayToEarnRanking,
  getPlayersSurvivalRanking
}
