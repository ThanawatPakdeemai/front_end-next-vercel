import services from "@configs/axiosGlobalConfig"
import {
  ICancelOrderParams,
  IClaimRentalServ,
  ICreateOrderParams,
  IMarketCreateOrderServ,
  IMarketOrderServ,
  IMarketServForm,
  IMarketTypesServ,
  IPayBillInstallServ,
  IPayBillParams,
  IPayOrderParams,
  IPutOrderServ,
  TUrlNFT
} from "@feature/marketplace/interfaces/IMarketService"

export const getMarketOrder = ({
  _urlNFT,
  _limit,
  _page,
  _search,
  _sort,
  _active = true
}: IMarketServForm) =>
  new Promise<IMarketOrderServ>((resolve, reject) => {
    const data = {
      limit: _limit,
      skip: _page,
      search: _search,
      sort: _sort,
      active: _active
    }
    services
      .post<IMarketOrderServ>(`/market-place-new/${_urlNFT}/order-all`, {
        ...data
      })
      .then((response) => resolve(response.data))
      .catch((error) => reject(error))
  })

export const getMarketOrderById = async ({
  _id,
  _urlNFT
}: {
  _id: string
  _urlNFT: TUrlNFT
}) =>
  new Promise<IMarketOrderServ>((resolve, reject) => {
    services
      .get<IMarketOrderServ>(`/market-place-new/${_urlNFT}/order-detail/${_id}`)
      .then((response) => resolve(response.data))
      .catch((error) => reject(error))
  })

export const createMarketOrder = ({
  _urlNFT,
  _orderId,
  _itemId,
  _itemAmount,
  _price,
  _type,
  _txHash,
  _sellerType,
  _sellingType,
  _periodAmount
}: ICreateOrderParams) =>
  new Promise<IMarketCreateOrderServ>((resolve, reject) => {
    const data = {
      item_id: _itemId,
      item_amount: _itemAmount,
      price: _price,
      order_id: _orderId,
      type: _type,
      seller_type: _sellerType,
      selling_type: _sellingType,
      transaction_hash: _txHash,
      period_amount: _periodAmount
    }
    services
      .post<IMarketCreateOrderServ>(
        `/market-place-new/${_urlNFT}/create-order`,
        {
          ...data
        }
      )
      .then((response) => resolve(response.data))
      .catch((error) => reject(error))
  })

/**
 * @description Installment
 * @param _urlNFT is used for NFT-Building & NFT-Land only!
 */
export const payInstallment = ({
  _urlNFT,
  _marketplaceId,
  _itemId,
  _itemAmount = 1,
  _txHash,
  _installment_data
}: IPayOrderParams) =>
  new Promise<IPutOrderServ>((resolve, reject) => {
    const data = {
      marketplace_id: _marketplaceId,
      item_id: _itemId,
      item_amount: _itemAmount,
      transaction_hash: _txHash,
      installment_data: _installment_data
    }
    services
      .put<IPutOrderServ>(`/market-place-new/${_urlNFT}/installment`, {
        ...data
      })
      .then((response) => resolve(response.data))
      .catch((error) => reject(error))
  })

/**
 * @description Installment
 * @param _urlNFT is used for NFT-Building & NFT-Land only!
 */
export const payRental = ({
  _urlNFT,
  _marketplaceId,
  _itemId,
  _itemAmount = 1,
  _txHash,
  _rental_data
}: IPayOrderParams) =>
  new Promise<IPutOrderServ>((resolve, reject) => {
    const data = {
      marketplace_id: _marketplaceId,
      item_id: _itemId,
      item_amount: _itemAmount,
      transaction_hash: _txHash,
      rental_data: _rental_data
    }
    services
      .put<IPutOrderServ>(`/market-place-new/${_urlNFT}/rental`, { ...data })
      .then((response) => resolve(response.data))
      .catch((error) => reject(error))
  })

/**
 * @description Mint
 * @param _urlNFT is used for NFT-Building & NFT-Land only!
 */
export const mintNFT = ({
  _urlNFT,
  _marketplaceId,
  _itemAmount
}: {
  _urlNFT: TUrlNFT
  _marketplaceId: string
  _itemAmount: number
}) =>
  new Promise<IPutOrderServ>((resolve, reject) => {
    const data = {
      marketplace_id: _marketplaceId,
      item_amount: _itemAmount
    }

    services
      .put<IPutOrderServ>(`/market-place-new/${_urlNFT}/mint`, { ...data })
      .then((response) => resolve(response.data))
      .catch((error) => reject(error))
  })

/**
 * @description P2P
 * @param _smcAmount is amount of item in smartcontract
 */
export const purchaseOrderFullpayment = ({
  _urlNFT,
  _marketplaceId,
  _itemAmount = 1,
  _txHash,
  _smcAmount
}: {
  _urlNFT: string
  _marketplaceId: string
  _itemAmount: number
  _txHash: string
  _smcAmount?: number
}) =>
  new Promise<IPutOrderServ>((resolve, reject) => {
    const data = {
      marketplace_id: _marketplaceId,
      item_amount: _itemAmount,
      transaction_hash: _txHash,
      smc_amount: _smcAmount
    }
    services
      .put<IPutOrderServ>(`/market-place-new/${_urlNFT}/fullpayment`, {
        ...data
      })
      .then((response) => resolve(response.data))
      .catch((error) => reject(error))
  })

export const cancelMarketOrder = ({
  _urlNFT,
  _orderId,
  _txHash
}: ICancelOrderParams) =>
  new Promise<IPutOrderServ>((resolve, reject) => {
    const data = {
      order_id: _orderId,
      transaction_hash: _txHash
    }
    services
      .put<IPutOrderServ>(`/market-place-new/${_urlNFT}/cancel-order`, {
        ...data
      })
      .then((response) => resolve(response.data))
      .catch((error) => reject(error))
  })

export const payBillInstallNFT = ({
  _billId,
  _billBalance,
  _periodBalance,
  _txHash,
  _roundPayed,
  _roundPayedAmount
}: IPayBillParams) =>
  new Promise<IPayBillInstallServ>((resolve, reject) => {
    const data = {
      bill_id: _billId,
      bill_balance: _billBalance,
      period_balance: _periodBalance,
      round_payed: _roundPayed,
      round_payed_amount: _roundPayedAmount,
      transaction_hash: _txHash
    }
    services
      .post<IPayBillInstallServ>(`/installment/pay-installment-bill`, {
        ...data
      })
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

export const getMarketplaceAllTypes = () =>
  new Promise<IMarketTypesServ>((resolve, reject) => {
    services
      .get<IMarketTypesServ>("/market-place-new/marketplace/marketplace-type")
      .then((response) => resolve(response.data))
      .catch((error) => reject(error))
  })
