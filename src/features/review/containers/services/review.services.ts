import services from "@configs/axiosGlobalConfig"

/**
 * TODO: This function is not available yet
 * @description Add comment for game partner (Owner only)
 * @param _message
 * @param _partnerId
 * @param _userId
 * @returns
 */
export const addReview = async (
  _message: string,
  _partnerId: string,
  _userId: string
) =>
  new Promise((resolve, reject) => {
    services
      .post(`/partner-game-content/add-review`, {
        message: _message,
        partner_id: _partnerId,
        user_id: _userId
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
