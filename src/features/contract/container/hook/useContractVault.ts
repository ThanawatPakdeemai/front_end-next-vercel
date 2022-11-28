import CONFIGS from "@configs/index"
import { ethers, BigNumber } from "ethers"
import {
  useERC20,
  useBalanceVault
} from "@features/contract/container/hook/useContract"
import { useState } from "react"
import { useWeb3Provider } from "@providers/index"
import { ITransactionResponse } from "@interfaces/ITransaction"

const useContractVault = () => {
  const { signer, address: account } = useWeb3Provider()
  const [isLoading, setIsLoading] = useState(false)
  const erc20Contract = useERC20(signer, CONFIGS.CONTRACT_ADDRESS.ERC20)
  const balanceVaultContract = useBalanceVault(
    signer,
    CONFIGS.CONTRACT_ADDRESS.BALANCE_VAULT
  )

  const checkAllowNaka = async (_address: string) =>
    new Promise((resolve, reject) => {
      setIsLoading(true)
      erc20Contract.methods
        .allowance(account, _address)
        .then((_response: string) => {
          setIsLoading(false)
          resolve(_response)
        })
        .catch((_error: Error) => {
          setIsLoading(false)
          reject(_error)
        })
    })

  const allowNaka = () =>
    new Promise((resolve, reject) => {
      if (signer && account) {
        setIsLoading(true)
        erc20Contract
          .approve(CONFIGS.CONTRACT_ADDRESS.ERC20, ethers.constants.MaxUint256)
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
      }
    })

  const depositNaka = async (_address: string, _nakaAmount: string) =>
    new Promise<ITransactionResponse>((resolve, reject) => {
      setIsLoading(true)
      balanceVaultContract.methods
        .depositNaka(_nakaAmount)
        .send({
          from: _address
        })
        .then((response: ITransactionResponse) => {
          setIsLoading(false)
          resolve(response)
        })
        .catch((error: Error) => {
          setIsLoading(false)
          reject(error)
        })
    })

  const withdrawNaka = async (_address: string, _nakaAmount: string) =>
    new Promise<ITransactionResponse>((resolve, reject) => {
      setIsLoading(true)
      balanceVaultContract.methods
        .withdrawNaka(_nakaAmount)
        .send({
          from: _address
        })
        .then((response: ITransactionResponse) => {
          setIsLoading(false)
          resolve(response)
        })
        .catch((error: Error) => {
          setIsLoading(false)
          reject(error)
        })
    })

  const checkSufficient = async (bet: BigNumber, address: string) =>
    new Promise<Boolean>((resolve, reject) => {
      try {
        setIsLoading(true)
        erc20Contract.allowance(account, address).then((response: string) => {
          const currentAllowance = BigNumber.from(response)

          const valueBetString = BigNumber.from(bet).toString()
          const toCheck = BigNumber.from(valueBetString)
          const _gt = currentAllowance.gte(toCheck)

          setIsLoading(false)
          resolve(_gt)
        })
      } catch (error) {
        if (error instanceof Error) {
          setIsLoading(false)
          reject(error)
        }
      }
    })

  const getNakaBalanceOf = (_userAddress: string) =>
    new Promise((resolve) => {
      setIsLoading(true)
      balanceVaultContract
        .getBalance(_userAddress)
        .then((response: BigNumber) => {
          setIsLoading(false)
          resolve({
            status: true,
            data: response
          })
        })
        .catch((_error: Error) => {
          setIsLoading(false)
          resolve({ status: false, data: 0 })
        })
    })

  return {
    checkAllowNaka,
    allowNaka,
    depositNaka,
    withdrawNaka,
    checkSufficient,
    getNakaBalanceOf,
    isLoading
  }
}

export default useContractVault
