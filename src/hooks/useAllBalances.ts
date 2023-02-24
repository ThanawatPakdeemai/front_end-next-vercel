import { useWeb3Provider } from "@providers/Web3Provider"
import CONFIGS from "@configs/index"
import Helper from "@utils/helper"
import useWalletContoller from "@feature/wallet/containers/hooks/useWalletContoller"
import useGetBalanceVault from "@feature/contract/containers/hooks/useQuery/useQueryBalanceVault"
import { useEffect } from "react"
import useGlobal from "./useGlobal"

export interface IBalanceDisplay {
  digit: number
  text: string | "N/A"
}

export const defaultVaule: IBalanceDisplay = {
  digit: 0,
  text: "N/A"
}

const useAllBalances = () => {
  const { address, chainId, signer } = useWeb3Provider()
  const { getTokenAddress } = useGlobal()
  const { isConnected } = useWalletContoller()
  const {
    balanceVaultBSC,
    balanceVaultNaka,
    balanceWalletBSC,
    balanceWalletNaka,
    isLoadingNakaBalanceVault,
    isLoadingBalanceVaultBSC,
    isLoadingBalanceWalletBSC,
    isLoadingNakaBalanceWallet
  } = useGetBalanceVault(
    address || "",
    getTokenAddress(chainId as string) as string,
    isConnected
  )
  const { WeiToNumber } = Helper

  /**
   * @description Get wallet balance
   */
  const handleBalanceWallet = () => {
    switch (chainId) {
      case CONFIGS.CHAIN.CHAIN_ID_HEX_BNB:
        if (
          balanceWalletBSC &&
          balanceWalletBSC.data &&
          !isLoadingBalanceWalletBSC
        ) {
          return {
            digit: WeiToNumber(balanceWalletBSC.data),
            text: Helper.formatNumber(WeiToNumber(balanceWalletBSC.data), {
              maximumFractionDigits: 1
            })
          }
        }
        return defaultVaule

      default:
        if (
          balanceWalletNaka &&
          balanceWalletNaka.data &&
          !isLoadingNakaBalanceWallet
        ) {
          return {
            digit: WeiToNumber(balanceWalletNaka.data),
            text: Helper.formatNumber(WeiToNumber(balanceWalletNaka.data), {
              maximumFractionDigits: 1
            })
          }
        }
        return defaultVaule
    }
  }

  const handleBalanceVaults = (_tokenAddress: string) => {
    switch (_tokenAddress) {
      case CONFIGS.CONTRACT_ADDRESS.BEP20:
        if (
          balanceVaultBSC &&
          balanceVaultBSC.data &&
          !isLoadingBalanceVaultBSC
        ) {
          return {
            digit: WeiToNumber(balanceVaultBSC.data),
            text: Helper.formatNumber(WeiToNumber(balanceVaultBSC.data), {
              maximumFractionDigits: 1
            })
          }
        }
        return defaultVaule

      default:
        if (
          balanceVaultNaka &&
          balanceVaultNaka.data &&
          !isLoadingNakaBalanceVault
        ) {
          const balanceVaultDigit = WeiToNumber(balanceVaultNaka.data)
          return {
            digit: balanceVaultDigit,
            text: Helper.formatNumber(balanceVaultDigit, {
              maximumFractionDigits: 1
            })
          }
        }
        return defaultVaule
    }
  }

  useEffect(() => {
    handleBalanceVaults(CONFIGS.CONTRACT_ADDRESS.BEP20)
    handleBalanceVaults(CONFIGS.CONTRACT_ADDRESS.ERC20)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signer, address])

  return {
    handleBalanceWallet,
    handleBalanceVaults,
    walletBalance: handleBalanceWallet() as IBalanceDisplay,
    busdVaultBalance: handleBalanceVaults(CONFIGS.CONTRACT_ADDRESS.BEP20),
    nakaVaultBalance: handleBalanceVaults(CONFIGS.CONTRACT_ADDRESS.ERC20)
  }
}

export default useAllBalances
