import CONFIGS from "@configs/index"
import { MESSAGES } from "@constants/messages"
import { TransactionResponse } from "@ethersproject/providers"
import {
  useMarketplaceGameItems,
  useMarketplaceGameItemsNoAccount
} from "@feature/contract/containers/hooks/useContract"
import useInvenGameItem from "@feature/gameItem/inventory/containers/hooks/useInvenGameItem"
import useGlobalMarket from "@feature/marketplace/containers/hooks/useGlobalMarket"
import useMutateMarketplace from "@feature/marketplace/containers/hooks/useMutateMarketplace"
import {
  ICancelOrderParams,
  ICreateOrderParams,
  TUrlNFT
} from "@feature/marketplace/interfaces/IMarketService"
import { useToast } from "@feature/toast/containers"
import { useInventoryProvider } from "@providers/InventoryProvider"
import { useWeb3Provider } from "@providers/Web3Provider"
import useLoadingStore from "@stores/loading"
import Helper from "@utils/helper"
import { BigNumberish, ethers } from "ethers"

interface IGetItemOrderById {
  id: string
  seller: string
  itemId: BigNumberish
  itemAmount: BigNumberish
  price: BigNumberish
}

const useMarketGameItem = () => {
  const { utils } = ethers
  const { signer, address } = useWeb3Provider()
  const marketGameItemContract = useMarketplaceGameItems(
    signer,
    CONFIGS.CONTRACT_ADDRESS.MARKETPLACE
  )
  const marketGameItemContractNoAcc = useMarketplaceGameItemsNoAccount(
    CONFIGS.CONTRACT_ADDRESS.MARKETPLACE
  )
  const { WeiToNumber, toWei, convertNFTTypeToUrl } = Helper
  const { setOpen, setClose } = useLoadingStore()
  const {
    mutateMarketCreateOrder,
    mutateMarketCancelOrder,
    mutateFullPayment
  } = useMutateMarketplace()
  const { updateGameItemList, getGameItemByToken } = useInvenGameItem()
  const { onCheckPolygonChain } = useGlobalMarket()
  const { updateInvenNFTMarketData } = useInventoryProvider()
  const { errorToast } = useToast()

  // get order
  const getItemOrderById = (_sellerId: string, _orderId: string) =>
    new Promise<IGetItemOrderById>((resolve, reject) => {
      marketGameItemContractNoAcc
        .orderByOrderIdNFT(_sellerId, _orderId)
        .then((_response: IGetItemOrderById) => {
          resolve(_response)
        })
        .catch((_error: Error) => {
          reject(_error)
        })
    })

  // create
  const createGameItemOrder = ({
    _contract = marketGameItemContract,
    _tokenId,
    _itemAmount,
    _nakaAmount
  }: {
    _contract?: ethers.Contract
    _tokenId: string
    _itemAmount: number
    _nakaAmount: BigNumberish
  }) =>
    new Promise<TransactionResponse>((resolve, reject) => {
      _contract
        .createOrder(_tokenId, _itemAmount, _nakaAmount)
        .then((_response: TransactionResponse) => {
          resolve(_response)
        })
        .catch((_error: Error) => {
          reject(_error)
        })
    })

  const onCreateGameItemOrder = async (
    _itemId: string,
    _tokenId: string,
    _itemAmount: number,
    _nakaAmount: number
  ) => {
    let _status: boolean = false
    setOpen(MESSAGES.transaction_processing_order)
    if (signer && address) {
      const [_checkItemAmountById, _checkChain] = await Promise.all([
        getGameItemByToken(address, _tokenId),
        onCheckPolygonChain(marketGameItemContract)
      ])
      if (Number(_checkItemAmountById.toString()) < _itemAmount) {
        setClose()
        errorToast("item amount not enough")
        return false
      }
      if (!_checkChain._pass) {
        setClose()
        errorToast(MESSAGES.support_polygon_only)
        return false
      }
      await createGameItemOrder({
        _contract: _checkChain._contract,
        _tokenId,
        _itemAmount,
        _nakaAmount: toWei(_nakaAmount.toString())
      })
        .then(async (response) => {
          const _res = await response.wait()
          const _enTopic = await utils.keccak256(
            utils.toUtf8Bytes(
              "OrderCreated(bytes32,address,uint256,uint256,uint256)"
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
            const _data: ICreateOrderParams = {
              _urlNFT: convertNFTTypeToUrl("game_item"),
              _orderId: _resultEvent[0],
              _itemId,
              _itemAmount: _resultEvent[2].toString(),
              _price: WeiToNumber(_resultEvent[3]),
              _type: "game_item",
              _txHash: _res.transactionHash,
              _sellerType: "user"
            }
            updateGameItemList(
              "decrease",
              _resultEvent[1].toString(),
              Number(_resultEvent[2].toString())
            )
            const { data } = await mutateMarketCreateOrder(_data)
            if (data && updateInvenNFTMarketData)
              updateInvenNFTMarketData(undefined, "game_item", data.item_total)
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
  const cancelGameItemOrder = ({
    _contract = marketGameItemContract,
    _sellerId,
    _orderId
  }: {
    _contract?: ethers.Contract
    _sellerId: string
    _orderId: string
  }) =>
    new Promise<TransactionResponse>((resolve, reject) => {
      _contract
        .cancelOrder(_sellerId, _orderId)
        .then((_response: TransactionResponse) => {
          resolve(_response)
        })
        .catch((_error: Error) => {
          reject(_error)
        })
    })

  const onCancelGameItemOrder = async (_sellerId: string, _orderId: string) => {
    let _status: boolean = false
    setOpen(MESSAGES.transaction_processing_order)
    if (signer && address) {
      const [_checkOrderById, _checkChain] = await Promise.all([
        getItemOrderById(_sellerId, _orderId),
        onCheckPolygonChain(marketGameItemContract)
      ])
      if (Number(_checkOrderById.price) <= 0) {
        setClose()
        errorToast("order not founded")
        return false
      }
      if (!_checkChain._pass) {
        setClose()
        errorToast(MESSAGES.support_polygon_only)
        return false
      }
      await cancelGameItemOrder({
        _contract: _checkChain._contract,
        _sellerId,
        _orderId
      })
        .then(async (response) => {
          const _res = await response.wait()
          const _enTopic = await utils.keccak256(
            utils.toUtf8Bytes("OrderCancelled(bytes32,address,uint256,uint256)")
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
              _urlNFT: convertNFTTypeToUrl("game_item"),
              _orderId: _resultEvent[0],
              _txHash: _res.transactionHash
            }
            updateGameItemList(
              "increase",
              _resultEvent[1].toString(),
              Number(_resultEvent[2].toString())
            )
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

  // buy with approve
  const executeGameItemOrder = ({
    _contract = marketGameItemContract,
    _sellerId,
    _orderId,
    _itemAmount
  }: {
    _contract?: ethers.Contract
    _sellerId: string
    _orderId: string
    _itemAmount: number
  }) =>
    new Promise<TransactionResponse>((resolve, reject) => {
      _contract
        .executeOrder(_sellerId, _orderId, _itemAmount)
        .then((_response: TransactionResponse) => {
          resolve(_response)
        })
        .catch((_error: Error) => {
          reject(_error)
        })
    })

  const onExecuteGameItemOrder = async (
    _marketId: string,
    _itemID: string,
    _sellerId: string,
    _orderId: string,
    _amountItem: number
  ) => {
    let _status: boolean = false
    setOpen(MESSAGES.transaction_processing_order)
    if (signer && address) {
      const [_checkOrderById, _checkChain] = await Promise.all([
        getItemOrderById(_sellerId, _orderId),
        onCheckPolygonChain(marketGameItemContract)
      ])
      if (Number(_checkOrderById.price) <= 0) {
        setClose()
        errorToast("order not founded")
        return false
      }
      if (!_checkChain._pass) {
        setClose()
        errorToast(MESSAGES.support_polygon_only)
        return false
      }
      await executeGameItemOrder({
        _contract: _checkChain._contract,
        _sellerId,
        _orderId,
        _itemAmount: _amountItem
      })
        .then(async (response) => {
          const _res = await response.wait()
          const _enTopic = await utils.keccak256(
            utils.toUtf8Bytes(
              "OrderExecuted(bytes32,address,address,uint256,uint256,uint256,uint256)"
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
              _urlNFT: convertNFTTypeToUrl("game_item"),
              _marketplaceId: _marketId,
              _itemAmount: _amountItem,
              _smcAmount: Number(_resultEvent[2].toString()),
              _txHash: _res.transactionHash
            }
            updateGameItemList(
              "increase",
              _resultEvent[1].toString(),
              Number(_resultEvent[3].toString())
            )
            await mutateFullPayment(data)
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

  return {
    getItemOrderById,
    onCreateGameItemOrder,
    onCancelGameItemOrder,
    onExecuteGameItemOrder
  }
}

export default useMarketGameItem
