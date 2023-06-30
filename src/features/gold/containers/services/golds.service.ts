/* eslint-disable no-new */
import services from "@configs/axiosGlobalConfig"
import { IPropsGetExpCurrent } from "@feature/gold/interfaces/IGoldService"
import { IGolds } from "@feature/profile/interfaces/IProfileService"

export const getGolds = (_address: string) =>
  new Promise<IGolds>((resolve, reject) => {
    const data = { address: _address }
    services
      .post<IGolds>(`/profile/get/gold`, { ...data })
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => reject(error))
  })

export const transferExpToGold = (_item_qty: number) =>
  new Promise<IGolds>((resolve, reject) => {
    const data = { item_qty: _item_qty }
    services
      .post<IGolds>(`/profile/exchange/exp-gold`, { ...data })
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => reject(error))
  })

export const getTransactionTransferGold = ({
  _limit,
  _skip,
  _sort,
  _search
}: IPropsGetExpCurrent) =>
  new Promise<IGolds>((resolve, reject) => {
    const data = { limit: _limit, skip: _skip, sort: _sort, search: _search }
    services
      .post<IGolds>(`/profile/transaction/exchange`, { ...data })
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => reject(error))
  })

export const getExpCurrent = () =>
  new Promise<IGolds>((resolve, reject) => {
    services
      .get<IGolds>(`/profile/exchange/current_accum_exp`)
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => reject(error))
  })
