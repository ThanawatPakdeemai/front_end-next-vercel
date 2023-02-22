import services from "@configs/axiosGlobalConfig"
import CONFIGS from "@configs/index"
import {
  IFilterGamesByCategory,
  IGameAllResponse,
  IGameCategory,
  IGameItem
} from "@feature/dropdown/interfaces/IDropdownService"
import { IGame } from "@feature/game/interfaces/IGameService"

const getGameAssets = () =>
  new Promise<IGameItem[]>((resolve, reject) => {
    services
      .get(`/game-items/`)
      .then((res) => {
        const filteredData = res.data.data.filter(
          (value: IGameItem, index: number, self: Array<IGameItem>) =>
            self.findIndex((v: IGameItem) => v.name === value.name) === index
        )
        resolve(filteredData)
      })
      .catch((error: Error) => {
        reject(error)
      })
  })

const getCategories = () =>
  new Promise<IGameCategory[]>((resolve, reject) => {
    services
      .get(`${CONFIGS.BASE_URL.API}/game-category/all`)
      .then((res) => {
        resolve(res.data.data)
      })
      .catch((error: Error) => {
        reject(error)
      })
  })

const getGameAlls = () =>
  new Promise<IGame[]>((resolve, reject) => {
    services
      .get(`${CONFIGS.BASE_URL.API}/game/all`)
      .then((res) => {
        resolve(res.data.data)
      })
      .catch((error: Error) => {
        reject(error)
      })
  })

const getGamesByCategoryId = (data: IFilterGamesByCategory) =>
  new Promise<IGameAllResponse>((resolve, reject) => {
    services
      .post<IGameAllResponse>(
        `${CONFIGS.BASE_URL.API}/game/filter/game-all`,
        data
      )
      .then((res) => {
        resolve(res.data)
      })
      .catch((error: Error) => {
        reject(error)
      })
  })

/*
 * Get all games sort
 */
// const getGamesAllSort = (
//   countPerPage: number,
//   page: number,
//   searchDropdown: string,
//   categoryDropdown: string,
//   gameItemDropdown: string,
//   deviceDropdown: string,
//   game_type: string,
//   tournament: boolean
// ) => {
//   const data = {
//     limit: countPerPage,
//     skip: page,
//     sort: "name",
//     search: searchDropdown,
//     category: categoryDropdown,
//     item: gameItemDropdown,
//     device: deviceDropdown,
//     game_type,
//     tournament
//   }
//   // eslint-disable-next-line no-new
//   new Promise<IGameAllResponse>((resolve, reject) => {
//     services
//       .post(`${CONFIGS.BASE_URL.API}/game/filter/game-all`, data)
//       .then((res) => {
//         resolve(res.data)
//       })
//       .catch((error) => {
//         reject(error)
//       })
//   })
// }

export { getGameAssets, getCategories, getGameAlls, getGamesByCategoryId }
