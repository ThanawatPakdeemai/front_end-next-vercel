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
  IPurchOrderParams,
  TNFTType
} from "@feature/marketplace/interfaces/IMarketService"
import { useWeb3Provider } from "@providers/Web3Provider"
import useLoadingStore from "@stores/loading"
import Helper from "@utils/helper"
import { BigNumberish, ethers } from "ethers"
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
  const { toWei, WeiToNumber } = Helper
  const { setOpen, setClose } = useLoadingStore()
  const { signer, address } = useWeb3Provider()
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
    mutateMarketPurcOrder,
    mutateClaimRentNFT
  } = useMutateMarketplace()
  const {
    checkAllowanceNaka,
    getContractAddrsByNFTType,
    onCheckNFTIsApproveForAll
  } = useGlobalMarket()

  // create
  const createNFTRentOrder = (
    _contract: string,
    _token: string,
    _nakaTotal: BigNumberish,
    _period: number
  ) =>
    new Promise<TransactionResponse>((resolve, reject) => {
      marketNFTRentContract
        .listRentingNFT(_contract, _token, _nakaTotal, _period)
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
    if (signer && address) {
      setOpen(MESSAGES.transaction_processing_order)
      await onCheckNFTIsApproveForAll(
        address,
        CONFIGS.CONTRACT_ADDRESS.MARKETPLACE_NFT_INSTALL,
        _NFTtype
      ).catch((error) => console.error(error))
      await createNFTRentOrder(
        getContractAddrsByNFTType(_NFTtype),
        _token,
        toWei(_price.toString()),
        _period
      )
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
            const data: ICreateOrderParams = {
              _orderId: _resultEvent[0],
              _itemId: _id,
              _itemAmount: _amount,
              _price: WeiToNumber(_resultEvent[3]),
              _type: _NFTtype,
              _txHash: _res.transactionHash,
              _sellerType: "user",
              _sellingType: "rental",
              _periodAmount: WeiToNumber(_resultEvent[4])
            }
            await mutateMarketCreateOrder(data)
          }
        })
        .catch((error) => console.error(error))
    } else {
      console.error("address not found!, Please connect your wallet")
    }
    setClose()
  }

  // cancel
  const cancelNFTRentOrder = (_orderId: string) =>
    new Promise<TransactionResponse>((resolve, reject) => {
      marketNFTRentContract
        .cancelListedRentingOrder(_orderId)
        .then((_response: TransactionResponse) => {
          resolve(_response)
        })
        .catch((_error: Error) => {
          reject(_error)
        })
    })

  const onCancelNFTRentOrder = async (_NFTtype: TNFTType, _orderId: string) => {
    setOpen(MESSAGES.transaction_processing_order)
    if (signer && address) {
      await onCheckNFTIsApproveForAll(
        address,
        CONFIGS.CONTRACT_ADDRESS.MARKETPLACE_NFT_RENTAL,
        _NFTtype
      ).catch((error) => console.error(error))
      await cancelNFTRentOrder(_orderId)
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
              _orderId: _resultEvent[0],
              _txHash: _res.transactionHash
            }
            await mutateMarketCancelOrder(data)
          }
        })
        .catch((error) => console.error(error))
    }
    setClose()
  }

  // execute
  const executeNFTRentOrder = (_orderId: string, _period: number) =>
    new Promise<TransactionResponse>((resolve, reject) => {
      marketNFTRentContract
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
    setOpen(MESSAGES.transaction_processing_order)
    if (signer && address) {
      await checkAllowanceNaka(CONFIGS.CONTRACT_ADDRESS.MARKETPLACE_NFT_RENTAL)
      await executeNFTRentOrder(_orderId, _period)
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
            const data: IPurchOrderParams = {
              _marketplaceId: _marketId,
              _itemId: _itemID,
              _itemAmount: _amountItem,
              _txHash: _res.transactionHash,
              _rentalData: {
                orderId: _resultEvent[0],
                totalPrice: _resultEvent[7].toString(),
                rentStart: _resultEvent[5].toString(),
                rentEnd: _resultEvent[6].toString(),
                marketplaceId: _marketId,
                itemId: _itemID,
                period: Number(_resultEvent[3].toString())
              }
            }
            await mutateMarketPurcOrder(data)
          }
        })
        .catch((error) => console.error(error))
    }
    setClose()
  }

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

  // claim rent
  const claimRentByOrderId = (_orderId: string) =>
    new Promise<TransactionResponse>((resolve, reject) => {
      marketNFTRentContract
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
      await checkAllowanceNaka(CONFIGS.CONTRACT_ADDRESS.MARKETPLACE_NFT_RENTAL)
      await claimRentByOrderId(_orderId)
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
    }
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
