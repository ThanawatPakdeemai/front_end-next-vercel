import CONFIGS from "@configs/index"
import { MESSAGES } from "@constants/messages"
import { TransactionResponse } from "@ethersproject/providers"
import {
  useMarketplaceNFTInstall,
  useMarketplaceNFTInstallNoAccount
} from "@feature/contract/containers/hooks/useContract"
import {
  ICancelOrderParams,
  ICreateOrderParams,
  IPayBillParams,
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

interface IGetBillByBillId {
  billId: string
  buyer: string
  seller: string
  nftAddress: string
  tokenId: BigNumberish
  price: BigNumberish
  period: BigNumberish
  periodBalance: BigNumberish
  prePay: BigNumberish
  totalBill: BigNumberish
  billBalance: BigNumberish
  payByperiod: BigNumberish
}

const useMarketNFTInstall = () => {
  const { utils } = ethers
  const { toWei, WeiToNumber, convertNFTTypeToUrl } = Helper
  const { setOpen, setClose } = useLoadingStore()
  const { signer, address } = useWeb3Provider()
  const { marketType } = useGlobal()
  const marketNFTInstallContract = useMarketplaceNFTInstall(
    signer,
    CONFIGS.CONTRACT_ADDRESS.MARKETPLACE_NFT_INSTALL
  )
  const marketNFTInstallContractNoAcc = useMarketplaceNFTInstallNoAccount(
    CONFIGS.CONTRACT_ADDRESS.MARKETPLACE_NFT_INSTALL
  )
  const {
    mutateMarketCreateOrder,
    mutateMarketCancelOrder,
    mutatePayInstallment,
    mutatePayBillInstallNFT
  } = useMutateMarketplace()
  const {
    checkAllowanceNaka,
    getContractAddrsByNFTType,
    onCheckNFTIsApproveForAll,
    onCheckPolygonChain,
    onCheckOwnerNFT
  } = useGlobalMarket()
  const { updateInvenNFTMarketData } = useInventoryProvider()

  const { errorToast } = useToast()

  // get bill detail by billId
  const getBillByBillId = (_sellerId: string, _billId: string) =>
    new Promise<IGetBillByBillId>((resolve, reject) => {
      marketNFTInstallContractNoAcc
        .billByBillId(_sellerId, _billId)
        .then((_response: IGetBillByBillId) => {
          resolve(_response)
        })
        .catch((_error: Error) => {
          reject(_error)
        })
    })

  // create order
  const createNFTInstallOrder = ({
    _contract = marketNFTInstallContract,
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
        ._contract(_contractAddrs, _token, _nakaAmount)
        .then((_response: TransactionResponse) => {
          resolve(_response)
        })
        .catch((_error: Error) => {
          reject(_error)
        })
    })

  const onCreateNFTInstallOrder = async (
    _NFTtype: TNFTType,
    _id: string,
    _token: string,
    _price: number,
    _amount: number
  ) => {
    let _status: boolean = false
    setOpen(MESSAGES.transaction_processing_order)
    if (signer && address) {
      const [_checkNFTOwner, _checkChain] = await Promise.all([
        onCheckOwnerNFT(_NFTtype, _token),
        onCheckPolygonChain(marketNFTInstallContract)
      ])
      if (!_checkNFTOwner) {
        setClose()
        errorToast("you are not owner of this nft")
        return false
      }
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
      await createNFTInstallOrder({
        _contract: _checkChain._contract,
        _contractAddrs: getContractAddrsByNFTType(_NFTtype),
        _token,
        _nakaAmount: toWei(_price.toString())
      })
        .then(async (response) => {
          const _res = await response.wait()
          const _enTopic = await utils.keccak256(
            utils.toUtf8Bytes(
              "OrderCreatedInstallmentNFT(bytes32,address,address,uint256,uint256)"
            )
          )
          const _log = _res.logs.find((f) =>
            f.topics.find((l) => l === _enTopic)
          )
          if (_log) {
            const _resultEvent = utils.defaultAbiCoder.decode(
              ["bytes32", "address", "uint256", "uint256"],
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
              _sellingType: "installment"
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

  // cancel order
  const cancelNFTInstallOrder = ({
    _contract = marketNFTInstallContract,
    _orderId
  }: {
    _contract?: ethers.Contract
    _orderId: string
  }) =>
    new Promise<TransactionResponse>((resolve, reject) => {
      _contract
        .cancelOrderInstallmentNFT(_orderId)
        .then((_response: TransactionResponse) => {
          resolve(_response)
        })
        .catch((_error: Error) => {
          reject(_error)
        })
    })

  const onCancelNFTInstallOrder = async (
    _NFTtype: TNFTType,
    _idSeller: string,
    _idOrder: string
  ) => {
    let _status: boolean = false
    setOpen(MESSAGES.transaction_processing_order)
    if (signer && address) {
      const [_checkOrderById, _checkChain] = await Promise.all([
        getBillByBillId(_idSeller, _idOrder),
        onCheckPolygonChain(marketNFTInstallContract)
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
      await onCheckNFTIsApproveForAll(
        address,
        CONFIGS.CONTRACT_ADDRESS.MARKETPLACE_NFT_INSTALL,
        _NFTtype
      ).catch((error) => console.error(error))
      await cancelNFTInstallOrder({
        _contract: _checkChain._contract,
        _orderId: _idOrder
      })
        .then(async (response) => {
          const _res = await response.wait()
          const _enTopic = await utils.keccak256(
            utils.toUtf8Bytes(
              "OrderCancelledInstallmentNFT(bytes32,address,address,uint256,uint256)"
            )
          )
          const _log = _res.logs.find((f) =>
            f.topics.find((l) => l === _enTopic)
          )
          if (_log) {
            const _resultEvent = utils.defaultAbiCoder.decode(
              ["bytes32", "address", "uint256", "uint256"],
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

  // execute order
  const executeNFTInstallOrder = ({
    _contract = marketNFTInstallContract,
    _sellerId,
    _orderId,
    _period
  }: {
    _contract?: ethers.Contract
    _sellerId: string
    _orderId: string
    _period: number
  }) =>
    new Promise<TransactionResponse>((resolve, reject) => {
      _contract
        .executeOrderInstallmentNFT(_sellerId, _orderId, _period)
        .then((_response: TransactionResponse) => {
          resolve(_response)
        })
        .catch((_error: Error) => {
          reject(_error)
        })
    })

  const onExecuteNFTInstallOrder = async (
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
        getBillByBillId(_sellerId, _orderId),
        onCheckPolygonChain(marketNFTInstallContract)
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
      await checkAllowanceNaka(CONFIGS.CONTRACT_ADDRESS.MARKETPLACE_NFT_INSTALL)
      await executeNFTInstallOrder({
        _contract: _checkChain._contract,
        _sellerId,
        _orderId,
        _period
      })
        .then(async (response) => {
          const _res = await response.wait()
          const _enTopic = await utils.keccak256(
            utils.toUtf8Bytes(
              "executedOrderInstallmentNFT_Details(bytes32,uint256,uint256,uint256,uint256,uint256,uint256,uint256)"
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
              _installment_data: {
                bill_id: _resultEvent[0],
                price: WeiToNumber(_resultEvent[1]),
                period: Number(_resultEvent[2].toString()),
                periodBalance: Number(_resultEvent[3].toString()),
                prePay: WeiToNumber(_resultEvent[4]),
                totalBill: WeiToNumber(_resultEvent[5]),
                billBalance: WeiToNumber(_resultEvent[6]),
                payByperiod: WeiToNumber(_resultEvent[7]),
                marketplace_id: _marketId,
                item_id: _itemID
              }
            }
            await mutatePayInstallment(_data)
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

  // paybill
  const payBillByBillId = ({
    _contract = marketNFTInstallContract,
    _billId,
    _period
  }: {
    _contract?: ethers.Contract

    _billId: string
    _period: number
  }) =>
    new Promise<TransactionResponse>((resolve, reject) => {
      _contract
        .payBillInstallmentNFT(_billId, _period)
        .then((_response: TransactionResponse) => {
          resolve(_response)
        })
        .catch((_error: Error) => {
          reject(_error)
        })
    })

  const onPayBillNFTInstallOrder = async (
    _billId: string,
    _periodAt: number,
    _period?: number
  ) => {
    setOpen(MESSAGES.transaction_processing_order)
    if (signer && address) {
      const _checkChain = await onCheckPolygonChain(marketNFTInstallContract)
      if (!_checkChain._pass) {
        setClose()
        errorToast(MESSAGES.support_polygon_only)
        return
      }
      const periodValue = _period || 0
      await checkAllowanceNaka(CONFIGS.CONTRACT_ADDRESS.MARKETPLACE_NFT_INSTALL)
      await payBillByBillId({
        _contract: _checkChain._contract,
        _billId,
        _period: periodValue
      })
        .then(async (response) => {
          const _res = await response.wait()
          const _enTopic = await utils.keccak256(
            utils.toUtf8Bytes(
              "PayBill(bytes32,address,address,uint256,uint256,uint256)"
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
            const data: IPayBillParams = {
              _billId: _resultEvent[0],
              _billBalance: WeiToNumber(_resultEvent[2]),
              _periodBalance: Number(_resultEvent[1].toString()),
              _txHash: _res.transactionHash,
              _roundPayed: _periodAt,
              _roundPayedAmount: WeiToNumber(_resultEvent[3])
            }
            await mutatePayBillInstallNFT(data)
          }
        })
        .catch((error) => console.error(error))
    } else {
      errorToast(MESSAGES.please_connect_wallet)
    }
    setClose()
  }

  return {
    onCreateNFTInstallOrder,
    onCancelNFTInstallOrder,
    onExecuteNFTInstallOrder,
    onPayBillNFTInstallOrder,
    getBillByBillId
  }
}
export default useMarketNFTInstall
