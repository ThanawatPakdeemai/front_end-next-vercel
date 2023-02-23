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
  limit: number,
  skip: number,
  sort: string,
  search: string,
  category: string,
  item: string,
  device: string,
  game_type: string,
  tournament: boolean,
  nftgame: string
) =>
  new Promise<IResponseFavoriteGame>((resolve, reject) => {
    services
      .post(`/profile/get_game_favorite`, {
        limit,
        skip,
        sort,
        search,
        category,
        item,
        device,
        game_type,
        tournament,
        nftgame
      })
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject(err)
      })
  })

export { saveFavoriteGame, getFavoriteGameByUser }
