import {
  useP2PBinance,
  useP2PPolygon
} from "@feature/contract/containers/hooks/useContract"
import { ethers } from "ethers"
import { BigNumberish } from "@ethersproject/bignumber"
import { useState } from "react"
import { useWeb3Provider } from "@providers/index"
import CONFIGS from "@configs/index"
import Helper from "@utils/helper"

const useContractMultichain = () => {
  const { signer, address: account } = useWeb3Provider()
  const [isLoading, setIsLoading] = useState(false)
  const p2pBinanceContract = useP2PBinance(
    signer,
    CONFIGS.CONTRACT_ADDRESS.P2P_BINANCE
  )
  const p2pPolygonContract = useP2PPolygon(
    signer,
    CONFIGS.CONTRACT_ADDRESS.P2P_POLYGON
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
      p2pBinanceContract
        .allowance(account, CONFIGS.CONTRACT_ADDRESS.P2P_BINANCE)
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

  const createOrderSellNaka = (busdPrice: number, busdAmount: number) =>
    new Promise((resolve) => {
      setIsLoading(true)
      const busdPriceWei = Helper.toWei(busdPrice.toString())
      const busdAmountWei = Helper.toWei(busdAmount.toString())
      p2pPolygonContract
        .createOrderSellNaka(busdPriceWei, busdAmountWei)
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

  const createOrderBuyNaka = (nakaPrice: number, nakaAmount: number) =>
    new Promise((resolve) => {
      setIsLoading(true)
      const nakaPriceWei = Helper.toWei(nakaPrice.toString())
      const nakaAmountWei = Helper.toWei(nakaAmount.toString())
      p2pBinanceContract
        .createOrderBuyNaka(nakaPriceWei, nakaAmountWei)
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

  return {
    allowBinance,
    checkAllowNaka,
    createOrderSellNaka,
    createOrderBuyNaka,
    sendRequestBuyNaka,
    isLoading,
    getFee,
    p2pPolygonContract,
    p2pBinanceContract
  }
}

export default useContractMultichain
