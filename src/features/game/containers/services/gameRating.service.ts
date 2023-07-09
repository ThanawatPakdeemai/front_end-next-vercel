import services from "@configs/axiosGlobalConfig"
import {
  IGameRatingServ,
  IRatingServ
} from "@feature/game/interfaces/IGameRating"

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
  _id,
  _type
}: {
  _id: string
  _type: boolean
}) =>
  new Promise<IRatingServ>((resolve, reject) => {
    const _data = { game_id: _id, type: _type }
    services
      .post<IRatingServ>(`/game-rating/create`, { ..._data })
      .then((res) => {
        resolve(res.data)
      })
      .catch((error: Error) => {
        reject(error)
      })
  })

export const updateGameRating = ({
  _id,
  _type
}: {
  _id: string
  _type: boolean
}) =>
  new Promise<IRatingServ>((resolve, reject) => {
    const _data = { type: _type }
    services
      .put<IRatingServ>(`/game-rating/update/${_id}`, { ..._data })
      .then((res) => {
        resolve(res.data)
      })
      .catch((error: Error) => {
        reject(error)
      })
  })

export const getCheckUserRatingGame = (_gameId: string) =>
  new Promise<IRatingServ>((resolve, reject) => {
    services
      .get<IRatingServ>(`/game-rating/check-rating/${_gameId}`)
      .then((res) => {
        resolve(res.data)
      })
      .catch((error: Error) => {
        reject(error)
      })
  })
