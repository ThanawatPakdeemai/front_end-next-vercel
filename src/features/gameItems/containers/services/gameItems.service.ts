import services from "@src/configs/axiosGlobalConfig"
import {
  IGameItemBalanceService,
  IGameItemList,
  IGameItemService,
  IGameItemsListService
} from "../../interfaces/IGameItemsService"

export const getAllGameItems = () =>
  new Promise<IGameItemsListService>((resolve, reject) => {
    services
      .get<IGameItemsListService>(`/game-items`)
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

export const getGameItemsByGameId = (_playerId: string, _gameId: string) =>
  new Promise<IGameItemList[]>((resolve, reject) => {
    services
      .get<IGameItemList[]>(`/game/item-list/${_gameId}/${_playerId}`)
      .then((response) => resolve(response.data))
      .catch((error) => reject(error))
  })

export const getGameItemsBalanceByItemId = (
  _address: string,
  _itemIdSmartContract: string
) =>
  new Promise<IGameItemBalanceService>((resolve, reject) => {
    services
      .get<IGameItemBalanceService>(
        `/inventory/item/balance/${_address}/${_itemIdSmartContract}`
      )
      .then((response) => resolve(response.data))
      .catch((error) => reject(error))
  })
