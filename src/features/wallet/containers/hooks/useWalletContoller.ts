import { useWeb3Provider } from "@providers/index"
import Helper from "@utils/helper"
import { useToast } from "@feature/toast/containers"
import useContractVault from "@feature/contract/containers/hooks/useContractVault"
import CONFIGS from "@configs/index"
import useLoadingStore from "@stores/loading"
import useGlobal from "@hooks/useGlobal"
import useContractVaultBinance, {
  ITokenContract
} from "@feature/contract/containers/hooks/useContractVaultBinance"
import useProfileStore from "@stores/profileStore"
import { useCallback, useEffect, useState } from "react"
import useQueryBalanceVault from "@feature/contract/containers/hooks/useQuery/useQueryBalanceVault"
import { getBEP20Contract } from "@feature/contract/containers/contractHelpers"
import { IErrorMessage } from "@interfaces/IErrorMessage"
import { CHAIN_SUPPORT, IChainList } from "@configs/chain"
import {
  useBEP20,
  useERC20
} from "@feature/contract/containers/hooks/useContract"
import { IMessage } from "@feature/multichain/interfaces/IMultichain"
import simpleRpcProvider, { bnbRpcProvider } from "@utils/web3"

export type Method = "deposit" | "withdraw"

const useWalletContoller = () => {
  // state
  const [tabChainList, setTabChainList] = useState<IChainList>(CHAIN_SUPPORT[0])
  const [isConnected, setIsConnected] = useState<boolean>(false)
  const [openWithDraw, setOpenWithDraw] = useState<boolean>(false)
  const [openDeposit, setOpenDeposit] = useState<boolean>(false)
  const [haveMetamask, sethaveMetamask] = useState(true)
  const [value, setValue] = useState<number>(0)
  const [disabled, setDisabled] = useState<boolean>(true)
  const [currentChainSelected, setCurrentChainSelected] =
    useState<ITokenContract>()

  // Hooks
  // checkAllowNaka
  const { allowNaka, depositNaka, withdrawNaka } = useContractVault()
  // eslint-disable-next-line no-unused-vars
  const { checkAllowToken, allowToken, depositToken, withdrawByToken } =
    useContractVaultBinance()
  const { toWei } = Helper
  const { setOpen, setClose } = useLoadingStore()
  const { profile } = useProfileStore()
  const { successToast, errorToast } = useToast()
  const { getTokenAddress, fetchAllTokenSupported, fetchNAKAToken } =
    useGlobal()
  const {
    address,
    handleConnectWithMetamask,
    chainId,
    signer,
    statusWalletConnected
  } = useWeb3Provider()

  const {
    refetchBalanceVaultBSC,
    refetchNakaBalanceVault,
    refetchBalanceWalletBSC,
    refetchNakaBalanceWallet
  } = useQueryBalanceVault(
    address || "",
    getTokenAddress(chainId as string) as string,
    isConnected
  )

  /**
   * @description Check metamask
   * @param _method
   */
  const handleOpen = (_method: Method, _chain: ITokenContract) => {
    if (address && profile) {
      if (_method === "deposit") setOpenDeposit(true)
      else if (_method === "withdraw") setOpenWithDraw(true)
    } else {
      errorToast("Please connect wallet")
    }
    setCurrentChainSelected(_chain)
  }

  /**
   * @description Reset all balances
   */
  const onResetBalance = () => {
    refetchBalanceVaultBSC()
    refetchBalanceWalletBSC()
    refetchNakaBalanceVault()
    refetchNakaBalanceWallet()
  }

  /**
   * @description When close modal
   * @param _method
   */
  const handleClose = (_method: Method) => {
    if (_method === "deposit") setOpenDeposit(false)
    else if (_method === "withdraw") setOpenWithDraw(false)
    setCurrentChainSelected({} as ITokenContract)
    setValue(0)
    onResetBalance()
  }

  /**
   * @description When connect wallet
   */
  const handleConnectWallet = () => {
    if (profile.data && handleConnectWithMetamask) {
      handleConnectWithMetamask()
    } else {
      errorToast("Please login first")
    }
  }

  /**
   * @description handle deposit and withdraw
   * @param _chainId
   * @param _address
   * @returns
   */
  const handleDepisitByChainId = async (
    _chainId: string,
    _tokenAddress: string
  ) => {
    if (_chainId === CONFIGS.CHAIN.CHAIN_ID_HEX_BNB) {
      const resultDepositToken = await depositToken(
        _tokenAddress,
        toWei(value.toString()),
        value.toString() // Ex.0.0001
      )
      return resultDepositToken
    }
    const resultDepositNaka = await depositNaka(toWei(value.toString()))
    return resultDepositNaka
  }

  /**
   * @description handle deposit and withdraw
   * @param _chainId
   * @param _tokenAddress
   * @returns
   */
  const handleWithdrawByChainId = async (
    _chainId: string,
    _tokenAddress: string
  ) => {
    if (_chainId === CONFIGS.CHAIN.CHAIN_ID_HEX_BNB) {
      const resultWithdrawByToken = await withdrawByToken(
        _tokenAddress,
        toWei(value.toString())
      )
      return resultWithdrawByToken
    }
    const resultWithdrawNaka = await withdrawNaka(toWei(value.toString()))
    return resultWithdrawNaka
  }
  const tokenBinanceContract = useBEP20(
    signer,
    (currentChainSelected?.tokenName === "bnbt"
      ? CONFIGS.CONTRACT_ADDRESS.BNB_CONTRACT
      : currentChainSelected?.address) ?? ""
  )

  const tokenNakaContract = useERC20(
    signer,
    currentChainSelected?.address ?? ""
  )

  /**
   * @description handle deposit and withdraw
   * @param _method
   * @returns
   */
  const handleWalletProcess = async (
    _method: Method,
    _tokenAddress: string
  ) => {
    const checkAllowBnb = tokenBinanceContract.allowance(
      address,
      CONFIGS.CONTRACT_ADDRESS.BALANCE_VAULT_BINANCE
    )

    const checkAllowNaka = tokenNakaContract.allowance(
      address,
      CONFIGS.CONTRACT_ADDRESS.BALANCE_VAULT
    )
    const approveToken =
      currentChainSelected?.tokenName === "bnbt"
        ? 1
        : (chainId === CONFIGS.CHAIN.CHAIN_ID_HEX_BNB
            ? await checkAllowBnb
            : await checkAllowNaka
          ).toString()

    if (!address && approveToken === "0") return
    try {
      /* Sample loading wait for loading popup design */
      setOpen("Blockchain transaction in progress...")

      const res =
        _method === "deposit"
          ? await handleDepisitByChainId(chainId as string, _tokenAddress)
          : await handleWithdrawByChainId(chainId as string, _tokenAddress)

      /* Wait for transaction data */
      const resData = await res.wait()
      if (resData) {
        setClose()
        successToast("Transaction success")
        handleClose(_method)
        if (chainId === CONFIGS.CHAIN.CHAIN_ID_HEX_BNB) {
          fetchAllTokenSupported()
        } else {
          fetchNAKAToken()
        }
      }
    } catch (error) {
      errorToast((error as IMessage).message)
      setClose()
      // if (approveToken !== "0") errorToast("Transaction failed")
    }
  }

  /**
   * @description handle check allowance
   * @param _method
   * @returns
   */
  const onSubmit = async (_method: Method) => {
    try {
      if (!address) {
        return
      }
      if (!currentChainSelected) {
        return
      }
      const checkAllowBnb = tokenBinanceContract.allowance(
        address,
        CONFIGS.CONTRACT_ADDRESS.BALANCE_VAULT_BINANCE
      )

      const checkAllowNaka = tokenNakaContract.allowance(
        address,
        CONFIGS.CONTRACT_ADDRESS.BALANCE_VAULT
      )
      if (chainId === CONFIGS.CHAIN.CHAIN_ID_HEX_BNB) {
        // FOR BSC
        const bep20Contract = getBEP20Contract(
          currentChainSelected.address,
          signer ?? chainId === CONFIGS.CHAIN.CHAIN_ID_HEX_BNB
            ? bnbRpcProvider
            : simpleRpcProvider
        )
        if (
          currentChainSelected.address !== CONFIGS.CONTRACT_ADDRESS.BNB_CONTRACT
        ) {
          // const _allowanceToken = await checkAllowToken(
          //   bep20Contract,
          //   CONFIGS.CONTRACT_ADDRESS.BALANCE_VAULT_BINANCE
          // )

          const allowanceToken = await checkAllowBnb

          if ((allowanceToken as string).toString() === "0") {
            allowToken(
              bep20Contract,
              // currentChainSelected.address, // spender
              currentChainSelected.totolSupply as string
            ).then(async (_res) => {
              await successToast(_res as string)
              if (_res) {
                await handleWalletProcess(_method, currentChainSelected.address)
              }
            })
          } else {
            await handleWalletProcess(_method, currentChainSelected.address)
          }
        } else {
          await handleWalletProcess(_method, currentChainSelected.address)
        }
      } else if (chainId === CONFIGS.CHAIN.CHAIN_ID_HEX) {
        // const erc20Contract = getERC20Contract(
        //   currentChainSelected.address,
        //   signer
        // )
        // FOR NAKA
        // const allowanceToken = await checkAllowToken(
        //   erc20Contract,
        //   CONFIGS.CONTRACT_ADDRESS.BALANCE_VAULT
        // )
        const allowanceToken = await checkAllowNaka

        if ((allowanceToken as string).toString() === "0") {
          allowNaka(currentChainSelected.totolSupply as string).then(
            async (_res) => {
              await successToast(_res as string)
              if (_res) {
                await handleWalletProcess(_method, currentChainSelected.address)
              }
            }
          )
        } else {
          handleWalletProcess(_method, currentChainSelected.address)
        }
      }
    } catch (error) {
      errorToast(error as string)
    }
  }

  /**
   * @description Handle click max value
   * @param _balance
   */
  const onClickMaxValue = (_balance: number) => {
    setValue(_balance - 0.00001)
  }

  const checkConnection = useCallback(async () => {
    const { ethereum }: any = window
    if (ethereum) {
      sethaveMetamask(haveMetamask)
      if (address && address.length > 0) {
        setIsConnected(true)
      }
    } else {
      sethaveMetamask(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /**
   * @description Check metamask
   */
  useEffect(() => {
    if (!(statusWalletConnected as IErrorMessage).responseStatus) return
    if (signer === undefined || address === undefined) return
    checkConnection()
  }, [address, haveMetamask, checkConnection, signer, statusWalletConnected])

  /**
   * @description Check Tab type
   */

  return {
    value,
    openWithDraw,
    openDeposit,
    disabled,
    currentChainSelected,
    setDisabled,
    setValue,
    setCurrentChainSelected,
    handleOpen,
    handleClose,
    onSubmit,
    handleConnectWallet,
    isConnected,
    onClickMaxValue,
    onResetBalance,
    checkConnection,
    tabChainList,
    setTabChainList
  }
}

export default useWalletContoller
