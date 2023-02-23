import {
  useP2PBinance,
  useP2PPolygon,
  useERC20
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
import {
  IResponseGetFee,
  IResponseTransaction
} from "@feature/contract/interfaces/IMultichainHook"
import { MESSAGES } from "@constants/messages"
import { parseUnits } from "ethers/lib/utils"

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

  const tokenBinanceContract = useERC20(signer, CONFIGS.CONTRACT_ADDRESS.BEP20)

  const tokenPlygonContract = useERC20(signer, CONFIGS.CONTRACT_ADDRESS.ERC20)

  const [isLoading, setIsLoading] = useState(false)
  const [nakaCurrentPrice, setNakaCurrentPrice] = useState<ICurrentNakaData>()
  const [fee, setFee] = useState("00000000000000000")
  // const [allowNaka, setAllowNaka] = useState(false)
  const [allowBinance, setAllowBinance] = useState(false)

  const allowNaka = tokenPlygonContract.allowance(
    account,
    CONFIGS.CONTRACT_ADDRESS.P2P_POLYGON
  )
  // const getAllowanceNaka = () =>
  //   new Promise((resolve, reject) => {
  //     if (signer && account) {
  //       tokenPlygonContract
  //         // .allowance(
  //         //   "0x1BFa565383EBb149E6889F99013d1C88da190915",
  //         //   "0xE913c7C2D9bBBd3afA77e45fcB0dA064c96DB6A4"
  //         // )
  //         .allowance(account, CONFIGS.CONTRACT_ADDRESS.P2P_POLYGON)
  //         .then((_token) => {
  //           if (_token && _token.toString() > 0) {
  //             setAllowNaka(true)
  //             resolve(true)
  //           } else {
  //             setAllowNaka(false)
  //             resolve(false)
  //           }
  //         })
  //         .catch(() => {
  //           setAllowNaka(false)
  //         })
  //     } else reject()
  //   })

  // eslint-disable-next-line no-unused-vars
  const getAllowanceBinance = () =>
    new Promise((resolve, reject) => {
      if (signer && account) {
        tokenBinanceContract
          .allowance(account, CONFIGS.CONTRACT_ADDRESS.P2P_BINANCE)
          .then((_token) => {
            if (_token && _token.toString() > 0) {
              setAllowBinance(true)
              resolve(true)
            } else {
              setAllowBinance(false)
              resolve(false)
            }
          })
          .catch(() => {
            setAllowBinance(false)
          })
      } else reject()
    })

  // useEffect(() => {
  //   getAllowanceBinance()
  //   return () => {
  //     setAllowBinance(false)
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [account, tokenPlygonContract, tokenBinanceContract])

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

  const sendAllowBinance = (_address: string) =>
    new Promise((resolve, reject) => {
      if (signer && account) {
        setIsLoading(true)
        tokenBinanceContract
          .approve(
            CONFIGS.CONTRACT_ADDRESS.P2P_BINANCE,
            ethers.constants.MaxUint256
          )
          .send({
            from: _address
          })
          .then((_response) => {
            setIsLoading(false)
            if (_response && Number(_response.toString()) > 0) {
              setAllowBinance(true)
              resolve(true)
            } else {
              setAllowBinance(false)
              resolve(false)
            }
          })
          .catch(() => {
            setIsLoading(false)
            setAllowBinance(false)
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
    // p2pPolygonContract
    //   .connect(signer)
    //   .fee()
    //   .then(async (_fee) => {
    //     setFee(await fee.toString())
    //   })
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
    sendRequestSellNaka
  }
}

export default useContractMultichain
