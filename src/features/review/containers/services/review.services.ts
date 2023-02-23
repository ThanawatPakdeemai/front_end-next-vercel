import services from "@configs/axiosGlobalConfig"
import { IGamePartnerReviewsReponse } from "@feature/game/partnerGames/interfaces/IGamePartners"

/**
 * @description Add comment for game partner
 * @param _message
 * @param _partnerId
 * @param _userId
 * @returns
 */
export const addReview = async ({
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
export const deleteReview = async (_reviewId: string, _partnerId: string) =>
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
