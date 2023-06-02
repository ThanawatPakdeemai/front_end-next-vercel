import CONFIGS from "@configs/index"
import { MESSAGES } from "@constants/messages"
import { TransactionResponse } from "@ethersproject/providers"
import { useMarketplaceMaterial } from "@feature/contract/containers/hooks/useContract"
import useGlobalMarket from "@feature/marketplace/containers/hooks/useGlobalMarket"
import useMutateMarketplace from "@feature/marketplace/containers/hooks/useMutateMarketplace"
import {
  ICancelOrderParams,
  ICreateOrderParams,
  TUrlNFT
} from "@feature/marketplace/interfaces/IMarketService"
import useInvenMaterial from "@feature/material/inventory/containers/hooks/useInvenMaterial"
import { useToast } from "@feature/toast/containers"
import { useWeb3Provider } from "@providers/Web3Provider"
import useLoadingStore from "@stores/loading"
import Helper from "@utils/helper"
import { BigNumberish, ethers } from "ethers"

const useMarketMaterial = () => {
  const { signer, address } = useWeb3Provider()
  const marketMaterialContract = useMarketplaceMaterial(
    signer,
    CONFIGS.CONTRACT_ADDRESS.MARKETPLACE_MATERIAL
  )
  const { setOpen, setClose } = useLoadingStore()
  const { utils } = ethers
  const { WeiToNumber, toWei, convertNFTTypeToUrl } = Helper
  const {
    mutateMarketCreateOrder,
    mutateMarketCancelOrder,
    mutateFullPayment
  } = useMutateMarketplace()
  const { updateMaterialList } = useInvenMaterial()
  const { onCheckPolygonChain } = useGlobalMarket()
  const { errorToast } = useToast()

  // create order
  const createMaterialOrder = ({
    _contract = marketMaterialContract,
    _materialId,
    _materialAmount,
    _nakaAmount
  }: {
    _contract?: ethers.Contract
    _materialId: string
    _materialAmount: number
    _nakaAmount: BigNumberish
  }) =>
    new Promise<TransactionResponse>((resolve, reject) => {
      _contract
        .createOrderMaterial(_materialId, _materialAmount, _nakaAmount)
        .then((_response: TransactionResponse) => {
          resolve(_response)
        })
        .catch((_error: Error) => {
          reject(_error)
        })
    })

  const onCreateMaterialOrder = async (
    _itemId: string,
    _materialId: string,
    _materialAmount: number,
    _nakaAmount: number
  ) => {
    setOpen(MESSAGES.transaction_processing_order)
    if (signer && address) {
      const _checkChain = await onCheckPolygonChain(marketMaterialContract)
      if (!_checkChain._pass) {
        setClose()
        errorToast(MESSAGES.support_polygon_only)
        return
      }
      await createMaterialOrder({
        _contract: _checkChain._contract,
        _materialId,
        _materialAmount,
        _nakaAmount: toWei(_nakaAmount.toString())
      })
        .then(async (response) => {
          const _res = await response.wait()
          const _enTopic = await utils.keccak256(
            utils.toUtf8Bytes(
              "OrderCreatedMaterial(bytes32,address,uint256,uint256,uint256)"
            )
          )
          const _log = _res.logs.find((f) =>
            f.topics.find((l) => l === _enTopic)
          )
          if (_log) {
            const _resultEvent = utils.defaultAbiCoder.decode(
              ["bytes32", "uint256", "uint256", "uint256"],
              _log.data
            )
            const data: ICreateOrderParams = {
              _urlNFT: convertNFTTypeToUrl("nft_material"),
              _orderId: _resultEvent[0],
              _itemId,
              _itemAmount: _resultEvent[2].toString(),
              _price: WeiToNumber(_resultEvent[3]),
              _type: "nft_material",
              _txHash: _res.transactionHash,
              _sellerType: "user"
            }
            updateMaterialList(
              "decrease",
              _resultEvent[1].toString(),
              Number(_resultEvent[2].toString())
            )
            await mutateMarketCreateOrder(data)
          }
        })
        .catch((error) => console.error(error))
    } else {
      errorToast(MESSAGES.please_connect_wallet)
    }
    setClose()
  }

  // cancel order
  const cancelMaterialOrder = ({
    _contract = marketMaterialContract,
    _sellerId,
    _orderId
  }: {
    _contract?: ethers.Contract
    _sellerId: string
    _orderId: string
  }) =>
    new Promise<TransactionResponse>((resolve, reject) => {
      _contract
        .cancelOrderMaterial(_sellerId, _orderId)
        .then((_response: TransactionResponse) => {
          resolve(_response)
        })
        .catch((_error: Error) => {
          reject(_error)
        })
    })

  const onCancelMaterialOrder = async (_sellerId: string, _orderId: string) => {
    setOpen(MESSAGES.transaction_processing_order)
    if (signer && address) {
      const _checkChain = await onCheckPolygonChain(marketMaterialContract)
      if (!_checkChain._pass) {
        setClose()
        errorToast(MESSAGES.support_polygon_only)
        return
      }
      await cancelMaterialOrder({
        _contract: _checkChain._contract,
        _sellerId,
        _orderId
      })
        .then(async (response) => {
          const _res = await response.wait()

          const _enTopic = await utils.keccak256(
            utils.toUtf8Bytes(
              "OrderCancelledMaterial(bytes32,address,uint256,uint256)"
            )
          )
          const _log = _res.logs.find((f) =>
            f.topics.find((l) => l === _enTopic)
          )
          if (_log) {
            const _resultEvent = utils.defaultAbiCoder.decode(
              ["bytes32", "uint256", "uint256"],
              _log.data
            )
            const data: ICancelOrderParams = {
              _urlNFT: convertNFTTypeToUrl("nft_material"),
              _orderId: _resultEvent[0],
              _txHash: _res.transactionHash
            }
            updateMaterialList(
              "increase",
              _resultEvent[1].toString(),
              Number(_resultEvent[2].toString())
            )
            await mutateMarketCancelOrder(data)
          }
        })
        .catch((error) => console.error(error))
    } else {
      errorToast(MESSAGES.please_connect_wallet)
    }
    setClose()
  }

  // execute order
  const executeMaterialOrder = ({
    _contract = marketMaterialContract,
    _sellerId,
    _orderId,
    _amountItem
  }: {
    _contract?: ethers.Contract
    _sellerId: string
    _orderId: string
    _amountItem: number
  }) =>
    new Promise<TransactionResponse>((resolve, reject) => {
      _contract
        .executeOrderMaterial(_sellerId, _orderId, _amountItem)
        .then((_response: TransactionResponse) => {
          resolve(_response)
        })
        .catch((_error: Error) => {
          reject(_error)
        })
    })

  const onExecuteMaterialOrder = async (
    _marketId: string,
    _itemID: string,
    _sellerId: string,
    _orderId: string,
    _amountItem: number
  ) => {
    setOpen(MESSAGES.transaction_processing_order)
    if (signer && address) {
      const _checkChain = await onCheckPolygonChain(marketMaterialContract)
      if (!_checkChain._pass) {
        setClose()
        errorToast(MESSAGES.support_polygon_only)
        return
      }
      await executeMaterialOrder({
        _contract: _checkChain._contract,
        _sellerId,
        _orderId,
        _amountItem
      })
        .then(async (response) => {
          const _res = await response.wait()
          const _enTopic = await utils.keccak256(
            utils.toUtf8Bytes(
              "OrderExecutedMaterial(bytes32,address,address,uint256,uint256,uint256,uint256,uint256)"
            )
          )
          const _log = _res.logs.find((f) =>
            f.topics.find((l) => l === _enTopic)
          )
          if (_log) {
            const _resultEvent = utils.defaultAbiCoder.decode(
              [
                "bytes32",
                "uint256",
                "uint256",
                "uint256",
                "uint256",
                "uint256"
              ],
              _log.data
            )
            const data: {
              _urlNFT: TUrlNFT
              _marketplaceId: string
              _itemAmount: number
              _smcAmount: number
              _txHash: string
            } = {
              _urlNFT: convertNFTTypeToUrl("nft_material"),
              _marketplaceId: _marketId,
              _itemAmount: _amountItem,
              _smcAmount: Number(_resultEvent[2].toString()),
              _txHash: _res.transactionHash
            }
            updateMaterialList(
              "increase",
              _resultEvent[1].toString(),
              Number(_resultEvent[3].toString())
            )
            await mutateFullPayment(data)
          }
        })
        .catch((error) => console.error(error))
    } else {
      errorToast(MESSAGES.please_connect_wallet)
    }
    setClose()
  }

  return {
    onCreateMaterialOrder,
    onCancelMaterialOrder,
    onExecuteMaterialOrder
  }
}

export default useMarketMaterial
