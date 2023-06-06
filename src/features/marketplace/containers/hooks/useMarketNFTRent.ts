import CONFIGS from "@configs/index"
import { MESSAGES } from "@constants/messages"
import { TransactionResponse } from "@ethersproject/providers"
import {
  useMarketplaceNFTRent,
  useMarketplaceNFTRentNoAccount
} from "@feature/contract/containers/hooks/useContract"
import {
  ICancelOrderParams,
  ICreateOrderParams,
  IPayOrderParams,
  TNFTType
} from "@feature/marketplace/interfaces/IMarketService"
import useGlobal from "@hooks/useGlobal"
import { useWeb3Provider } from "@providers/Web3Provider"
import useLoadingStore from "@stores/loading"
import Helper from "@utils/helper"
import { BigNumberish, ethers } from "ethers"
import { useToast } from "@feature/toast/containers"
import { useInventoryProvider } from "@providers/InventoryProvider"
import useGlobalMarket from "./useGlobalMarket"
import useMutateMarketplace from "./useMutateMarketplace"

interface IGetRentById {
  orderIdRentingNFT: string
  nftAddress: string
  nftTokenID: BigNumberish
  owner: string
  renter: string
  rentalPricePerDays: BigNumberish
  rentalPeriod: BigNumberish
  rentalStart: BigNumberish
  rentalEnd: BigNumberish
  maxPeriod: BigNumberish
  maxPeriodBalance: BigNumberish
  rentalStatus: boolean
}

const useMarketNFTRent = () => {
  const { utils } = ethers
  const { toWei, WeiToNumber, convertNFTTypeToUrl } = Helper
  const { setOpen, setClose } = useLoadingStore()
  const { signer, address } = useWeb3Provider()
  const { marketType } = useGlobal()
  const marketNFTRentContract = useMarketplaceNFTRent(
    signer,
    CONFIGS.CONTRACT_ADDRESS.MARKETPLACE_NFT_RENTAL
  )
  const marketNFTRentContractNoAcc = useMarketplaceNFTRentNoAccount(
    CONFIGS.CONTRACT_ADDRESS.MARKETPLACE_NFT_RENTAL
  )
  const {
    mutateMarketCreateOrder,
    mutateMarketCancelOrder,
    mutatePayRetal,
    mutateClaimRentNFT
  } = useMutateMarketplace()
  const {
    checkAllowanceNaka,
    getContractAddrsByNFTType,
    onCheckNFTIsApproveForAll,
    onCheckPolygonChain
  } = useGlobalMarket()
  const { updateInvenNFTMarketData } = useInventoryProvider()
  const { errorToast } = useToast()

  // get rent detail by rentId
  const getRentDetailById = (_orderId: string) =>
    new Promise<IGetRentById>((resolve, reject) => {
      marketNFTRentContractNoAcc
        .RentingNFTs(_orderId)
        .then((_response: IGetRentById) => {
          resolve(_response)
        })
        .catch((_error: Error) => {
          reject(_error)
        })
    })

  // create
  const createNFTRentOrder = ({
    _contract = marketNFTRentContract,
    _contractAddrs,
    _token,
    _nakaTotal,
    _period
  }: {
    _contract?: ethers.Contract
    _contractAddrs: string
    _token: string
    _nakaTotal: BigNumberish
    _period: number
  }) =>
    new Promise<TransactionResponse>((resolve, reject) => {
      _contract
        .listRentingNFT(_contractAddrs, _token, _nakaTotal, _period)
        .then((_response: TransactionResponse) => {
          resolve(_response)
        })
        .catch((_error: Error) => {
          reject(_error)
        })
    })

  const onCreateNFTRentOrder = async (
    _NFTtype: TNFTType,
    _id: string,
    _token: string,
    _price: number,
    _amount: number,
    _period: number
  ) => {
    let _status: boolean = false
    setOpen(MESSAGES.transaction_processing_order)
    if (signer && address) {
      const _checkChain = await onCheckPolygonChain(marketNFTRentContract)
      if (!_checkChain._pass) {
        setClose()
        errorToast(MESSAGES.support_polygon_only)
        return false
      }
      await onCheckNFTIsApproveForAll(
        address,
        CONFIGS.CONTRACT_ADDRESS.MARKETPLACE_NFT_INSTALL,
        _NFTtype
      ).catch((error) => console.error(error))
      await createNFTRentOrder({
        _contract: _checkChain._contract,
        _contractAddrs: getContractAddrsByNFTType(_NFTtype),
        _token,
        _nakaTotal: toWei(_price.toString()),
        _period
      })
        .then(async (response) => {
          const _res = await response.wait()
          const _enTopic = await utils.keccak256(
            utils.toUtf8Bytes(
              "ListRentingNFT(bytes32,address,uint256,uint256,uint256,address)"
            )
          )
          const _log = _res.logs.find((f) =>
            f.topics.find((l) => l === _enTopic)
          )
          if (_log) {
            const _resultEvent = utils.defaultAbiCoder.decode(
              [
                "bytes32",
                "address",
                "uint256",
                "uint256",
                "uint256",
                "address"
              ],
              _log.data
            )
            const _data: ICreateOrderParams = {
              _urlNFT: convertNFTTypeToUrl(_NFTtype),
              _orderId: _resultEvent[0],
              _itemId: _id,
              _itemAmount: _amount,
              _price: WeiToNumber(_resultEvent[3]),
              _type: _NFTtype,
              _txHash: _res.transactionHash,
              _sellerType: "user",
              _sellingType: "rental",
              _periodAmount: Number(_resultEvent[4].toString())
            }
            const { data } = await mutateMarketCreateOrder(_data)
            if (data && updateInvenNFTMarketData)
              updateInvenNFTMarketData(data, _NFTtype)
            _status = true
          }
        })
        .catch((error) => console.error(error))
    } else {
      errorToast(MESSAGES.please_connect_wallet)
    }
    setClose()
    return _status
  }

  // cancel
  const cancelNFTRentOrder = ({
    _contract = marketNFTRentContract,
    _orderId
  }: {
    _contract?: ethers.Contract
    _orderId: string
  }) =>
    new Promise<TransactionResponse>((resolve, reject) => {
      _contract
        .cancelListedRentingOrder(_orderId)
        .then((_response: TransactionResponse) => {
          resolve(_response)
        })
        .catch((_error: Error) => {
          reject(_error)
        })
    })

  const onCancelNFTRentOrder = async (
    _NFTtype: TNFTType,
    _sellerId: string,
    _orderId: string
  ) => {
    let _status: boolean = false
    setOpen(MESSAGES.transaction_processing_order)
    if (signer && address) {
      const [_checkOrderById, _checkChain] = await Promise.all([
        getRentDetailById(_orderId),
        onCheckPolygonChain(marketNFTRentContract)
      ])
      if (Number(_checkOrderById.rentalPricePerDays) <= 0) {
        setClose()
        errorToast("order not founded")
        return false
      }
      if (!_checkChain._pass) {
        setClose()
        errorToast(MESSAGES.support_polygon_only)
        return false
      }
      await onCheckNFTIsApproveForAll(
        address,
        CONFIGS.CONTRACT_ADDRESS.MARKETPLACE_NFT_RENTAL,
        _NFTtype
      ).catch((error) => console.error(error))
      await cancelNFTRentOrder({
        _contract: _checkChain._contract,
        _orderId
      })
        .then(async (response) => {
          const _res = await response.wait()
          const _enTopic = await utils.keccak256(
            utils.toUtf8Bytes(
              "CancelListedRentingNFT(bytes32,address,uint256,address)"
            )
          )
          const _log = _res.logs.find((f) =>
            f.topics.find((l) => l === _enTopic)
          )
          if (_log) {
            const _resultEvent = utils.defaultAbiCoder.decode(
              ["bytes32", "address", "uint256", "address"],
              _log.data
            )
            const data: ICancelOrderParams = {
              _urlNFT: convertNFTTypeToUrl(_NFTtype),
              _orderId: _resultEvent[0],
              _txHash: _res.transactionHash
            }
            await mutateMarketCancelOrder(data)
            _status = true
          }
        })
        .catch((error) => console.error(error))
    } else {
      errorToast(MESSAGES.please_connect_wallet)
    }
    setClose()
    return _status
  }

  // execute
  const executeNFTRentOrder = ({
    _contract = marketNFTRentContract,
    _orderId,
    _period
  }: {
    _contract?: ethers.Contract
    _orderId: string
    _period: number
  }) =>
    new Promise<TransactionResponse>((resolve, reject) => {
      _contract
        .executeRent(_orderId, _period)
        .then((_response: TransactionResponse) => {
          resolve(_response)
        })
        .catch((_error: Error) => {
          reject(_error)
        })
    })

  const onExecuteNFTRentOrder = async (
    _marketId: string,
    _itemID: string,
    _sellerId: string,
    _orderId: string,
    _period: number,
    _amountItem: number
  ) => {
    let _status: boolean = false
    setOpen(MESSAGES.transaction_processing_order)
    if (signer && address) {
      const [_checkOrderById, _checkChain] = await Promise.all([
        getRentDetailById(_orderId),
        onCheckPolygonChain(marketNFTRentContract)
      ])
      if (Number(_checkOrderById.rentalPricePerDays) <= 0) {
        setClose()
        errorToast("order not founded")
        return false
      }
      if (!_checkChain._pass) {
        setClose()
        errorToast(MESSAGES.support_polygon_only)
        return false
      }
      await checkAllowanceNaka(CONFIGS.CONTRACT_ADDRESS.MARKETPLACE_NFT_RENTAL)
      await executeNFTRentOrder({
        _contract: _checkChain._contract,
        _orderId,
        _period
      })
        .then(async (response) => {
          const _res = await response.wait()
          const _enTopic = await utils.keccak256(
            utils.toUtf8Bytes(
              "ExecuteRent(bytes32,address,uint256,uint256,address,uint256,uint256,uint256,uint256)"
            )
          )
          const _log = _res.logs.find((f) =>
            f.topics.find((l) => l === _enTopic)
          )
          if (_log) {
            const _resultEvent = utils.defaultAbiCoder.decode(
              [
                "bytes32",
                "address",
                "uint256",
                "uint256",
                "address",
                "uint256",
                "uint256",
                "uint256",
                "uint256"
              ],
              _log.data
            )
            const _data: IPayOrderParams = {
              _urlNFT: marketType
                ? convertNFTTypeToUrl(marketType)
                : "NFT-Land",
              _marketplaceId: _marketId,
              _itemId: _itemID,
              _itemAmount: _amountItem,
              _txHash: _res.transactionHash,
              _rental_data: {
                order_id: _resultEvent[0],
                total_price: _resultEvent[7].toString(),
                rent_start: _resultEvent[5].toString(),
                rent_end: _resultEvent[6].toString(),
                marketplace_id: _marketId,
                item_id: _itemID,
                type: marketType || "nft_land"
              }
            }
            await mutatePayRetal(_data)
            _status = true
          }
        })
        .catch((error) => console.error(error))
    } else {
      errorToast(MESSAGES.please_connect_wallet)
    }
    setClose()
    return _status
  }

  // claim rent
  const claimRentByOrderId = ({
    _contract = marketNFTRentContract,
    _orderId
  }: {
    _contract?: ethers.Contract
    _orderId: string
  }) =>
    new Promise<TransactionResponse>((resolve, reject) => {
      _contract
        .claimFeeRenting(_orderId)
        .then((_response: TransactionResponse) => {
          resolve(_response)
        })
        .catch((_error: Error) => {
          reject(_error)
        })
    })

  const onClaimNFTRentOrder = async (_orderId: string) => {
    setOpen(MESSAGES.transaction_processing_order)
    if (signer && address) {
      const _checkChain = await onCheckPolygonChain(marketNFTRentContract)
      if (!_checkChain._pass) {
        setClose()
        errorToast(MESSAGES.support_polygon_only)
        return
      }
      await checkAllowanceNaka(CONFIGS.CONTRACT_ADDRESS.MARKETPLACE_NFT_RENTAL)
      await claimRentByOrderId({ _contract: _checkChain._contract, _orderId })
        .then(async (response) => {
          const _res = await response.wait()
          const _enTopic = await utils.keccak256(
            utils.toUtf8Bytes(
              "ClaimFeeRenting(bytes32,address,uint256,address,uint256,address,uint256,uint256,uint256,uint256,uint256)"
            )
          )
          const _log = _res.logs.find((f) =>
            f.topics.find((l) => l === _enTopic)
          )
          if (_log) {
            const _resultEvent = utils.defaultAbiCoder.decode(
              [
                "bytes32",
                "address",
                "uint256",
                "address",
                "uint256",
                "address",
                "uint256",
                "uint256",
                "uint256",
                "uint256",
                "uint256"
              ],
              _log.data
            )
            const data: { _txHash: string } = {
              _txHash: _res.transactionHash
            }
            await mutateClaimRentNFT(data)
          }
        })
        .catch((error) => console.error(error))
    } else {
      errorToast(MESSAGES.please_connect_wallet)
    }
    setClose()
  }

  return {
    onCreateNFTRentOrder,
    onCancelNFTRentOrder,
    onExecuteNFTRentOrder,
    getRentDetailById,
    onClaimNFTRentOrder
  }
}
export default useMarketNFTRent
