import CONFIGS from "@configs/index"
import { MESSAGES } from "@constants/messages"
import { TransactionResponse } from "@ethersproject/providers"
import {
  useMarketplaceNFT,
  useMarketplaceNFTNoAccount
} from "@feature/contract/containers/hooks/useContract"
import {
  ICancelOrderParams,
  ICreateOrderParams,
  TNFTType,
  TUrlNFT
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

interface IGetNFTOrderById {
  nftContract: string
  orderIdNFT: string
  price: BigNumberish
  seller: string
  tokenIdNFT: BigNumberish
}

const useMarketNFT = () => {
  const { utils } = ethers
  const { toWei, WeiToNumber, convertNFTTypeToUrl } = Helper
  const { setOpen, setClose } = useLoadingStore()
  const { signer, address } = useWeb3Provider()
  const { marketType } = useGlobal()
  const marketNFTContract = useMarketplaceNFT(
    signer,
    CONFIGS.CONTRACT_ADDRESS.MARKETPLACE_NFT
  )
  const marketNFTContractNoAcc = useMarketplaceNFTNoAccount(
    CONFIGS.CONTRACT_ADDRESS.MARKETPLACE_NFT
  )
  const {
    mutateMarketCreateOrder,
    mutateMarketCancelOrder,
    mutateFullPayment
  } = useMutateMarketplace()
  const {
    onCheckAllowance,
    getContractAddrsByNFTType,
    onCheckNFTIsApproveForAll,
    onCheckPolygonChain,
    onCheckOwnerNFT
  } = useGlobalMarket()
  const {
    updateInvenNFTMarketData,
    fetchInvenNFTItemDataById,
    fetchInvenItemDataById
  } = useInventoryProvider()
  const { errorToast } = useToast()

  // get order by id
  const getNFTOrderById = (_sellerId: string, _orderId: string) =>
    new Promise<IGetNFTOrderById>((resolve, reject) => {
      marketNFTContractNoAcc
        .orderByOrderIdNFT(_sellerId, _orderId)
        .then((_response: IGetNFTOrderById) => {
          resolve(_response)
        })
        .catch((_error: Error) => {
          reject(_error)
        })
    })

  // create order
  const createNFTOrder = ({
    _contract = marketNFTContract,
    _contractAddrs,
    _token,
    _nakaAmount
  }: {
    _contract?: ethers.Contract
    _contractAddrs: string
    _token: string
    _nakaAmount: BigNumberish
  }) =>
    new Promise<TransactionResponse>((resolve, reject) => {
      _contract
        .listNFT(_contractAddrs, _token, _nakaAmount)
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
    let _status: boolean = false
    setOpen(MESSAGES.transaction_processing_order)
    if (signer && address) {
      const [_checkNFTOwner, _checkChain, _checkApproveForAll] =
        await Promise.all([
          onCheckOwnerNFT(_NFTtype, _token),
          onCheckPolygonChain(marketNFTContract),
          onCheckNFTIsApproveForAll(
            address,
            CONFIGS.CONTRACT_ADDRESS.MARKETPLACE_NFT,
            _NFTtype
          )
        ])
      if (!_checkNFTOwner) {
        setClose()
        errorToast(`${MESSAGES.check_owner_nft_error} or rpc error.`)
        return false
      }
      if (!_checkChain._pass) {
        setClose()
        errorToast(MESSAGES.support_polygon_only)
        return false
      }
      if (!_checkApproveForAll) {
        setClose()
        errorToast(MESSAGES.approve_for_all_error)
        return false
      }
      await createNFTOrder({
        _contract: _checkChain._contract,
        _contractAddrs: getContractAddrsByNFTType(_NFTtype),
        _token,
        _nakaAmount: toWei(_price.toString())
      })
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
            const _data: ICreateOrderParams = {
              _urlNFT: convertNFTTypeToUrl(_NFTtype),
              _orderId: _resultEvent[0],
              _itemId: _id,
              _itemAmount: _amount,
              _price: WeiToNumber(_resultEvent[2]),
              _type: _NFTtype,
              _txHash: _res.transactionHash,
              _sellerType: "user",
              _sellingType: "fullpayment"
            }
            try {
              const { data } = await mutateMarketCreateOrder(_data)
              if (data && updateInvenNFTMarketData)
                updateInvenNFTMarketData(data, _NFTtype)
            } catch (error) {
              // fetch data
              if (
                (_NFTtype === "game_item" || _NFTtype === "nft_material") &&
                fetchInvenItemDataById
              )
                await fetchInvenItemDataById()
              else if (fetchInvenNFTItemDataById)
                await fetchInvenNFTItemDataById()
            }
            _status = true
          }
        })
        .catch((error) => {
          console.error(error)
        })
    } else {
      errorToast(MESSAGES.please_connect_wallet)
    }
    setClose()
    return _status
  }

  // cancel order
  const cancelNFTOrder = ({
    _contract = marketNFTContract,
    _sellerId,
    _orderId
  }: {
    _contract?: ethers.Contract
    _sellerId: string
    _orderId: string
  }) =>
    new Promise<TransactionResponse>((resolve, reject) => {
      _contract
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
    _idSeller: string,
    _idOrder: string
  ) => {
    let _status: boolean = false
    setOpen(MESSAGES.transaction_processing_order)
    if (signer && address) {
      const [_checkOrderById, _checkChain] = await Promise.all([
        getNFTOrderById(_idSeller, _idOrder),
        onCheckPolygonChain(marketNFTContract)
      ])
      if (Number(_checkOrderById.price) <= 0) {
        setClose()
        errorToast(`${MESSAGES.check_order_error} or rpc error.`)
        return false
      }
      if (!_checkChain._pass) {
        setClose()
        errorToast(MESSAGES.support_polygon_only)
        return false
      }
      await cancelNFTOrder({
        _contract: _checkChain._contract,
        _sellerId: _idSeller,
        _orderId: _idOrder
      })
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
              _urlNFT: convertNFTTypeToUrl(_NFTtype),
              _orderId: _resultEvent[0],
              _txHash: _res.transactionHash
            }
            try {
              await mutateMarketCancelOrder(data)
            } catch (error) {
              // fetch data
              if (
                (_NFTtype === "game_item" || _NFTtype === "nft_material") &&
                fetchInvenItemDataById
              )
                await fetchInvenItemDataById()
              else if (fetchInvenNFTItemDataById)
                await fetchInvenNFTItemDataById()
            }
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

  // execute order
  const executeNFTOrder = ({
    _contract = marketNFTContract,
    _sellerId,
    _orderId
  }: {
    _contract?: ethers.Contract
    _sellerId: string
    _orderId: string
  }) =>
    new Promise<TransactionResponse>((resolve, reject) => {
      _contract
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
    _idSeller: string,
    _idOrder: string,
    _price: number,
    _amountItem: number
  ) => {
    let _status: boolean = false
    setOpen(MESSAGES.transaction_processing_order)
    if (signer && address) {
      const [_checkOrderById, _checkChain, _checkAllowance] = await Promise.all(
        [
          getNFTOrderById(_idSeller, _idOrder),
          onCheckPolygonChain(marketNFTContract),
          onCheckAllowance({
            _type: marketType || "nft_land",
            _seller: "user",
            _selling: "fullpayment",
            _price
          })
        ]
      )
      if (Number(_checkOrderById.price) <= 0) {
        setClose()
        errorToast(`${MESSAGES.check_order_error} or rpc error.`)
        return false
      }
      if (!_checkChain._pass) {
        setClose()
        errorToast(MESSAGES.support_polygon_only)
        return false
      }
      if (!_checkAllowance.allowStatus) {
        setClose()
        return false
      }
      await executeNFTOrder({
        _contract: _checkChain._contract,
        _sellerId: _idSeller,
        _orderId: _idOrder
      })
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
            const data: {
              _urlNFT: TUrlNFT
              _marketplaceId: string
              _itemAmount: number
              _txHash: string
            } = {
              _urlNFT: convertNFTTypeToUrl(marketType || "nft_land"),
              _marketplaceId: _marketId,
              _itemAmount: _amountItem,
              _txHash: _res.transactionHash
            }
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
    getNFTOrderById,
    onCreateNFTOrder,
    onCancelNFTOrder,
    onExecuteNFTOrder
  }
}

export default useMarketNFT
