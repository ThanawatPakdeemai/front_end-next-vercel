import CONFIGS from "@configs/index"
import { MESSAGES } from "@constants/messages"
import { TransactionResponse } from "@ethersproject/providers"
import { useMarketplaceMaterial } from "@feature/contract/containers/hooks/useContract"
import useMutateMarketplace from "@feature/marketplace/containers/hooks/useMutateMarketplace"
import {
  ICancelOrderParams,
  ICreateOrderParams,
  IPurchOrderParams
} from "@feature/marketplace/interfaces/IMarketService"
import useInvenMaterial from "@feature/material/inventory/containers/hooks/useInvenMaterial"
import { useWeb3Provider } from "@providers/Web3Provider"
import useLoadingStore from "@stores/loading"
import Helper from "@utils/helper"
import { BigNumberish, ethers } from "ethers"

const useMarketMaterial = () => {
  const { signer } = useWeb3Provider()
  const marketMaterialContract = useMarketplaceMaterial(
    signer,
    CONFIGS.CONTRACT_ADDRESS.MARKETPLACE
  )
  const { setOpen, setClose } = useLoadingStore()
  const { utils } = ethers
  const { WeiToNumber, toWei } = Helper
  const {
    mutateMarketCreateOrder,
    mutateMarketCancelOrder,
    mutateMarketPurcOrder
  } = useMutateMarketplace()
  const { updateMaterialList } = useInvenMaterial()

  // create order
  const createMaterialOrder = (
    _materialId: string,
    _materialAmount: number,
    _nakaAmount: BigNumberish
  ) =>
    new Promise<TransactionResponse>((resolve, reject) => {
      marketMaterialContract
        .createOrderMaterial(_materialId, _materialAmount, _nakaAmount)
        .then((_response: TransactionResponse) => {
          resolve(_response)
        })
        .catch((_error: Error) => {
          reject(_error)
        })
    })

  const onCreateMaterialOrder = async (
    _materialId: string,
    _materialAmount: number,
    _nakaAmount: number
  ) => {
    setOpen(MESSAGES.transaction_processing_order)
    await createMaterialOrder(
      _materialId,
      _materialAmount,
      toWei(_nakaAmount.toString())
    )
      .then(async (response) => {
        const _res = await response.wait()
        const _enTopic = await utils.keccak256(
          utils.toUtf8Bytes(
            "OrderCreatedMaterial(bytes32,address,uint256,uint256,uint256)"
          )
        )
        const _log = _res.logs.find((f) => f.topics.find((l) => l === _enTopic))
        if (_log) {
          const _resultEvent = utils.defaultAbiCoder.decode(
            ["bytes32", "uint256", "uint256", "uint256"],
            _log.data
          )
          const data: ICreateOrderParams = {
            _orderId: _resultEvent[0],
            _itemId: _resultEvent[1].toString(),
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
      .finally(() => setClose())
  }

  // cancel order
  const cancelMaterialOrder = (_sellerAccount: string, _orderId: string) =>
    new Promise<TransactionResponse>((resolve, reject) => {
      marketMaterialContract
        .cancelOrderMaterial(_sellerAccount, _orderId)
        .then((_response: TransactionResponse) => {
          resolve(_response)
        })
        .catch((_error: Error) => {
          reject(_error)
        })
    })

  const onCancelMaterialOrder = async (
    _sellerAccount: string,
    _orderID: string
  ) => {
    setOpen(MESSAGES.transaction_processing_order)
    await cancelMaterialOrder(_sellerAccount, _orderID)
      .then(async (response) => {
        const _res = await response.wait()

        const _enTopic = await utils.keccak256(
          utils.toUtf8Bytes(
            "OrderCancelledMaterial(bytes32,address,uint256,uint256)"
          )
        )
        const _log = _res.logs.find((f) => f.topics.find((l) => l === _enTopic))
        if (_log) {
          const _resultEvent = utils.defaultAbiCoder.decode(
            ["bytes32", "uint256", "uint256"],
            _log.data
          )
          const data: ICancelOrderParams = {
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
      .finally(() => setClose())
  }

  // execute order
  const executeMaterialOrder = (
    _sellerAccount: string,
    _orderId: string,
    _materialAmount: number
  ) =>
    new Promise<TransactionResponse>((resolve, reject) => {
      marketMaterialContract
        .executeOrderMaterial(_sellerAccount, _orderId, _materialAmount)
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
    _sellerAccount: string,
    _orderId: string,
    _amountItem: number
  ) => {
    setOpen(MESSAGES.transaction_processing_order)
    await executeMaterialOrder(_sellerAccount, _orderId, _amountItem)
      .then(async (response) => {
        const _res = await response.wait()
        const _enTopic = await utils.keccak256(
          utils.toUtf8Bytes(
            "OrderExecutedMaterial(bytes32,address,address,uint256,uint256,uint256,uint256,uint256)"
          )
        )
        const _log = _res.logs.find((f) => f.topics.find((l) => l === _enTopic))
        if (_log) {
          const _resultEvent = utils.defaultAbiCoder.decode(
            ["bytes32", "uint256", "uint256", "uint256", "uint256", "uint256"],
            _log.data
          )
          const data: IPurchOrderParams = {
            _marketplaceId: _marketId,
            _itemId: _itemID,
            _itemAmount: _amountItem,
            _smcAmount: Number(_resultEvent[2].toString()),
            _txHash: _res.transactionHash
          }
          updateMaterialList(
            "increase",
            _resultEvent[1].toString(),
            Number(_resultEvent[3].toString())
          )
          await mutateMarketPurcOrder(data)
        }
      })
      .catch((error) => console.error(error))
      .finally(() => setClose())
  }

  return {
    onCreateMaterialOrder,
    onCancelMaterialOrder,
    onExecuteMaterialOrder
  }
}

export default useMarketMaterial
