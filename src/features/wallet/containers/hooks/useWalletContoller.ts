import { useWeb3Provider } from "@providers/index"
import Helper from "@utils/helper"
import { useToast } from "@feature/toast/containers"
import useContractVault from "@feature/contract/containers/hooks/useContractVault"
import CONFIGS from "@configs/index"
import useLoadingStore from "@stores/loading"
import useGlobal from "@hooks/useGlobal"
import useContractVaultBinance from "@feature/contract/containers/hooks/useContractVaultBinance"
import useProfileStore from "@stores/profileStore"
import { useEffect, useState } from "react"
import useQueryBalanceVault from "@feature/contract/containers/hooks/useQuery/useQueryBalanceVault"

export type Method = "deposit" | "withdraw"
export type TokenSupport = "NAKA" | "BUSD"

const useWalletContoller = () => {
  // state
  const [type, setType] = useState<TokenSupport>("NAKA")
  const [isConnected, setIsConnected] = useState<boolean>(false)
  const [openWithDraw, setOpenWithDraw] = useState<boolean>(false)
  const [openDeposit, setOpenDeposit] = useState<boolean>(false)
  const [haveMetamask, sethaveMetamask] = useState(true)
  const [value, setValue] = useState<number>(0)
  const [disabled, setDisabled] = useState<boolean>(true)

  // Hooks
  const { checkAllowNaka, allowNaka, depositNaka, withdrawNaka } =
    useContractVault()
  const { checkAllowToken, allowToken, depositToken, withdrawByToken } =
    useContractVaultBinance()
  const { BNToNumber, toWei } = Helper
  const { setOpen, setClose } = useLoadingStore()
  const { profile } = useProfileStore()
  const { successToast, errorToast } = useToast()
  const { getNetwork, getTokenSupply, getTokenAddress } = useGlobal()
  const { address, handleConnectWithMetamask, chainId } = useWeb3Provider()

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
  const handleOpen = (_method: Method) => {
    if (address && profile) {
      if (_method === "deposit") setOpenDeposit(true)
      else if (_method === "withdraw") setOpenWithDraw(true)
    } else {
      errorToast("Please connect wallet")
    }
  }

  /**
   * @description When close modal
   * @param _method
   */
  const handleClose = (_method: Method) => {
    if (_method === "deposit") setOpenDeposit(false)
    else if (_method === "withdraw") setOpenWithDraw(false)
    setValue(0)
    refetchBalanceVaultBSC()
    refetchBalanceWalletBSC()
    refetchNakaBalanceVault()
    refetchNakaBalanceWallet()
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
  const handleDepisitByChainId = (_chainId: string, _tokenAddress: string) => {
    switch (_chainId) {
      case CONFIGS.CHAIN.CHAIN_ID_HEX_BNB:
        return depositToken(_tokenAddress, toWei(value.toString()))

      default:
        return depositNaka(toWei(value.toString()))
    }
  }

  /**
   * @description handle deposit and withdraw
   * @param _chainId
   * @param _tokenAddress
   * @returns
   */
  const handleWithdrawByChainId = (_chainId: string, _tokenAddress: string) => {
    switch (_chainId) {
      case CONFIGS.CHAIN.CHAIN_ID_HEX_BNB:
        return withdrawByToken(_tokenAddress, toWei(value.toString()))

      default:
        return withdrawNaka(toWei(value.toString()))
    }
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
  const onSubmit = async (_method: Method, _tokenAddress: string) => {
    try {
      if (!address) {
        return
      }
      const tokenSupply = getTokenSupply(chainId as string)
      const allowanceToken = await checkAllowToken(_tokenAddress)
      const allowance = await checkAllowNaka(_tokenAddress)

      switch (chainId) {
        case CONFIGS.CHAIN.CHAIN_ID_HEX_BNB:
          if ((allowanceToken as string).toString() === "0") {
            const allowResult = await allowToken(_tokenAddress, tokenSupply)
            successToast(allowResult as string)
          }
          handleWalletProcess(
            _method,
            getTokenAddress(chainId as string) as string
          )
          break

        default:
          if (BNToNumber(allowance as string) === 0) {
            const allowResult = await allowNaka()
            successToast(allowResult as string)
          }
          handleWalletProcess(_method, tokenSupply)
          break
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
      setType("BUSD")
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
    setDisabled,
    setType,
    setValue,
    getNetwork,
    handleOpen,
    handleClose,
    onSubmit,
    handleConnectWallet,
    isConnected,
    onClickMaxValue
  }
}

export default useWalletContoller
