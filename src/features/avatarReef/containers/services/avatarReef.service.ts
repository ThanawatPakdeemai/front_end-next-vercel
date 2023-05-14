import services from "@configs/axiosGlobalConfig"
import {
  IAvatarData,
  IMyAvatarReefServ,
  IRedeemAvatarReefServ
} from "@feature/avatarReef/interfaces/IAvatarReefService"
import { IMarketServForm } from "@feature/marketplace/interfaces/IMarketService"
import {
  IPunkPriceServ,
  IPurchasePunkServ
} from "@feature/nakapunk/interfaces/INakapunkService"

export const getPriceAvatarReef = () =>
  new Promise<IPunkPriceServ>((resolve, reject) => {
    services
      .get<IPunkPriceServ>(`/avatar/price-avatar`)
      .then((response) => resolve(response.data))
      .catch((error) => reject(error))
  })

export const purchaseAvatarReef = ({
  _addrs,
  _qty,
  _chain
}: {
  _addrs: string
  _qty: number
  _chain: string
}) =>
  new Promise<IPurchasePunkServ>((resolve, reject) => {
    const data = { address: _addrs, item_qty: _qty, chain: _chain }
    services
      .post<IPurchasePunkServ>(`/avatar/mint-avatar`, { ...data })
      .then((response) => resolve(response.data))
      .catch((error) => reject(error))
  })

export const getAvatarReefById = ({ _id }: { _id: string }) =>
  new Promise<IAvatarData>((resolve, reject) => {
    services
      .get<IAvatarData>(`/avatar/avatar-datas/${_id}`)
      .then((response) => resolve(response.data))
      .catch((error) => reject(error))
  })

export const redeemAvatarReef = ({
  _evmAddrs,
  _code
}: {
  _evmAddrs: string
  _code: string
}) =>
  new Promise<IRedeemAvatarReefServ>((resolve, reject) => {
    const data = { evm_address: _evmAddrs, code: _code }
    services
      .post<IRedeemAvatarReefServ>(`/avatar/redeem`, { ...data })
      .then((response) => resolve(response.data))
      .catch((error) => reject(error))
  })

export const getListAvatarReef = ({
  _limit,
  _page,
  _search,
  _sort,
  _active
}: IMarketServForm) =>
  new Promise<IMyAvatarReefServ>((resolve, reject) => {
    const data = {
      limit: _limit,
      skip: _page,
      search: _search,
      sort: _sort,
      active: _active
    }
    services
      .post<IMyAvatarReefServ>(`/avatar/avatar-owner`, {
        ...data
      })
      .then((response) => resolve(response.data))
      .catch((error) => reject(error))
  })
