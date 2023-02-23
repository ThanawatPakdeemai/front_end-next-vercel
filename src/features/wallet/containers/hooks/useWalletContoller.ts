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
import { useEffect, useState } from "react"
import useQueryBalanceVault from "@feature/contract/containers/hooks/useQuery/useQueryBalanceVault"
import { getBEP20Contract } from "@feature/contract/containers/contractHelpers"

export type Method = "deposit" | "withdraw"
export type TokenSupport = "NAKA" | "BNB"

const useWalletContoller = () => {
  // state
  const [type, setType] = useState<TokenSupport>("NAKA")
  const [isConnected, setIsConnected] = useState<boolean>(false)
  const [openWithDraw, setOpenWithDraw] = useState<boolean>(false)
  const [openDeposit, setOpenDeposit] = useState<boolean>(false)
  const [haveMetamask, sethaveMetamask] = useState(true)
  const [value, setValue] = useState<number>(0)
  const [disabled, setDisabled] = useState<boolean>(true)
  const [currentChainSelected, setCurrentChainSelected] =
    useState<ITokenContract>()

  // Hooks
  const { checkAllowNaka, allowNaka, depositNaka, withdrawNaka } =
    useContractVault()
  const { checkAllowToken, allowToken, depositToken, withdrawByToken } =
    useContractVaultBinance()
  const { BNToNumber, toWei } = Helper
  const { setOpen, setClose } = useLoadingStore()
  const { profile } = useProfileStore()
  const { successToast, errorToast } = useToast()
  const { getTokenAddress, fetchAllTokenSupported } = useGlobal()
  const { address, handleConnectWithMetamask, chainId, signer } =
    useWeb3Provider()

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

  /**
   * @description handle deposit and withdraw
   * @param _method
   * @returns
   */
  const handleWalletProcess = async (
    _method: Method,
    _tokenAddress: string
  ) => {
    if (!address) return
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
        fetchAllTokenSupported()
      }
    } catch (error) {
      setClose()
      errorToast("Transaction failed")
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
      if (chainId === CONFIGS.CHAIN.CHAIN_ID_HEX_BNB) {
        // FOR BSC
        const bep20Contract = getBEP20Contract(
          currentChainSelected.address,
          signer
        )
        if (
          currentChainSelected.address !== CONFIGS.CONTRACT_ADDRESS.BNB_CONTRACT
        ) {
          const allowanceToken = await checkAllowToken(
            bep20Contract,
            CONFIGS.CONTRACT_ADDRESS.BALANCE_VAULT_BINANCE
          )
          if ((allowanceToken as string).toString() === "0") {
            const allowResult = await allowToken(
              bep20Contract,
              currentChainSelected.address, // spender
              currentChainSelected.totolSupply as string
            )
            successToast(allowResult as string)
          }
        }
        handleWalletProcess(_method, currentChainSelected.address)
      } else {
        // FOR NAKA
        const allowance = await checkAllowNaka(currentChainSelected.address)
        if (BNToNumber(allowance as string) === 0) {
          const allowResult = await allowNaka(_tokenAddress)
          successToast(allowResult as string)
        }
        handleWalletProcess(_method, currentChainSelected.address)
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

  /**
   * @description Check metamask
   */
  useEffect(() => {
    const checkConnection = async () => {
      const { ethereum }: any = window
      if (ethereum) {
        sethaveMetamask(haveMetamask)
        if (address && address.length > 0) {
          setIsConnected(true)
        }
      } else {
        sethaveMetamask(false)
      }
    }
    checkConnection()
  }, [address, haveMetamask])

  /**
   * @description Check Tab type
   */
  useEffect(() => {
    if (chainId && chainId === CONFIGS.CHAIN.CHAIN_ID_HEX_BNB) {
      setType("BNB")
    } else {
      setType("NAKA")
    }
  }, [chainId])

  return {
    type,
    value,
    openWithDraw,
    openDeposit,
    disabled,
    currentChainSelected,
    setDisabled,
    setType,
    setValue,
    setCurrentChainSelected,
    handleOpen,
    handleClose,
    onSubmit,
    handleConnectWallet,
    isConnected,
    onClickMaxValue,
    onResetBalance
  }
}

export default useWalletContoller
