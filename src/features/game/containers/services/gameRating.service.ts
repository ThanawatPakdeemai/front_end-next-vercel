import services from "@configs/axiosGlobalConfig"
import { IGameRatingServ } from "@feature/game/interfaces/IGameRating"
import { IReviewGameServ } from "@feature/review/interfaces/IReviewGame"

export const getGameRatingById = (_gameId: string) =>
  new Promise<IGameRatingServ>((resolve, reject) => {
    services
      .get<IGameRatingServ>(`/game-rating/game/${_gameId}`)
      .then((res) => {
        resolve(res.data)
      })
      .catch((error: Error) => {
        reject(error)
      })
  })

export const addGameRating = ({
  _gameId,
  _type
}: {
  _gameId: string
  _type: boolean
}) =>
  new Promise<IReviewGameServ>((resolve, reject) => {
    const _data = { game_id: _gameId, type: _type }
    services
      .post<IReviewGameServ>(`/game-rating/create`, { ..._data })
      .then((res) => {
        resolve(res.data)
      })
      .catch((error: Error) => {
        reject(error)
      })
  })

export const updateGameRating = ({
  _gameId,
  _type
}: {
  _gameId: string
  _type: boolean
}) =>
  new Promise<IReviewGameServ>((resolve, reject) => {
    const _data = { type: _type }
    services
      .post<IReviewGameServ>(`/game-rating/update/${_gameId}`, { ..._data })
      .then((res) => {
        resolve(res.data)
      })
      .catch((error: Error) => {
        reject(error)
      })
  })

export const getCheckUserRatingGame = (_gameId: string) =>
  new Promise((resolve, reject) => {
    services
      .get(`/game-rating/check-rating/${_gameId}`)
      .then((res) => {
        resolve(res.data)
      })
      .catch((error: Error) => {
        reject(error)
      })
  })
