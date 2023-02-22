import {
  IMultiOrderListDataServ,
  IMultiOrderListServ,
  IMultiOrderServ,
  IGetP2PDexOrderByAddr,
  IGetP2PDexOrderList,
  ICreateP2PDexOrder,
  IExecP2PDexOrder,
  IUpdateP2PDexOrder,
  IResExecutive
} from "@feature/multichain/interfaces/IMultichain"
import services from "@src/configs/axiosGlobalConfig"

export const getP2PDexOrderByAddr = ({
  _address,
  _limit,
  _page
}: IGetP2PDexOrderByAddr) =>
  new Promise<IMultiOrderListDataServ>((resolve, reject) => {
    const data = {
      limit: _limit,
      skip: _page
    }
    services
      .post<IMultiOrderListDataServ>(
        `/multi-chain/orders/profile/${_address}`,
        {
          ...data
        }
      )
      .then((response) => resolve(response.data))
      .catch((error) => reject(error))
  })

export const createP2PDexOrder = ({
  _orderId,
  _type,
  _busdPrice,
  _nakaPrice,
  _nakaAmount,
  _totalPrice,
  _address
}: ICreateP2PDexOrder) =>
  new Promise<IMultiOrderServ>((resolve, reject) => {
    const data = {
      order_id: _orderId,
      type: _type,
      busd_price: _busdPrice,
      naka_price: _nakaPrice,
      naka_amount: _nakaAmount,
      total_price: _totalPrice,
      wallet_address: _address
    }
    services
      .post<IMultiOrderServ>(`/multi-chain/orders/create`, { ...data })
      .then((response) => resolve(response.data))
      .catch((error) => reject(error))
  })

export const execP2PDexOrder = ({
  _requestId,
  _orderId,
  _type,
  _busdPrice,
  _nakaPrice,
  _nakaAmount,
  _buyerAddress,
  _sellerAddress,
  _totalPrice,
  _address
}: IExecP2PDexOrder) =>
  new Promise<IResExecutive>((resolve, reject) => {
    const data = {
      request_id: _requestId,
      order_id: _orderId,
      type: _type,
      busd_price: _busdPrice,
      naka_price: _nakaPrice,
      naka_amount: _nakaAmount,
      buyer_address: _buyerAddress,
      seller_address: _sellerAddress,
      total_price: _totalPrice,
      wallet_address: _address
    }
    services
      .post(`/multi-chain/orders/execute`, { ...data })
      .then((response) => resolve(response.data))
      .catch((error) => reject(error))
  })

export const updateP2PDexOrder = ({
  _orderId,
  _type,
  _busdPrice,
  _nakaPrice,
  _nakaAmount,
  _totalPrice,
  _address,
  _txHash
}: IUpdateP2PDexOrder) =>
  new Promise<IMultiOrderServ>((resolve, reject) => {
    const data = {
      order_id: _orderId,
      type: _type,
      busd_price: _busdPrice,
      naka_price: _nakaPrice,
      naka_amount: _nakaAmount,
      total_price: _totalPrice,
      wallet_address: _address,
      tx_hash: _txHash
    }
    services
      .put<IMultiOrderServ>(`/multi-chain/orders/update`, { ...data })
      .then((response) => resolve(response.data))
      .catch((error) => reject(error))
  })
export const getP2PDexOrderList = ({
  _type,
  _limit,
  _page
}: IGetP2PDexOrderList) =>
  new Promise<IMultiOrderListServ>((resolve, reject) => {
    const data = {
      type: _type, // sell, buy
      limit: _limit,
      skip: _page
    }

    services
      .post<IMultiOrderListServ>(`/multi-chain/orders`, { ...data })
      .then((response) => resolve(response.data))
      .catch((error) => reject(error))
  })

export const cancelP2PDexOrder = (_orderId: string) =>
  new Promise<IMultiOrderServ>((resolve, reject) => {
    services
      .delete<IMultiOrderServ>(`/multi-chain/orders/cancel/${_orderId}`)
      .then((response) => resolve(response.data))
      .catch((error) => reject(error))
  })
