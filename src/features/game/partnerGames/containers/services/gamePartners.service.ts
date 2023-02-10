import services from "@configs/axiosGlobalConfig"
import {
  IGamePartnerService,
  IGameService
} from "@feature/game/interfaces/IGameService"
import { IGetPartnerGameService } from "@feature/game/interfaces/IPartnerGame"
import {
  IGamePartnerNewVersionReponse,
  IGamePartnerReviewsReponse
} from "../../interfaces/IGamePartners"

/**
 * @description Get all partner games
 * @param _limit
 * @param _page
 * @param _search
 */
export const getAllPartnerGames = ({
  _limit,
  _page,
  _search
}: IGetPartnerGameService) =>
  new Promise<IGetPartnerGameService>((resolve, reject) => {
    const data = {
      data: {
        limit: _limit,
        page: _page,
        search: _search
      }
    }
    services
      .post<IGetPartnerGameService>("/partner-game-content/all/", { ...data })
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => reject(error))
  })

/**
 * @description Get game partner by id
 * @param _gameId
 * @returns IGamePartnerService
 */
export const getGamePartnerById = (_gameId: string) =>
  new Promise<IGameService | IGamePartnerService>((resolve, reject) => {
    services
      .get<IGameService | IGamePartnerService>(
        `/partner-game-content/${_gameId}`
      )
      .then((reponse) => resolve(reponse.data))
      .catch((error) => reject(error))
  })

/**
 * @description Get game partner version by id
 * @param _id
 */
export const getGamePartnerNewVersion = async (_id: string) =>
  new Promise<IGamePartnerNewVersionReponse>((resolve, reject) => {
    services
      .post<IGamePartnerNewVersionReponse>(
        `/partner-game-content/new-version`,
        {
          partner_id: _id
        }
      )
      .then((reponse) => resolve(reponse.data))
      .catch((error) => reject(error))
  })

/**
 * @description Get all game partner review by partner id
 * @param _limit
 * @param _skip
 * @param _partnerId
 */
export const getGamePartnerAllReview = async (
  _limit: number,
  _skip: number,
  _partnerId: string
) =>
  new Promise<IGamePartnerReviewsReponse>((resolve, reject) => {
    services
      .post<IGamePartnerReviewsReponse>(`/partner-game-content/review`, {
        limit: _limit,
        skip: _skip,
        partner_game_id: _partnerId
      })
      .then((reponse) => {
        resolve(reponse.data)
      })
      .catch((error) => reject(error))
  })

/**
 * TODO: This function is not available yet
 * @description Get all game partner version by partner id
 * @param _limit
 * @param _skip
 * @param _partnerId
 * @returns
 */
export const getAllVersion = async (
  _limit: number,
  _skip: number,
  _partnerId: string
) =>
  new Promise<IGamePartnerReviewsReponse>((resolve, reject) => {
    services
      .post<IGamePartnerReviewsReponse>(`/partner-game-content/version/all`, {
        limit: _limit,
        skip: _skip,
        partner_game_id: _partnerId
      })
      .then((reponse) => {
        resolve(reponse.data)
      })
      .catch((error) => reject(error))
  })
