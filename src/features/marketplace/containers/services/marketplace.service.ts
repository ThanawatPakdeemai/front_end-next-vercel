import services from "@configs/axiosGlobalConfig"
import {
  ICancelOrderParams,
  IClaimRentalServ,
  IMarketOrderServ,
  IMarketServForm,
  IPurchOrderParams,
  IPutOrderServ
} from "@feature/marketplace/interfaces/IMarketService"

export const getMarketOrder = ({
  _limit,
  _page,
  _search,
  _sort
}: IMarketServForm) =>
  new Promise<IMarketOrderServ>((resolve, reject) => {
    const data = {
      limit: _limit,
      skip: _page,
      search: _search,
      sort: _sort
    }
    services
      .post<IMarketOrderServ>(`/market-place/info`, { ...data })
      .then((response) => resolve(response.data))
      .catch((error) => reject(error))
  })

export const getMarketOrderById = async ({
  _id,
  _type,
  _isActive
}: {
  _id: string
  _type: string
  _isActive: boolean
}) =>
  new Promise<IMarketOrderServ>((resolve, reject) => {
    const data = {
      id: _id,
      type: _type,
      is_active: _isActive
    }
    services
      .post<IMarketOrderServ>(`/market-place/order-detail`, { ...data })
      .then((response) => resolve(response.data))
      .catch((error) => reject(error))
  })

export const purchaseMarketOrder = ({
  _marketplaceId,
  _itemId,
  _itemAmount = 1,
  _landId,
  _txHash,
  _smcAmount,
  _rentalData,
  _installment_data
}: IPurchOrderParams) =>
  new Promise<IPutOrderServ>((resolve, reject) => {
    const data = {
      marketplace_id: _marketplaceId,
      item_amount: _itemAmount,
      item_id: _itemId,
      land_id: _landId,
      transaction_hash: _txHash,
      smc_amount: _smcAmount,
      rental_data: _rentalData,
      installment_data: _installment_data
    }
    services
      .put<IPutOrderServ>(`/market-place/sell-item`, { ...data })
      .then((response) => resolve(response.data))
      .catch((error) => reject(error))
  })

export const cancelMarketOrder = ({ _orderId, _txHash }: ICancelOrderParams) =>
  new Promise<IPutOrderServ>((resolve, reject) => {
    const data = {
      order_id: _orderId,
      transaction_hash: _txHash
    }
    services
      .put<IPutOrderServ>(`/market-place/cancel-order`, { ...data })
      .then((response) => resolve(response.data))
      .catch((error) => reject(error))
  })

export const claimRent = ({ _txHash }: { _txHash: string }) =>
  new Promise<IClaimRentalServ>((resolve, reject) => {
    const data = { transaction_hash: _txHash }
    services
      .post<IClaimRentalServ>(`/rental/claim-rental`, { ...data })
      .then((response) => resolve(response.data))
      .catch((error) => reject(error))
  })