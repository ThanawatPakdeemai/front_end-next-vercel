import CONFIGS from "@configs/index"
import { ethers, BigNumber, Contract } from "ethers"
import {
  useBalanceVaultBinance,
  useBEP20
} from "@feature/contract/containers/hooks/useContract"
import { useState } from "react"
import { useWeb3Provider } from "@providers/index"
import { ITransactionResponse } from "@interfaces/ITransaction"
import { IBalance } from "@interfaces/IHelper"
import BinanceBalanceVaultAbi from "@configs/abi/BinanceBalanceVault.json"
import Helper from "@utils/helper"
import { IBalanceDisplay } from "@hooks/useAllBalances"
import { useToast } from "@feature/toast/containers"
import { getBalanceVaultBinanceContract } from "../contractHelpers"

export interface ITokenContract {
  symbol: string
  tokenName: string
  address: string | ""
  balanceWallet: IBalanceDisplay
  balanceVault: IBalanceDisplay
  totolSupply?: string
  decimals?: number
}

export const DEFAULT_TOKEN_INFO: ITokenContract = {
  symbol: "",
  tokenName: "",
  address: "",
  balanceWallet: {
    digit: 0,
    text: ""
  },
  balanceVault: {
    digit: 0,
    text: ""
  }
}

const useContractVaultBinance = () => {
  const { signer, address: account } = useWeb3Provider()
  const [isLoading, setIsLoading] = useState(false)
  const { errorToast } = useToast()
  const bep20Contract = useBEP20(signer, CONFIGS.CONTRACT_ADDRESS.BEP20)
  const balanceVaultContract = useBalanceVaultBinance(
    signer,
    CONFIGS.CONTRACT_ADDRESS.BALANCE_VAULT_BINANCE
  )
  const { WeiToNumber } = Helper

  const checkAllowToken = (_contract: Contract, _tokenAddress: string) =>
    new Promise((resolve, reject) => {
      setIsLoading(true)
      _contract
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

  const allowToken = (_contract: Contract, _amount: string) =>
    // eslint-disable-next-line no-async-promise-executor
    new Promise((resolve, reject) => {
      if (signer && account) {
        setIsLoading(true)
        _contract
          .approve(CONFIGS.CONTRACT_ADDRESS.BALANCE_VAULT_BINANCE, _amount)
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
    _amount: string | BigNumber,
    _amountUnit: string // "0.0004"
  ) =>
    // eslint-disable-next-line no-async-promise-executor
    new Promise<ITransactionResponse>(async (resolve, reject) => {
      setIsLoading(true)
      if (_tokenAddress === CONFIGS.CONTRACT_ADDRESS.BNB_CONTRACT) {
        balanceVaultContract
          .depositToken(CONFIGS.CONTRACT_ADDRESS.BNB_CONTRACT, "0", {
            value: ethers.utils.parseUnits(_amountUnit)
          })
          .then((response: ITransactionResponse) => {
            setIsLoading(false)
            resolve(response)
          })
          .catch((error: Error) => {
            setIsLoading(false)
            reject(error)
          })
      } else {
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
      }
    })

  const withdrawByToken = async (
    _tokenAddress: string,
    _amount: string | BigNumber
  ) =>
    new Promise<ITransactionResponse>((resolve, reject) => {
      setIsLoading(true)
      balanceVaultContract
        .withdraw(_tokenAddress, _amount)
        .then((response: ITransactionResponse) => {
          setIsLoading(false)
          resolve(response)
        })
        .catch((error: Error) => {
          setIsLoading(false)
          reject(error)
        })
    })

  /* balanceValut */
  const getBalanceVaultBSC = (_userAddress: string, _tokenAddress: string) =>
    new Promise<IBalance>((resolve) => {
      setIsLoading(true)
      if (_userAddress && _tokenAddress) {
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
            errorToast(_error.message)
            setIsLoading(false)
            resolve({ status: false, data: ethers.BigNumber.from(0) })
          })
      }
    })

  /* balance (in metamask) */
  const getBalanceWalletBSC = (_userAddress: string) =>
    new Promise<IBalance>((resolve) => {
      if (_userAddress) {
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
      }
    })

  /**
   * @description - Get all token info by contract address
   */
  const getAllTokenInfoByContractAddress = async (
    tokenContract: Contract,
    _tokenAddress: string,
    _userAddress: string
  ) =>
    // eslint-disable-next-line no-async-promise-executor
    new Promise<ITokenContract>(async (resolve) => {
      try {
        const { ethereum }: any = window
        const _provider = new ethers.providers.Web3Provider(ethereum)
        const _signer = _provider.getSigner()
        const _network = await _provider.getNetwork()
        const _balance = await _signer.getBalance()
        // const _address = await _signer.getAddress()
        const _balanceVaultContract = new ethers.Contract(
          CONFIGS.CONTRACT_ADDRESS.BALANCE_VAULT_BINANCE,
          BinanceBalanceVaultAbi.abi,
          _signer
        )
        const vaultBalancePromise = await _balanceVaultContract.getBalanceOf(
          _userAddress,
          _tokenAddress
        )
        if (_tokenAddress === CONFIGS.CONTRACT_ADDRESS.BNB_CONTRACT) {
          resolve({
            symbol: _network.name.toLocaleUpperCase() || "BNB",
            tokenName: _network.name || "BNB",
            address: _tokenAddress,
            balanceWallet: {
              digit: _balance
                ? Number(ethers.utils.formatEther(_balance as BigNumber))
                : 0,
              text: _balance
                ? ethers.utils.formatEther(_balance as BigNumber).toString()
                : "0"
            },
            balanceVault: {
              digit: Number(Helper.WeiToNumber(vaultBalancePromise).toFixed(4)),
              text: ethers.utils.formatEther(vaultBalancePromise)
            }
          })
        } else {
          const symbolPromise = await tokenContract.symbol()
          const totalSupplyPromise = await tokenContract.totalSupply()
          const namePromise = await tokenContract.name()
          const decimalsPromise = await tokenContract.decimals()
          const walletBalancePromise = await tokenContract.balanceOf(
            _userAddress
          )
          const [tokenSymbol, totalSupply, tokenName] = await Promise.all([
            symbolPromise,
            totalSupplyPromise,
            namePromise,
            decimalsPromise,
            walletBalancePromise
          ])

          resolve({
            symbol: tokenSymbol.toString().toLocaleUpperCase(),
            tokenName: tokenName.toString(),
            totolSupply: totalSupply,
            decimals: decimalsPromise,
            address: _tokenAddress,
            balanceWallet: {
              digit: Number(
                Helper.WeiToNumber(walletBalancePromise).toFixed(4)
              ),
              text: Helper.formatNumber(WeiToNumber(walletBalancePromise), {
                maximumFractionDigits: 1
              })
            },
            balanceVault: {
              digit: Number(Helper.WeiToNumber(vaultBalancePromise).toFixed(4)),
              text: ethers.utils.formatEther(vaultBalancePromise)
              // text: Helper.formatNumber(WeiToNumber(vaultBalancePromise), {
              //   maximumFractionDigits: 1
              // })
            }
          })
        }
      } catch (err) {
        resolve(DEFAULT_TOKEN_INFO)
      }
    })

  /**
   * @description Get all token address in contract
   * @returns {string[]}
   */
  const getAllTokenAddressInContract = async (): Promise<string[]> => {
    try {
      const { ethereum }: any = window
      const _web3 = new ethers.providers.Web3Provider(ethereum)
      const contract = getBalanceVaultBinanceContract(
        CONFIGS.CONTRACT_ADDRESS.BALANCE_VAULT_BINANCE,
        _web3
      )
      setIsLoading(true)
      const response: string[] = await contract.getAllTokenAddressInContract()
      setIsLoading(false)
      return response
    } catch (error: any) {
      setIsLoading(false)
      return []
    }
  }

  /**
   * @description Get BNB contract
   * @returns {string}
   */
  const getBNBContract = async (): Promise<string> => {
    try {
      const { ethereum }: any = window
      const _web3 = new ethers.providers.Web3Provider(ethereum)
      const contract = getBalanceVaultBinanceContract(
        CONFIGS.CONTRACT_ADDRESS.BALANCE_VAULT_BINANCE,
        _web3
      )
      setIsLoading(true)
      const response: string = await contract.BNB()
      setIsLoading(false)
      return response
    } catch (error: any) {
      setIsLoading(false)
      return ""
    }
  }

  return {
    checkAllowToken,
    allowToken,
    depositToken,
    withdrawByToken,
    getBalanceVaultBSC,
    getBalanceWalletBSC,
    isLoading,
    getAllTokenAddressInContract,
    getBNBContract,
    getAllTokenInfoByContractAddress
  }
}

export default useContractVaultBinance
