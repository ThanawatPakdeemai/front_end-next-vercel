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
    onCheckNFTIsApproveForAll
  } = useGlobalMarket()

  // create order
  const createNFTInstallOrder = (
    _contract: string,
    _token: string,
    _nakaAmount: BigNumberish
  ) =>
    new Promise<TransactionResponse>((resolve, reject) => {
      marketNFTInstallContract
        .createOrderInstallmentNFT(_contract, _token, _nakaAmount)
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
    if (signer && address) {
      setOpen(MESSAGES.transaction_processing_order)
      await onCheckNFTIsApproveForAll(
        address,
        CONFIGS.CONTRACT_ADDRESS.MARKETPLACE_NFT_INSTALL,
        _NFTtype
      ).catch((error) => console.error(error))
      await createNFTInstallOrder(
        getContractAddrsByNFTType(_NFTtype),
        _token,
        toWei(_price.toString())
      )
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
            const data: ICreateOrderParams = {
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
  const cancelNFTInstallOrder = (_orderId: string) =>
    new Promise<TransactionResponse>((resolve, reject) => {
      marketNFTInstallContract
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
    _orderId: string
  ) => {
    setOpen(MESSAGES.transaction_processing_order)
    if (signer && address) {
      await onCheckNFTIsApproveForAll(
        address,
        CONFIGS.CONTRACT_ADDRESS.MARKETPLACE_NFT_INSTALL,
        _NFTtype
      ).catch((error) => console.error(error))
      await cancelNFTInstallOrder(_orderId)
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
          }
        })
        .catch((error) => console.error(error))
    }
    setClose()
  }

  // execute order
  const executeNFTInstallOrder = (
    _sellerAcc: string,
    _orderId: string,
    _period: number
  ) =>
    new Promise<TransactionResponse>((resolve, reject) => {
      marketNFTInstallContract
        .executeOrderInstallmentNFT(_sellerAcc, _orderId, _period)
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
    setOpen(MESSAGES.transaction_processing_order)
    if (signer && address) {
      await checkAllowanceNaka(CONFIGS.CONTRACT_ADDRESS.MARKETPLACE_NFT_INSTALL)
      await executeNFTInstallOrder(_sellerId, _orderId, _period)
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
          }
        })
        .catch((error) => console.error(error))
    }
    setClose()
  }

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

  // paybill
  const payBillByBillId = (_billId: string, _period: number) =>
    new Promise<TransactionResponse>((resolve, reject) => {
      marketNFTInstallContract
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
    const periodValue = _period || 0
    await checkAllowanceNaka(CONFIGS.CONTRACT_ADDRESS.MARKETPLACE_NFT_INSTALL)
    await payBillByBillId(_billId, periodValue)
      .then(async (response) => {
        const _res = await response.wait()
        const _enTopic = await utils.keccak256(
          utils.toUtf8Bytes(
            "PayBill(bytes32,address,address,uint256,uint256,uint256)"
          )
        )
        const _log = _res.logs.find((f) => f.topics.find((l) => l === _enTopic))
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
