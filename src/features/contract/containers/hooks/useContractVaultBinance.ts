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
import useLoadingStore from "@stores/loading"
import { MESSAGES } from "@constants/messages"
import { DEFAULT_TOKEN_INFO } from "@constants/defaultValues"
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

const useContractVaultBinance = () => {
  const { signer, address: account } = useWeb3Provider()
  const [isLoading, setIsLoading] = useState(false)
  const bep20Contract = useBEP20(
    signer,
    CONFIGS.CONTRACT_ADDRESS && (CONFIGS.CONTRACT_ADDRESS.BEP20 as string)
  )
  const balanceVaultContract = useBalanceVaultBinance(
    signer,
    CONFIGS.CONTRACT_ADDRESS.BALANCE_VAULT_BINANCE
  )
  const { WeiToNumber } = Helper
  const { setOpen, setClose } = useLoadingStore()

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
    new Promise((resolve, reject) => {
      if (signer && account) {
        setOpen(MESSAGES.approve_processing)
        setIsLoading(true)
        _contract
          .approve(CONFIGS.CONTRACT_ADDRESS.BALANCE_VAULT_BINANCE, _amount)
          .then(async (_res) => {
            setIsLoading(false)
            const resData = await _res.wait()
            if (resData) {
              resolve("Contract Approved!")
            }
            setClose()
          })
          .catch(() => {
            setIsLoading(false)
            const errMsg =
              "Please try again, Confirm the transaction and make sure you are paying enough gas!"
            reject(errMsg)
            setClose()
          })
      } else {
        reject()
        setClose()
      }
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

        // TODO: Open after binance smart chain is ready
        /* const _balanceVaultContract = new ethers.Contract(
          CONFIGS.CONTRACT_ADDRESS.BALANCE_VAULT_BINANCE,
          BinanceBalanceVaultAbi.abi,
          _signer
        )
        const vaultBalancePromise = await _balanceVaultContract.getBalanceOf(
          _userAddress,
          _tokenAddress
        ) */
        // TODO: Delete this after binance smart chain is ready
        const _balanceVaultTemporary =
          process.env.NEXT_PUBLIC_MODE === "development"
            ? new ethers.Contract(
                CONFIGS.CONTRACT_ADDRESS.BALANCE_VAULT_BINANCE,
                BinanceBalanceVaultAbi.abi,
                _signer
              )
            : null

        if (_tokenAddress === CONFIGS.CONTRACT_ADDRESS.BNB_CONTRACT) {
          const vaultBalancePromise =
            process.env.NEXT_PUBLIC_MODE === "development" &&
            _balanceVaultTemporary
              ? await _balanceVaultTemporary.getBalanceOf(
                  _userAddress,
                  _tokenAddress
                )
              : ethers.BigNumber.from(0)

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
                : "0",
              hex: _balance
            },
            balanceVault: {
              digit: Number(Helper.WeiToNumber(vaultBalancePromise).toFixed(4)),
              text: ethers.utils.formatEther(vaultBalancePromise),
              hex: vaultBalancePromise
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
          // TODO: Delete this after binance smart chain is ready
          const vaultBalancePromise =
            process.env.NEXT_PUBLIC_MODE === "development" &&
            _balanceVaultTemporary
              ? await _balanceVaultTemporary.getBalanceOf(
                  _userAddress,
                  _tokenAddress
                )
              : walletBalancePromise
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
              }),
              hex: walletBalancePromise
            },
            balanceVault: {
              digit: Number(Helper.WeiToNumber(vaultBalancePromise).toFixed(4)),
              text: ethers.utils.formatEther(vaultBalancePromise),
              hex: vaultBalancePromise
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
