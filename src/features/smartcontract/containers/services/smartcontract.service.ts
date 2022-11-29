import services from "@configs/axiosGlobalConfig"
import {
  ICurrentNakaResponse,
  IGetNakaServices,
  IBurnItem,
  IBurnItemResponse
} from "@feature/smartcontract/interfaces/ISmartContractService"

export const getBalanceOf = (_address: string, _item_id: number) =>
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
  new Promise<ICurrentNakaResponse>((resolve, reject) => {
    services
      .get<ICurrentNakaResponse>(`/price/current`)
      .then((response) => resolve(response.data))
      .catch((error) => reject(error))
  })
