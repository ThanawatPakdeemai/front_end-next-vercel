import services from "@src/configs/axiosGlobalConfig"
import {
  ICurrentNakaResponse,
  IGetNakaServices
} from "../../interfaces/ISmartContractService"

export const getBalanceOf = (_address: string, _item_id: number) =>
  new Promise<IGetNakaServices>((resolve, reject) => {
    services
      .get<IGetNakaServices>(`/inventory/item/balance/${_address}/${_item_id}`)
      .then((reponse) => resolve(reponse.data))
      .catch((error) => reject(error))
  })

export const getNaka = (_address: string) =>
  new Promise<IGetNakaServices>((resolve, reject) => {
    services
      .get<IGetNakaServices>(`/inventory/naka/balance/${_address}`)
      .then((reponse) => resolve(reponse.data))
      .catch((error) => reject(error))
  })

export const getCurrentNaka = () =>
  new Promise<ICurrentNakaResponse>((resolve, reject) => {
    services
      .get<ICurrentNakaResponse>(`/price/current`)
      .then((reponse) => resolve(reponse.data))
      .catch((error) => reject(error))
  })
