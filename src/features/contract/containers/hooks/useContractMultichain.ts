import {
  useP2PBinance,
  useP2PPolygon,
  useERC20,
  useBEP20
} from "@feature/contract/containers/hooks/useContract"
import { utils } from "ethers"
import { BigNumberish } from "@ethersproject/bignumber"
import { useEffect, useState } from "react"
import { useWeb3Provider } from "@providers/index"
import CONFIGS from "@configs/index"
import Helper from "@utils/helper"
import { ICurrentNakaData } from "@feature/inventory/interfaces/IInventoryService"
import useLoadingStore from "@stores/loading"
import { useContractFunction } from "@usedapp/core"
import {
  IResponseGetFee,
  IResponseTransaction
} from "@feature/contract/interfaces/IMultichainHook"
import { MESSAGES } from "@constants/messages"
import { parseUnits } from "ethers/lib/utils"
import useP2PDexEditOrder from "@feature/p2pDex/containers/hooks/useP2PDexEditOrder"
import useP2PDexExOrder from "@feature/p2pDex/containers/hooks/useP2PDexExOrder "
import useP2PDexCreateOrder from "@feature/p2pDex/containers/hooks/useP2PDexCreateOrder"
import { useToast } from "@feature/toast/containers"
// import { providerBSC } from "../contractHelpers"

export interface IDataOptions {
  transactionName: string
  chainId: number
  privateKey?: string
}

const dataOptions: IDataOptions = {
  chainId: Number(CONFIGS.CHAIN.CHAIN_ID),
  transactionName: "Wrap"
}
const useContractMultichain = () => {
  const { signer, address: account } = useWeb3Provider()
  const { setOpen, setClose } = useLoadingStore()
  const { mutateEditOrder } = useP2PDexEditOrder()
  const { mutateCreateOrder } = useP2PDexCreateOrder()
  const { mutateExOrder } = useP2PDexExOrder()
  const { errorToast } = useToast()
  const p2pBinanceContract = useP2PBinance(
    signer,
    CONFIGS.CONTRACT_ADDRESS.P2P_BINANCE
  )
  const p2pPolygonContract = useP2PPolygon(
    signer,
    CONFIGS.CONTRACT_ADDRESS.P2P_POLYGON
  )

  const tokenBinanceContract = useBEP20(signer, CONFIGS.CONTRACT_ADDRESS.BEP20)

  const tokenPlygonContract = useERC20(signer, CONFIGS.CONTRACT_ADDRESS.ERC20)

  const [isLoading, setIsLoading] = useState(false)
  const [nakaCurrentPrice, setNakaCurrentPrice] = useState<ICurrentNakaData>()
  const [fee, setFee] = useState("00000000000000000")

  const allowNaka =
    (signer && Number(signer?.provider?._network?.chainId)) ===
      Number(CONFIGS.CHAIN.CHAIN_ID) &&
    tokenPlygonContract.allowance(account, CONFIGS.CONTRACT_ADDRESS.P2P_POLYGON)

  const allowBinance =
    (signer && Number(signer?.provider?._network?.chainId)) ===
      Number(CONFIGS.CHAIN.BNB_CHAIN_ID) &&
    tokenBinanceContract
      .allowance(account, CONFIGS.CONTRACT_ADDRESS.P2P_BINANCE)
      .then((res) => res)
      .catch((err) => errorToast(err.message))

  const { send: sendCreateOrderSellNaka } = useContractFunction(
    p2pPolygonContract,
    "createOrderSellNaka",
    dataOptions
  )

  const { send: sendEditOrderSellNaka } = useContractFunction(
    p2pPolygonContract,
    "editOrderSell",
    dataOptions
  )

  const { send: sendEditOrderBuyNaka } = useContractFunction(
    p2pBinanceContract,
    "editOrderBuy",
    dataOptions
  )

  const { send: sendRequestSellNakaP2p } = useContractFunction(
    p2pPolygonContract,
    "requestSellNaka",
    dataOptions
  )

  const { send: sendRequestBuyNakaP2p } = useContractFunction(
    p2pBinanceContract,
    "requestBuyNaka",
    dataOptions
  )

  const { send: sendCreateOrderBuyNaka } = useContractFunction(
    p2pBinanceContract,
    "createOrderBuyNaka",
    dataOptions
  )

  const sendAllowBinance = () =>
    new Promise((resolve, reject) => {
      if (signer && account) {
        setIsLoading(true)
        tokenBinanceContract
          .approve(
            CONFIGS.CONTRACT_ADDRESS.P2P_BINANCE,
            parseUnits("31000000", 18).toString()
          )
          .then((_response) => {
            setIsLoading(false)
            if (_response && _response.hash) {
              resolve(true)
            } else {
              resolve(false)
            }
          })
          .catch(() => {
            setIsLoading(false)
            resolve(false)
            const errMsg =
              "Please try again, Confirm the transaction and make sure you are paying enough gas!"
            reject(errMsg)
          })
      } else reject()
    })

  const sendAllowNaka = () =>
    new Promise((resolve) => {
      setIsLoading(true)
      tokenPlygonContract
        .approve(
          CONFIGS.CONTRACT_ADDRESS.P2P_POLYGON,
          parseUnits("180000000", 18).toString()
        )
        .then((_response: IResponseTransaction) => {
          setIsLoading(false)

          if (_response && _response.hash) {
            resolve(true)
          } else {
            resolve(false)
          }
        })
        .catch((_error: Error) => {
          setIsLoading(false)
          resolve(false)
        })
    })

  const createOrderSellNaka = async (busdPrice: number, busdAmount: number) =>
    new Promise((resolve) => {
      setIsLoading(true)
      setOpen(MESSAGES.transaction_processing_order)
      const nakaPriceWei = Helper.toWei(busdPrice.toString())
      const nakaAmountWei = Helper.toWei(busdAmount.toString())
      sendCreateOrderSellNaka(nakaPriceWei, nakaAmountWei)
        .then((_res) => {
          if (_res) {
            resolve({ status: true, data: _res })
            setClose()
          }
          setClose()
        })
        .catch(() => {
          resolve({ status: true, data: "" })
          setClose()
        })
    })

  const editOrderSellNaka = async (
    busdPrice: number,
    busdAmount: number,
    orderId: string
  ) =>
    new Promise((resolve) => {
      const nakaPriceWei = Helper.toWei(busdPrice.toString())
      const nakaAmountWei = Helper.toWei(busdAmount.toString())

      sendEditOrderSellNaka(orderId, nakaPriceWei, nakaAmountWei)
        .then((_res) => {
          if (_res) {
            resolve({ status: true, data: _res })
            setClose()
          }
          setClose()
        })
        .catch(() => {
          resolve({ status: true, data: "" })
          setClose()
        })
    })

  const editOrderBuyNaka = async (
    busdPrice: number,
    busdAmount: number,
    orderId: string
  ) =>
    new Promise((resolve) => {
      const nakaPriceWei = Helper.toWei(busdPrice.toString())
      const nakaAmountWei = Helper.toWei(busdAmount.toString())
      p2pBinanceContract
      // .editOrderBuy(orderId, nakaPriceWei, nakaAmountWei)
      sendEditOrderBuyNaka(orderId, nakaPriceWei, nakaAmountWei)
        .then((_res) => {
          if (_res) {
            resolve({ status: true, data: _res })
            setClose()
          }
          setClose()
        })
        .catch(() => {
          resolve({ status: true, data: "" })
          setClose()
        })
    })

  const createOrderBuyNaka = (nakaPrice: number, nakaAmount: number) =>
    new Promise((resolve) => {
      setIsLoading(true)
      const busdPriceWei = Helper.toWei(nakaPrice.toString())
      const busdAmountWei = Helper.toWei(nakaAmount.toString())
      sendCreateOrderBuyNaka(busdPriceWei, busdAmountWei)
        // p2pBinanceContract
        // .createOrderBuyNaka(busdPriceWei, busdAmountWei)
        .then((_response) => {
          setIsLoading(false)
          resolve({
            status: true,
            data: _response
          })
        })
        .catch((_error) => {
          setIsLoading(false)
          resolve({ status: false, data: 0 })
        })
    })

  const sendRequestBuyNaka = (
    _polygonOrderSellId: string,
    _seller: string,
    _nakaPrice: BigNumberish,
    _sellAmount: BigNumberish,
    _buyAmount: BigNumberish
  ) =>
    new Promise((resolve) => {
      setIsLoading(true)
      p2pBinanceContract
        .requestBuyNaka(
          _polygonOrderSellId,
          _seller,
          _nakaPrice,
          _sellAmount,
          _buyAmount
        )
        .then((_response) => {
          setIsLoading(false)
          resolve({
            status: true,
            data: _response
          })
        })
        .catch((_error) => {
          setIsLoading(false)
          resolve({ status: false, data: null })
        })
    })
  const sendRequestSellNaka = (
    _polygonOrderSellId: string,
    _seller: string,
    _busdPrice: number,
    _sellAmount: number,
    _totalAmount: number,
    _type: string
  ) =>
    new Promise((resolve) => {
      setOpen(MESSAGES.transaction_processing_order)
      const sellAmount = utils.parseEther(_sellAmount.toString()).toString()
      const totalAmount = utils.parseEther(_totalAmount.toString()).toString()
      const price = utils.parseEther(_busdPrice.toString()).toString()
      if (_type === "sell") {
        sendRequestSellNakaP2p(
          _polygonOrderSellId,
          _seller,
          price,
          sellAmount,
          totalAmount
        )
          .then((_res) => {
            if (_res) {
              resolve({ status: true, data: _res })
              setClose()
            }
            setClose()
          })
          .catch(() => {
            resolve({ status: true, data: "" })
            setClose()
          })
      } else {
        sendRequestBuyNakaP2p(
          _polygonOrderSellId,
          _seller,
          price,
          sellAmount,
          totalAmount
        )
          .then((_res) => {
            if (_res) {
              resolve({ status: true, data: _res })
              setClose()
            }
            setClose()
          })
          .catch(() => {
            resolve({ status: true, data: "" })
            setClose()
          })
      }
    })

  const getFee = () =>
    new Promise((resolve) => {
      setIsLoading(true)
      signer && signer?.provider?._network?.name.includes("bnb")
        ? p2pBinanceContract
        : p2pPolygonContract
            .fee()
            .then((_response) => {
              setIsLoading(false)
              resolve({ status: true, data: _response.toString() })
            })
            .catch((_error: Error) => {
              setIsLoading(false)
              resolve({ status: false, data: 0 })
            })
    })

  const cancelOrderSellNaka = (_orderId: string) =>
    new Promise((resolve) => {
      p2pPolygonContract
        .cancelOrderSellNaka(_orderId)
        .then((_response) => {
          if (_response) {
            resolve({ status: true, data: _response })
            setClose()
          }
        })
        .catch((err) => {
          setClose()
          resolve({ status: false, data: err })
        })
    })

  const priceCurrentNaka = () => {
    Helper.getPriceNakaCurrent().then((_response) => {
      setNakaCurrentPrice(_response)
    })
  }

  const getFeeData = () => {
    getFee().then((_response) => {
      if (_response) setFee((_response as IResponseGetFee).data)
    })
  }

  useEffect(() => {
    priceCurrentNaka()
    getFeeData()
    return () => {
      setNakaCurrentPrice(undefined)
      setFee("00000000000000000")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signer])

  const saveDbEditOrder = (events, type, wallet_address, tx_hash) =>
    new Promise((resolve, reject) => {
      const orderId =
        type === "sell" ? events.args.orderBuyId : events.args.orderSellId
      const busd_price =
        type === "sell" ? events.args.busdPrice?.toString() : "0" // Only binace
      const naka_price =
        type === "sell" ? "0" : events.args.nakaPrice?.toString()
      const naka_amount = events.args.amount?.toString()
      const total_price =
        type === "sell" ? events.args.totalPriceInOrder?.toString() : "0" // Only polygon
      mutateEditOrder({
        _orderId: orderId,
        _type: type,
        _busdPrice: busd_price,
        _nakaPrice: naka_price,
        _nakaAmount: naka_amount,
        _totalPrice: total_price,
        _address: wallet_address,
        _txHash: tx_hash
      })
        .then((_response) => resolve(_response))
        .catch((err) => reject(err))
    })

  const submitDataEditNaka = (_data, type, dataEdit) =>
    new Promise((resolve, reject) => {
      const { wallet_address, order_id } = dataEdit
      setOpen(MESSAGES.transaction_processing_order)
      if (type === "sell") {
        // bnb
        editOrderBuyNaka(_data.price, _data.amount, order_id).then(
          (_receipt) => {
            const receipt = (_receipt as IResponseGetFee).data
            if (
              _receipt &&
              (_receipt as IResponseGetFee).status &&
              receipt.logs
            ) {
              const tx_hash = receipt.transactionHash
              // const tx_hash = receipt.hash

              const log = receipt.logs.find(
                (_log) =>
                  _log.address?.toLowerCase() ===
                  p2pBinanceContract.address?.toLowerCase()
              )

              const events = p2pBinanceContract.interface.parseLog(log)
              saveDbEditOrder(events, type, wallet_address, tx_hash)
                .then((_response) => resolve(_response))
                .catch((_err) => reject(_err))
              setClose()
            }
          }
        )
        //   setClose()
        // })
        // .catch(() => {
        //   setClose()
        // })
      } else {
        // naka
        editOrderSellNaka(_data.price, _data.amount, order_id ?? "")
          .then(async (_receipt) => {
            setOpen(MESSAGES.transaction_processing_order)
            const receipt = (_receipt as IResponseGetFee).data
            if (
              _receipt &&
              (_receipt as IResponseGetFee).status &&
              receipt.logs
            ) {
              const tx_hash = receipt.transactionHash
              const log = receipt.logs.find(
                (_log) =>
                  _log.address?.toLowerCase() ===
                  p2pPolygonContract.address?.toLowerCase()
              )

              const events = p2pPolygonContract.interface.parseLog(log)
              saveDbEditOrder(events, type, wallet_address, tx_hash)
                .then((_response) => resolve(_response))
                .catch((_err) => reject(_err))
              setClose()
            }
            setClose()
          })
          .catch(() => {
            setClose()
          })
      }
    })

  const createOrderBuy = (_price, _amount) => {
    createOrderBuyNaka(_price, _amount)
      .then((_receipt) => {
        const receipt = (_receipt as IResponseGetFee).data
        if (_receipt && (_receipt as IResponseGetFee).status && receipt.logs) {
          const log = receipt.logs.find(
            (_log) => _log.address === p2pBinanceContract.address
          )

          const events = p2pBinanceContract.interface.parseLog(log)
          if (events) {
            const _orderId = events.args.orderBuyId
            const _busdPrice = events.args.busdPrice.toString()
            const _nakaPrice = "0"
            const _nakaAmount = events.args.amount.toString()
            const _totalPrice = events.args.totalPrice.toString() // polygon
            const _address = events.args.buyer
            const _type = events.args.orderSellId ? "sell" : "buy"
            mutateCreateOrder({
              _orderId,
              _type,
              _busdPrice,
              _nakaPrice,
              _nakaAmount,
              _totalPrice,
              _address
            })
              .then((_res) => {
                setClose()
              })
              .catch((_err) => {
                setClose()
              })
          }
        } else {
          setClose()
        }
      })
      .catch(() => {
        setClose()
      })
  }

  const createOrder = (_data, type) => {
    setOpen(MESSAGES.transaction_processing_order)
    if (type === "buy") {
      createOrderBuy(_data.price, _data.amount)
    } else {
      createOrderSellNaka(_data.price, _data.amount)
        .then((_receipt) => {
          const receipt = (_receipt as IResponseGetFee).data

          if (
            _receipt &&
            (_receipt as IResponseGetFee).status &&
            receipt.logs
          ) {
            const log = receipt.logs.find(
              (_log) => _log.address === p2pPolygonContract.address
            )

            const events = p2pPolygonContract.interface.parseLog(log)
            if (events) {
              const _orderId = events.args.orderSellId
              const _busdPrice = "0" // Only binance
              const _nakaPrice = events.args.nakaPrice.toString()
              const _nakaAmount = events.args.amount.toString()
              const _totalPrice = "0" // Only polygon
              const _address = events.args.seller
              const _type = events.args.orderSellId ? "sell" : "buy"
              mutateCreateOrder({
                _orderId,
                _type,
                _busdPrice,
                _nakaPrice,
                _nakaAmount,
                _totalPrice,
                _address
              })
                .then((_res) => {
                  setClose()
                })
                .catch((_err) => {
                  setClose()
                })
            }
          } else {
            setClose()
          }
        })
        .catch(() => {
          setClose()
        })
    }
  }

  const saveRequestSellNaka = async (_data, dataEdit, type) => {
    await setOpen(MESSAGES.transaction_processing_order)
    if (dataEdit) {
      return sendRequestSellNaka(
        dataEdit.order_id,
        dataEdit.wallet_address,
        _data.price,
        _data.amount,
        dataEdit.naka_amount,
        type
      ).then(async (receipt) => {
        if ((receipt as IResponseGetFee).data) {
          // console.log(receipt)

          const _receipt = (receipt as IResponseGetFee).data
          if (_receipt && _receipt.logs) {
            const event = _receipt.logs.find((log) => {
              if (type === "sell") {
                return log.address === p2pPolygonContract.address
              }
              return log.address === p2pBinanceContract.address
            })
            // console.log(event)

            let events
            if (type === "sell") {
              events = p2pPolygonContract.interface.parseLog(event)
            }
            events = p2pBinanceContract.interface.parseLog(event)
            // console.log(events)

            if (events) {
              const request_id =
                type === "buy"
                  ? events.args.requestBuyNakaId
                  : events.args.requestSellNakaId
              const order_id =
                type === "buy"
                  ? events.args.polygonOrderSellId
                  : events.args.binanceOrderBuyId
              const busd_price =
                type === "buy" ? "0" : events.args.busdPrice.toString()
              const naka_price =
                type === "buy" ? events.args.nakaPrice.toString() : "0"
              const naka_amount =
                type === "buy"
                  ? events.args.buyAmount.toString()
                  : events.args.sellAmount.toString()
              const buyer_address = events.args.buyer
              const seller_address = events.args.seller

              await mutateExOrder({
                _requestId: request_id,
                _orderId: order_id,
                _type: type,
                _busdPrice: busd_price,
                _nakaPrice: naka_price,
                _nakaAmount: naka_amount,
                _buyerAddress: buyer_address,
                _sellerAddress: seller_address,
                _totalPrice: dataEdit?.naka_amount?.toString(),
                _address: dataEdit.wallet_address
              })
            }
          }
        }
      })
    }
  }

  return {
    allowBinance,
    allowNaka,
    sendAllowNaka,
    sendAllowBinance,
    createOrderSellNaka,
    createOrderBuyNaka,
    sendRequestBuyNaka,
    isLoading,
    getFee,
    p2pPolygonContract,
    p2pBinanceContract,
    nakaCurrentPrice,
    cancelOrderSellNaka,
    fee,
    editOrderSellNaka,
    sendRequestSellNaka,
    submitDataEditNaka,
    createOrder,
    saveRequestSellNaka
  }
}

export default useContractMultichain
