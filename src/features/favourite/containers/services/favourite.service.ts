import services from "@configs/axiosGlobalConfig"
import { IResponseFavoriteGame } from "@feature/favourite/interfaces/IFavouriteService"

const saveFavoriteGame = (player_id: string, game_id: string) =>
  new Promise<IResponseFavoriteGame>((resolve, reject) => {
    if (player_id && game_id) {
      services
        .post(`/profile/save_game_favorite`, {
          player_id,
          game_id
        })
        .then((res) => {
          resolve(res.data)
        })
        .catch((err) => {
          reject(err)
        })
    }
  })

const getFavoriteGameByUser = (
  player_id: string,
  limit: number,
  skip: number,
  category_id: string,
  device_support: string,
  item_id: string,
  search: string
) =>
  new Promise<IResponseFavoriteGame>((resolve, reject) => {
    if (player_id) {
      services
        .post(`/profile/get_game_favorite`, {
          player_id,
          limit,
          skip,
          category_id,
          device_support,
          item_id,
          search
        })
        .then((res) => {
          resolve(res.data)
        })
        .catch((err) => {
          reject(err)
        })
    }
  })

export { saveFavoriteGame, getFavoriteGameByUser }
