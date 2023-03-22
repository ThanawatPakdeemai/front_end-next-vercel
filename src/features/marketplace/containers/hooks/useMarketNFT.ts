import CONFIGS from "@configs/index"
import { MESSAGES } from "@constants/messages"
import { TransactionResponse } from "@ethersproject/providers"
import { useMarketplaceNFT } from "@feature/contract/containers/hooks/useContract"

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

const useMarketNFT = () => {
  const { utils } = ethers
  const { toWei, WeiToNumber } = Helper
  const { setOpen, setClose } = useLoadingStore()
  const { signer, address } = useWeb3Provider()
  const marketNFTContract = useMarketplaceNFT(
    signer,
    CONFIGS.CONTRACT_ADDRESS.MARKETPLACE_NFT
  )
  const {
    mutateMarketCreateOrder,
    mutateMarketCancelOrder,
    mutateMarketPurcOrder
  } = useMutateMarketplace()
  const {
    checkAllowanceNaka,
    getContractAddrsByNFTType,
    onCheckNFTIsApproveForAll
  } = useGlobalMarket()

  // create order
  const createNFTOrder = (
    _contract: string,
    _token: string,
    _nakaAmount: BigNumberish
  ) =>
    new Promise<TransactionResponse>((resolve, reject) => {
      marketNFTContract
        .listNFT(_contract, _token, _nakaAmount)
        .then((_response: TransactionResponse) => {
          resolve(_response)
        })
        .catch((_error: Error) => {
          reject(_error)
        })
    })

  const onCreateNFTOrder = async (
    _NFTtype: TNFTType,
    _id: string,
    _token: string,
    _price: number,
    _amount: number
  ) => {
    if (signer && address) {
      setOpen(MESSAGES.transaction_processing_order)
      await onCheckNFTIsApproveForAll(
        address,
        CONFIGS.CONTRACT_ADDRESS.MARKETPLACE_NFT,
        _NFTtype
      ).catch((error) => console.error(error))
      await createNFTOrder(
        getContractAddrsByNFTType(_NFTtype),
        _token,
        toWei(_price.toString())
      )
        .then(async (response) => {
          const _res = await response.wait()
          const _enTopic = await utils.keccak256(
            utils.toUtf8Bytes(
              "NFTListing(bytes32,address,uint256,address,uint256)"
            )
          )
          const _log = _res.logs.find((f) =>
            f.topics.find((l) => l === _enTopic)
          )
          if (_log) {
            const _resultEvent = utils.defaultAbiCoder.decode(
              ["bytes32", "bytes32", "bytes32"],
              _log.data
            )
            const data: ICreateOrderParams = {
              _orderId: _resultEvent[0],
              _itemId: _id,
              _itemAmount: _amount,
              _price: WeiToNumber(parseInt(_resultEvent[2], 16).toString()),
              _type: _NFTtype,
              _txHash: _res.transactionHash,
              _sellerType: "user",
              _sellingType: "fullpayment"
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

  // cancel order
  const cancelNFTOrder = (_sellerId: string, _orderId: string) =>
    new Promise<TransactionResponse>((resolve, reject) => {
      marketNFTContract
        .unlistNFT(_sellerId, _orderId)
        .then((_response: TransactionResponse) => {
          resolve(_response)
        })
        .catch((_error: Error) => {
          reject(_error)
        })
    })

  const onCancelNFTOrder = async (
    _NFTtype: TNFTType,
    _sellerId: string,
    _orderId: string
  ) => {
    setOpen(MESSAGES.transaction_processing_order)
    if (signer && address) {
      await onCheckNFTIsApproveForAll(
        address,
        CONFIGS.CONTRACT_ADDRESS.MARKETPLACE_NFT,
        _NFTtype
      ).catch((error) => console.error(error))
      await cancelNFTOrder(_sellerId, _orderId)
        .then(async (response) => {
          const _res = await response.wait()

          const _enTopic = await utils.keccak256(
            utils.toUtf8Bytes(
              "NFTUnlisting(bytes32,address,uint256,address,uint256)"
            )
          )
          const _log = _res.logs.find((f) =>
            f.topics.find((l) => l === _enTopic)
          )
          if (_log) {
            const _resultEvent = utils.defaultAbiCoder.decode(
              ["bytes32", "bytes32", "bytes32"],
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

  // execute order
  const executeNFTOrder = (_sellerId: string, _orderId: string) =>
    new Promise<TransactionResponse>((resolve, reject) => {
      marketNFTContract
        .executeListedNFT(_sellerId, _orderId)
        .then((_response: TransactionResponse) => {
          resolve(_response)
        })
        .catch((_error: Error) => {
          reject(_error)
        })
    })

  const onExecuteNFTOrder = async (
    _marketId: string,
    _itemID: string,
    _sellerId: string,
    _orderId: string,
    _amountItem: number
  ) => {
    setOpen(MESSAGES.transaction_processing_order)
    if (signer && address) {
      await checkAllowanceNaka(CONFIGS.CONTRACT_ADDRESS.MARKETPLACE_NFT)
      await executeNFTOrder(_sellerId, _orderId)
        .then(async (response) => {
          const _res = await response.wait()
          const _enTopic = await utils.keccak256(
            utils.toUtf8Bytes(
              "NFTSold(bytes32,address,address,uint256,address,uint256)"
            )
          )
          const _log = _res.logs.find((f) =>
            f.topics.find((l) => l === _enTopic)
          )
          if (_log) {
            const _resultEvent = utils.defaultAbiCoder.decode(
              ["bytes32", "bytes32", "bytes32"],
              _log.data
            )
            const data: IPurchOrderParams = {
              _marketplaceId: _marketId,
              _itemId: _itemID,
              _itemAmount: _amountItem,
              _txHash: _res.transactionHash
            }
            await mutateMarketPurcOrder(data)
          }
        })
        .catch((error) => console.error(error))
    }
    setClose()
  }

  return {
    onCreateNFTOrder,
    onCancelNFTOrder,
    onExecuteNFTOrder
  }
}

export default useMarketNFT
