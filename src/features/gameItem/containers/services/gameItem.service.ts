import services from "@configs/axiosGlobalConfig"
import {
  IGameItemService,
  IGameItemListService,
  IGetGameItemsByGameId,
  IGameItemListData
} from "@feature/gameItem/interfaces/IGameItemService"

export const getAllGameItems = () =>
  new Promise<IGameItemListService>((resolve, reject) => {
    services
      .get<IGameItemListService>(`/game-items`)
      .then((response) => resolve(response.data))
      .catch((error) => reject(error))
  })

export const getGameItemById = (_itemId: string) =>
  new Promise<IGameItemService>((resolve, reject) => {
    services
      .get<IGameItemService>(`/game-items/${_itemId}`)
      .then((response) => resolve(response.data))
      .catch((error) => reject(error))
  })

export const getGameItemsByGameId = ({
  _playerId,
  _gameId
}: IGetGameItemsByGameId) =>
  new Promise<IGameItemListData[]>((resolve, reject) => {
    services
      .get<IGameItemListData[]>(`/game/item-list/${_gameId}/${_playerId}`)
      .then((response) => resolve(response.data))
      .catch((error) => reject(error))
  })
