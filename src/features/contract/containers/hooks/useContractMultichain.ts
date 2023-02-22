import {
  useP2PBinance,
  useP2PPolygon
} from "@feature/contract/containers/hooks/useContract"
import { ethers, utils } from "ethers"
import { BigNumberish } from "@ethersproject/bignumber"
import { useEffect, useState } from "react"
import { useWeb3Provider } from "@providers/index"
import CONFIGS from "@configs/index"
import Helper from "@utils/helper"
import { ICurrentNakaData } from "@feature/inventory/interfaces/IInventoryService"
import useLoadingStore from "@stores/loading"
import { useContractFunction } from "@usedapp/core"
import { IResponseGetFee } from "@feature/contract/interfaces/IMultichainHook"
import { MESSAGES } from "@constants/messages"

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

  const p2pBinanceContract = useP2PBinance(
    signer,
    CONFIGS.CONTRACT_ADDRESS.P2P_BINANCE
  )
  const p2pPolygonContract = useP2PPolygon(
    signer,
    CONFIGS.CONTRACT_ADDRESS.P2P_POLYGON
  )
  const [isLoading, setIsLoading] = useState(false)
  const [nakaCurrentPrice, setNakaCurrentPrice] = useState<ICurrentNakaData>()
  const [fee, setFee] = useState("00000000000000000")
  const [allowNaka, setAllowNaka] = useState(false)

  const {
    // state: stateCreateOrderSellNaka,
    send: sendCreateOrderSellNaka
    // events: eventsCreateOrderSellNaka
  } = useContractFunction(
    p2pPolygonContract,
    "createOrderSellNaka",
    dataOptions
  )

  const { send: sendEditOrderSellNaka } = useContractFunction(
    p2pPolygonContract,
    "editOrderSell",
    dataOptions
  )

  const { send: sendRequestSellNakaP2p } = useContractFunction(
    p2pPolygonContract,
    "requestSellNaka",
    dataOptions
  )

  const allowBinance = (_address: string) =>
    new Promise((resolve, reject) => {
      if (signer && account) {
        setIsLoading(true)
        p2pBinanceContract
          .approve(
            CONFIGS.CONTRACT_ADDRESS.P2P_BINANCE,
            ethers.constants.MaxUint256
          )
          .send({
            from: _address
          })
          .then(() => {
            setIsLoading(false)
            resolve("Contract Approved!")
          })
          .catch(() => {
            setIsLoading(false)
            const errMsg =
              "Please try again, Confirm the transaction and make sure you are paying enough gas!"
            reject(errMsg)
          })
      } else reject()
    })

  const checkAllowNaka = () =>
    new Promise((resolve) => {
      setIsLoading(true)
      p2pPolygonContract
        .approve(account, CONFIGS.CONTRACT_ADDRESS.P2P_POLYGON, {
          transactionName: "Wrap",
          chainId: CONFIGS.CHAIN.CHAIN_ID,
          privateKey: ""
        })
        .then((_response: string) => {
          setIsLoading(false)
          resolve({
            status: true,
            data: Helper.WeiToNumber(_response.toString())
          })
        })
        .catch((_error: Error) => {
          setIsLoading(false)
          resolve({ status: false, data: 0 })
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
      setOpen(MESSAGES.transaction_processing_order)
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

  const createOrderBuyNaka = (nakaPrice: number, nakaAmount: number) =>
    new Promise((resolve) => {
      setIsLoading(true)
      const busdPriceWei = Helper.toWei(nakaPrice.toString())
      const busdAmountWei = Helper.toWei(nakaAmount.toString())
      p2pBinanceContract
        .createOrderBuyNaka(busdPriceWei, busdAmountWei)
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
    _totalAmount: number
  ) =>
    new Promise((resolve) => {
      setOpen(MESSAGES.transaction_processing_order)
      const sellAmount = utils.parseEther(_sellAmount.toString()).toString()
      const totalAmount = utils.parseEther(_totalAmount.toString()).toString()
      const price = utils.parseEther(_busdPrice.toString()).toString()
      sendRequestSellNakaP2p(
        _polygonOrderSellId,
        _seller,
        price,
        totalAmount,
        sellAmount
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
    })

  const getFee = () =>
    new Promise((resolve) => {
      setIsLoading(true)
      signer && signer?._provider?._network?.name.includes("bnb")
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
          }
        })
        .catch((err) => {
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

  // eslint-disable-next-line no-unused-vars
  const getAllowNaka = () => {
    checkAllowNaka().then((_response) => {
      if (_response) {
        setAllowNaka((_response as IResponseGetFee).data as boolean)
      }
    })
  }
  useEffect(() => {
    priceCurrentNaka()
    getFeeData()
    // getAllowNaka()
    return () => {
      setNakaCurrentPrice(undefined)
      setFee("00000000000000000")
      setAllowNaka(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signer])

  return {
    allowBinance,
    checkAllowNaka,
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
    allowNaka,
    editOrderSellNaka,
    sendRequestSellNaka
  }
}

export default useContractMultichain
