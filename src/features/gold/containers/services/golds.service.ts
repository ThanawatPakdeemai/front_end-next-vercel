/* eslint-disable no-new */
import services from "@configs/axiosGlobalConfig"
import {
  IGolds,
  IPropsGetExpTransaction,
  ICurrentExp,
  IResTransferExp,
  IResTransactionExp
} from "@feature/gold/interfaces/IGoldService"

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
  new Promise<IResTransferExp>((resolve, reject) => {
    const data = { item_qty: _item_qty }
    services
      .post<IResTransferExp>(`/profile/exchange/exp-gold`, { ...data })
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
}: IPropsGetExpTransaction) =>
  new Promise<IResTransactionExp>((resolve, reject) => {
    const data = { limit: _limit, skip: _skip, sort: _sort, search: _search }
    services
      .post<IResTransactionExp>(`/profile/transaction/exchange`, { ...data })
      .then((response) => {
        // console.log(response.data)
        resolve(response.data)
      })
      .catch((error) => reject(error))
  })

export const getExpCurrent = () =>
  new Promise<ICurrentExp>((resolve, reject) => {
    services
      .get<ICurrentExp>(`/profile/exchange/current_accum_exp`)
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => reject(error))
  })
