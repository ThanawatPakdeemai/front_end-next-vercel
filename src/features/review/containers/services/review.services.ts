import services from "@configs/axiosGlobalConfig"
import { IGamePartnerReviewsReponse } from "@feature/game/partnerGames/interfaces/IGamePartners"

/**
 * @description Add comment for game partner
 * @param _message
 * @param _partnerId
 * @param _userId
 * @returns
 */
export const addPartnerReview = async ({
  user_id,
  review_comment,
  review_rate,
  game_content_id
}: {
  user_id: string
  review_comment: string
  review_rate: number
  game_content_id: string
}) =>
  new Promise<IGamePartnerReviewsReponse>((resolve, reject) => {
    services
      .post<IGamePartnerReviewsReponse>(`/partner-game-content/review/create`, {
        user_id,
        review_comment,
        review_rate,
        game_content_id
      })
      .then((reponse) => {
        resolve(reponse.data)
      })
      .catch((error) => reject(error))
  })

/**
 * TODO: This function is not available yet
 * @description Delete comment for game partner (Owner only)
 * @param _reviewId
 * @param _partnerId
 * @returns
 */
export const deletePartnerReview = async (
  _reviewId: string,
  _partnerId: string
) =>
  new Promise((resolve, reject) => {
    services
      .post(`/partner-game-content/delete-review`, {
        review_id: _reviewId,
        partner_id: _partnerId
      })
      .then((reponse) => {
        resolve(reponse.data)
      })
      .catch((error) => reject(error))
  })

export const getAllGameReview = ({
  _limit,
  _page,
  _gameId,
  _sort
}: {
  _limit: number
  _page: number
  _gameId: string
  _sort: string
}) =>
  new Promise<IGamePartnerReviewsReponse>((resolve, reject) => {
    const _data = {
      limit: _limit,
      skip: _page,
      game_id: _gameId,
      sort: _sort
    }
    services
      .post<IGamePartnerReviewsReponse>(`/game-review`, { ..._data })
      .then((reponse) => {
        resolve(reponse.data)
      })
      .catch((error) => reject(error))
  })

export const getCheckedPlayerReview = (_gameId: string) =>
  new Promise((resolve, reject) => {
    services
      .get(`/game-review/check-review/${_gameId}`)
      .then((reponse) => {
        resolve(reponse.data)
      })
      .catch((error) => reject(error))
  })

export const addReview = ({
  _recaptcha,
  _message,
  _rate,
  _gameId
}: {
  _recaptcha: string
  _message: string
  _rate: number
  _gameId: string
}) =>
  new Promise((resolve, reject) => {
    const _data = {
      review_comment: _message,
      review_rate: _rate,
      game_id: _gameId
    }
    services
      .post(
        `/game-review/create`,
        { ..._data },
        {
          headers: {
            "g-recaptcha-token": _recaptcha
          }
        }
      )
      .then((reponse) => {
        resolve(reponse.data)
      })
      .catch((error) => reject(error))
  })

export const updateReview = ({
  _gameId,
  _message,
  _rate
}: {
  _gameId: string
  _message: string
  _rate: number
}) =>
  new Promise((resolve, reject) => {
    const _data = {
      review_comment: _message,
      review_rate: _rate
    }
    services
      .put(`/game-review/update/${_gameId}`, { ..._data })
      .then((reponse) => {
        resolve(reponse.data)
      })
      .catch((error) => reject(error))
  })

export const deleteReview = (_gameId: string) =>
  new Promise((resolve, reject) => {
    services
      .delete(`/game-review/delete/${_gameId}`)
      .then((reponse) => {
        resolve(reponse.data)
      })
      .catch((error) => reject(error))
  })
