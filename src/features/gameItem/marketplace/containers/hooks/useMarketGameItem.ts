import CONFIGS from "@configs/index"
import { MESSAGES } from "@constants/messages"
import { TransactionResponse } from "@ethersproject/providers"
import { useMarketplaceGameItems } from "@feature/contract/containers/hooks/useContract"
import useMarketplace from "@feature/marketplace/containers/hooks/useMarketplace"
import {
  ICancelOrderParams,
  ICreateOrderParams,
  IPurchOrderParams
} from "@feature/marketplace/interfaces/IMarketService"
import { useWeb3Provider } from "@providers/Web3Provider"
import useLoadingStore from "@stores/loading"
import Helper from "@utils/helper"
import { BigNumberish, ethers } from "ethers"

const useMarketGameItem = () => {
  const { utils } = ethers
  const { signer } = useWeb3Provider()
  const marketGameItemContract = useMarketplaceGameItems(
    signer,
    CONFIGS.CONTRACT_ADDRESS.MARKETPLACE
  )
  const { WeiToNumber } = Helper
  const { setOpen, setClose } = useLoadingStore()
  const {
    mutateMarketCreateOrder,
    mutateMarketCancelOrder,
    mutateMarketPurcOrder
  } = useMarketplace()

  // create
  const createGameItemOrder = (
    _itemId: string,
    _itemAmount: number,
    _nakaAmount: BigNumberish
  ) =>
    new Promise<TransactionResponse>((resolve, reject) => {
      marketGameItemContract
        .createOrder(_itemId, _itemAmount, _nakaAmount)
        .then((_response: TransactionResponse) => {
          resolve(_response)
        })
        .catch((_error: Error) => {
          reject(_error)
        })
    })

  const onCreateGameItemOrder = async (
    _itemId: string,
    _itemAmount: number,
    _nakaAmount: BigNumberish
  ) => {
    setOpen(MESSAGES.transaction_processing_order)
    await createGameItemOrder(_itemId, _itemAmount, _nakaAmount)
      .then(async (response) => {
        const _res = await response.wait()
        const _enTopic = await utils.keccak256(
          utils.toUtf8Bytes(
            "OrderCreated(bytes32,address,uint256,uint256,uint256)"
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
            _type: "game_item",
            _txHash: _res.transactionHash,
            _sellerType: "user"
          }
          mutateMarketCreateOrder(data)
        }
      })
      .catch((error) => console.error(error))
      .finally(() => setClose())
  }

  // cancel
  const cancelGameItemOrder = (_sellerAccount: string, _orderId: string) =>
    new Promise<TransactionResponse>((resolve, reject) => {
      marketGameItemContract
        .cancelOrder(_sellerAccount, _orderId)
        .then((_response: TransactionResponse) => {
          resolve(_response)
        })
        .catch((_error: Error) => {
          reject(_error)
        })
    })

  const onCancelGameItemOrder = async (
    _sellerAccount: string,
    _orderID: string
  ) => {
    setOpen(MESSAGES.transaction_processing_order)
    await cancelGameItemOrder(_sellerAccount, _orderID)
      .then(async (response) => {
        const _res = await response.wait()
        const data: ICancelOrderParams = {
          _orderId: _orderID,
          _txHash: _res.transactionHash
        }
        mutateMarketCancelOrder(data)
      })
      .catch((error) => console.error(error))
      .finally(() => setClose())
  }

  // buy with approve
  const executeGameItemOrder = (
    _sellerAccount: string,
    _orderId: string,
    _itemAmount: number
  ) =>
    new Promise<TransactionResponse>((resolve, reject) => {
      marketGameItemContract
        .executeOrder(_sellerAccount, _orderId, _itemAmount)
        .then((_response: TransactionResponse) => {
          resolve(_response)
        })
        .catch((_error: Error) => {
          reject(_error)
        })
    })

  const onPurchaseGameItemOrder = async (
    _marketId: string,
    _itemID: string,
    _sellerAccount: string,
    _orderId: string,
    _amountItem: number
  ) => {
    setOpen(MESSAGES.transaction_processing_order)
    await executeGameItemOrder(_sellerAccount, _orderId, _amountItem)
      .then(async (response) => {
        const _res = await response.wait()
        const _enTopic = await utils.keccak256(
          utils.toUtf8Bytes(
            "OrderExecuted(bytes32,address,address,uint256,uint256,uint256,uint256)"
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
          mutateMarketPurcOrder(data)
        }
      })
      .catch((error) => console.error(error))
      .finally(() => setClose())
  }

  return {
    onCreateGameItemOrder,
    onCancelGameItemOrder,
    onPurchaseGameItemOrder
  }
}

export default useMarketGameItem
