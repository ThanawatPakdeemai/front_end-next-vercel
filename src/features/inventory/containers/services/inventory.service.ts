import services from "@configs/axiosGlobalConfig"
import {
  IGetNakaServices,
  IBurnItem,
  IBurnItemResponse,
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
