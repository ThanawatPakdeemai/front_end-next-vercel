import services from "@configs/axiosGlobalConfig"
import { IResponseFavoriteGame } from "@feature/favourite/interfaces/IFavouriteService"
import { IFilterGamesByKey } from "@feature/game/interfaces/IGameService"

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

const getFavoriteGameByUser = (body: IFilterGamesByKey) =>
  new Promise<IResponseFavoriteGame>((resolve, reject) => {
    services
      .post(`/profile/get_game_favorite`, body)
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject(err)
      })
  })

export { saveFavoriteGame, getFavoriteGameByUser }
