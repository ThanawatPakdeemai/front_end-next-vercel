import CONFIGS from "@configs/index"
import { ethers, BigNumber, Contract } from "ethers"
import {
  useERC20,
  useBalanceVault
} from "@feature/contract/containers/hooks/useContract"
import { useState } from "react"
import { useWeb3Provider } from "@providers/index"
import { ITransactionResponse } from "@interfaces/ITransaction"
import Helper from "@utils/helper"
import BalanceVaultAbi from "@configs/abi/BalanceVault.json"
import { DEFAULT_TOKEN_INFO } from "@constants/defaultValues"
import useProfileStore from "@stores/profileStore"
import { ITokenContract } from "./useContractVaultBinance"

const useContractVault = () => {
  const profile = useProfileStore((state) => state.profile.data)
  const { WeiToNumber } = Helper
  const { signer, address: account } = useWeb3Provider()
  const [isLoading, setIsLoading] = useState(false)
  const erc20Contract = useERC20(signer, CONFIGS.CONTRACT_ADDRESS.ERC20)
  const balanceVaultContract = useBalanceVault(
    signer,
    CONFIGS.CONTRACT_ADDRESS.BALANCE_VAULT
  )

  const checkAllowNaka = (_tokenAddress: string) =>
    new Promise((resolve, reject) => {
      setIsLoading(true)
      erc20Contract
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

  /** @param _spender is contract you want to approve */
  const allowNaka = (_amount: string) =>
    new Promise((resolve, reject) => {
      if (signer && account) {
        setIsLoading(true)
        erc20Contract
          .approve(CONFIGS.CONTRACT_ADDRESS.BALANCE_VAULT, _amount)
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

  const depositNaka = async (_nakaAmount: string | BigNumber) =>
    new Promise<ITransactionResponse>((resolve, reject) => {
      setIsLoading(true)
      balanceVaultContract
        .depositNaka(_nakaAmount)
        .then((response: ITransactionResponse) => {
          setIsLoading(false)
          resolve(response)
        })
        .catch((error: Error) => {
          setIsLoading(false)
          reject(error)
        })
    })

  const withdrawNaka = async (_nakaAmount: string | BigNumber) =>
    new Promise<ITransactionResponse>((resolve, reject) => {
      setIsLoading(true)
      balanceVaultContract
        .withdrawNaka(_nakaAmount)
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
        erc20Contract
          .allowance(account, CONFIGS.CONTRACT_ADDRESS.ERC20)
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
  const getNakaBalanceVault = (_userAddress: string) =>
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

  /* balance (in metamask) */
  const getNakaBalanceWallet = (_userAddress: string) =>
    new Promise((resolve) => {
      setIsLoading(true)
      erc20Contract
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
          resolve({ status: false, data: 0 })
        })
    })

  const getNAKATokenInfo = async (
    tokenContract: Contract,
    _tokenAddress: string,
    _userAddress: string
  ) =>
    // eslint-disable-next-line no-async-promise-executor
    new Promise<ITokenContract>(async (resolve) => {
      if (
        _userAddress.toLocaleLowerCase() !==
        profile?.address.toLocaleLowerCase()
      )
        return
      try {
        const { ethereum }: any = window
        const _provider = new ethers.providers.Web3Provider(ethereum)
        const _signer = _provider.getSigner()
        const _balanceVaultContract = new ethers.Contract(
          CONFIGS.CONTRACT_ADDRESS.BALANCE_VAULT,
          BalanceVaultAbi.abi,
          _signer
        )
        const vaultBalancePromise = await _balanceVaultContract.getBalance(
          _userAddress
        )
        const symbolPromise = await tokenContract.symbol()
        const totalSupplyPromise = await tokenContract.totalSupply()
        const namePromise = await tokenContract.name()
        const decimalsPromise = await tokenContract.decimals()
        const walletBalancePromise = await tokenContract.balanceOf(_userAddress)
        // tokenName
        const [tokenSymbol, totalSupply] = await Promise.all([
          symbolPromise,
          totalSupplyPromise,
          namePromise,
          decimalsPromise,
          walletBalancePromise
        ])

        // tokenName.toString() === "NK" ? "NAKA" : tokenName.toString()
        resolve({
          symbol: tokenSymbol.toString(),
          tokenName: "NAKA",
          totolSupply: totalSupply,
          decimals: decimalsPromise,
          address: _tokenAddress,
          balanceWallet: {
            digit: Number(Helper.WeiToNumber(walletBalancePromise).toFixed(4)),
            text: Helper.formatNumber(WeiToNumber(walletBalancePromise), {
              maximumFractionDigits: 1
            }),
            hex: walletBalancePromise
          },
          balanceVault: {
            digit: Number(Helper.WeiToNumber(vaultBalancePromise).toFixed(4)),
            text: Helper.formatNumber(WeiToNumber(vaultBalancePromise), {
              maximumFractionDigits: 1
            }),
            hex: vaultBalancePromise
          }
        })
      } catch (err) {
        resolve(DEFAULT_TOKEN_INFO)
      }
    })

  return {
    checkAllowNaka,
    allowNaka,
    depositNaka,
    withdrawNaka,
    checkSufficient,
    getNakaBalanceVault,
    getNakaBalanceWallet,
    isLoading,
    getNAKATokenInfo
  }
}

export default useContractVault
