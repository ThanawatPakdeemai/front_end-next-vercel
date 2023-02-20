import CONFIGS from "@configs/index"
import { ethers, BigNumber } from "ethers"
import {
  useBalanceVaultBinance,
  useBEP20
} from "@feature/contract/containers/hooks/useContract"
import { useState } from "react"
import { useWeb3Provider } from "@providers/index"
import { ITransactionResponse } from "@interfaces/ITransaction"
import { IBalance } from "@interfaces/IHelper"

const useContractVaultBinance = () => {
  const { signer, address: account } = useWeb3Provider()
  const [isLoading, setIsLoading] = useState(false)
  const bep20Contract = useBEP20(signer, CONFIGS.CONTRACT_ADDRESS.BEP20)
  const balanceVaultContract = useBalanceVaultBinance(
    signer,
    CONFIGS.CONTRACT_ADDRESS.BALANCE_VAULT_BINANCE
  )

  const checkAllowToken = (_tokenAddress: string) =>
    new Promise((resolve, reject) => {
      setIsLoading(true)
      bep20Contract
        .allowance(account, _tokenAddress)
        .then((_response: string) => {
          setIsLoading(false)
          resolve(_response)
        })
        .catch((_error: Error) => {
          setIsLoading(false)
          reject(_error)
        })
    })

  const allowToken = (_spender: string, _amount: string) =>
    new Promise((resolve, reject) => {
      if (signer && account) {
        setIsLoading(true)
        bep20Contract
          .approve(_spender, _amount)
          .then((_res) => {
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

  const depositToken = async (
    _tokenAddress: string,
    _amount: string | BigNumber
  ) =>
    new Promise<ITransactionResponse>((resolve, reject) => {
      setIsLoading(true)
      balanceVaultContract
        .depositToken(_tokenAddress, _amount)
        .then((response: ITransactionResponse) => {
          setIsLoading(false)
          resolve(response)
        })
        .catch((error: Error) => {
          setIsLoading(false)
          reject(error)
        })
    })

  const withdrawByToken = async (
    _tokenAddress: string,
    _amount: string | BigNumber
  ) =>
    new Promise<ITransactionResponse>((resolve, reject) => {
      setIsLoading(true)
      balanceVaultContract
        .withdrawByToken(_tokenAddress, _amount)
        .then((response: ITransactionResponse) => {
          setIsLoading(false)
          resolve(response)
        })
        .catch((error: Error) => {
          setIsLoading(false)
          reject(error)
        })
    })

  const checkSufficient = async (_bet: BigNumber) =>
    new Promise<Boolean>((resolve, reject) => {
      try {
        setIsLoading(true)
        bep20Contract
          .allowance(account, CONFIGS.CONTRACT_ADDRESS.BEP20)
          .then((response: string) => {
            const currentAllowance = BigNumber.from(response)
            const valueBetString = BigNumber.from(_bet).toString()
            const toCheck = BigNumber.from(valueBetString)
            const _gt = currentAllowance.gte(toCheck)

            setIsLoading(false)
            resolve(_gt)
          })
      } catch (error) {
        if (error instanceof Error) {
          setIsLoading(false)
          reject(error)
        } else reject()
      }
    })

  /* balanceValut */
  const getBalanceVaultBSC = (_userAddress: string, _tokenAddress: string) =>
    new Promise<IBalance>((resolve) => {
      setIsLoading(true)
      balanceVaultContract
        .getBalanceOf(_userAddress, _tokenAddress)
        .then((response: BigNumber) => {
          setIsLoading(false)
          resolve({
            status: true,
            data: response
          })
        })
        .catch((_error: Error) => {
          setIsLoading(false)
          resolve({ status: false, data: ethers.BigNumber.from(0) })
        })
    })

  /* balance (in metamask) */
  const getBalanceWalletBSC = (_userAddress: string) =>
    new Promise<IBalance>((resolve) => {
      setIsLoading(true)
      bep20Contract
        .balanceOf(_userAddress)
        .then((response: BigNumber) => {
          setIsLoading(false)
          resolve({
            status: true,
            data: response
          })
        })
        .catch((_error: Error) => {
          setIsLoading(false)
          resolve({ status: false, data: ethers.BigNumber.from(0) })
        })
    })

  const getAllTokenAddressInContract = () =>
    new Promise<string[]>((resolve) => {
      setIsLoading(true)
      bep20Contract
        .getAllTokenAddressInContract()
        .then((response: string[]) => {
          setIsLoading(false)
          resolve(response)
        })
        .catch((_error: Error) => {
          setIsLoading(false)
          resolve([])
        })
    })

  return {
    checkAllowToken,
    allowToken,
    depositToken,
    withdrawByToken,
    checkSufficient,
    getBalanceVaultBSC,
    getBalanceWalletBSC,
    isLoading,
    getAllTokenAddressInContract
  }
}

export default useContractVaultBinance
