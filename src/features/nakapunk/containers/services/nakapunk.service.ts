import services from "@configs/axiosGlobalConfig"
import {
  IMarketServForm,
  INFTTransferServ
} from "@feature/marketplace/interfaces/IMarketService"
import {
  IPunkListServ,
  IPunkData,
  IPunkPriceServ,
  IPurchasePunkServ
} from "@feature/nakapunk/interfaces/INakapunkService"

export const getPriceNakapunk = () =>
  new Promise<IPunkPriceServ>((resolve, reject) => {
    services
      .get<IPunkPriceServ>(`/nakapunk/price-naka-punk`)
      .then((response) => resolve(response.data))
      .catch((error) => reject(error))
  })

export const purchaseNakapunk = ({ _qty }: { _qty: number }) =>
  new Promise<IPurchasePunkServ>((resolve, reject) => {
    const data = { item_qty: _qty }
    services
      .post<IPurchasePunkServ>(`/nakapunk/mint-nakapunk`, { ...data })
      .then((response) => resolve(response.data))
      .catch((error) => reject(error))
  })

export const purchaseNakapunkByRedeemCode = ({ _code }: { _code: string }) =>
  new Promise<IPurchasePunkServ>((resolve, reject) => {
    const data = { code: _code }
    services
      .post<IPurchasePunkServ>(`/nakapunk/redeem`, { ...data })
      .then((response) => resolve(response.data))
      .catch((error) => reject(error))
  })

export const getMyNakapunk = ({
  _limit,
  _page,
  _search,
  _sort
}: IMarketServForm) =>
  new Promise<IPunkListServ>((resolve, reject) => {
    const data = {
      limit: _limit,
      skip: _page,
      search: _search,
      sort: _sort
    }
    services
      .post<IPunkListServ>(`/nakapunk/nakapunk-owner`, { ...data })
      .then((response) => resolve(response.data))
      .catch((error) => reject(error))
  })

export const getNakapunkById = ({ _id }: { _id: string }) =>
  new Promise<IPunkData>((resolve, reject) => {
    services
      .get<IPunkData>(`/nakapunk/naka-punk-datas/${_id}`)
      .then((response) => resolve(response.data))
      .catch((error) => reject(error))
  })

export const getMyForSaleNakapunk = ({
  _limit,
  _page,
  _search,
  _sort
}: IMarketServForm) =>
  new Promise<IPunkListServ>((resolve, reject) => {
    const data = {
      limit: _limit,
      skip: _page,
      search: _search,
      sort: _sort
    }
    services
      .post<IPunkListServ>(`/nakapunk/nakapunk-owner-on-sale`, { ...data })
      .then((response) => resolve(response.data))
      .catch((error) => reject(error))
  })

export const setTransferNakapunk = ({
  _token,
  _to,
  _from,
  _txHash
}: {
  _token: string
  _to: string
  _from: string
  _txHash: string
}) =>
  new Promise<INFTTransferServ>((resolve, reject) => {
    const data = {
      nft_token: _token,
      to_address: _to,
      from_address: _from,
      tx_hash: _txHash
    }
    services
      .post<INFTTransferServ>(`/nakapunk/change-owner`, { ...data })
      .then((response) => resolve(response.data))
      .catch((error) => reject(error))
  })
