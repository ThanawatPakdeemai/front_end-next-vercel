import services from "@configs/axiosGlobalConfig"
import {
  IGetNakaServices,
  IBurnItem,
  IBurnItemResponse,
  ICurrentNakaData,
  IGetBalanceOf
} from "@feature/inventory/interfaces/IInventoryService"

export const getBalanceOf = ({ _address, _item_id }: IGetBalanceOf) =>
  new Promise<IGetNakaServices>((resolve, reject) => {
    services
      .get<IGetNakaServices>(`/inventory/item/balance/${_address}/${_item_id}`)
      .then((response) => resolve(response.data))
      .catch((error) => reject(error))
  })

export const burnItem = ({ player_id, item_id, room_id, qty }: IBurnItem) =>
  new Promise<IBurnItemResponse>((resolve, reject) => {
    services
      .put(`/inventory/burn-smart-contact-multiplayer`, {
        player_id,
        item_id,
        room_id,
        qty
      })
      .then((_res) =>
        resolve({
          status: true
        })
      )
      .catch((_error) => reject(_error))
  })

export const getNaka = (_address: string) =>
  new Promise<IGetNakaServices>((resolve, reject) => {
    services
      .get<IGetNakaServices>(`/inventory/naka/balance/${_address}`)
      .then((response) => resolve(response.data))
      .catch((error) => reject(error))
  })

export const getCurrentNaka = () =>
  new Promise<ICurrentNakaData>((resolve, reject) => {
    services
      .get<ICurrentNakaData>(`/price/current`)
      .then((response) => resolve(response.data))
      .catch((error) => reject(error))
  })