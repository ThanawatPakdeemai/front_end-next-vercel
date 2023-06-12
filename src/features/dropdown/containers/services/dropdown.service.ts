import services from "@configs/axiosGlobalConfig"
import CONFIGS from "@configs/index"
import {
  IGameAllResponse,
  IGameCategory,
  IGameItem
} from "@feature/dropdown/interfaces/IDropdownService"
import { IPayloadGameFilter } from "@feature/game/interfaces/IGameService"

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
      // .get(`${CONFIGS.BASE_URL.API}/game-category/all`)
      .get(`${CONFIGS.BASE_URL.API}/game-category/all/new`)
      .then((res) => {
        resolve(res.data.data)
      })
      .catch((error: Error) => {
        reject(error)
      })
  })

// IFilterGames
const getGameAllFilter = (data: IPayloadGameFilter) =>
  new Promise<IGameAllResponse>((resolve, reject) => {
    services
      .post<IGameAllResponse>(
        `${CONFIGS.BASE_URL.API}/game/filter/game-all-new`,
        data
      )
      .then((res) => {
        resolve(res.data)
      })
      .catch((error: Error) => {
        reject(error)
      })
  })

export { getGameAssets, getCategories, getGameAllFilter }
