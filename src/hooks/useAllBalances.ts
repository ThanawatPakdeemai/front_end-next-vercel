import { useWeb3Provider } from "@providers/Web3Provider"
import CONFIGS from "@configs/index"
import Helper from "@utils/helper"
import useWalletContoller from "@feature/wallet/containers/hooks/useWalletContoller"
import useGetBalanceVault from "@feature/contract/containers/hooks/useQuery/useQueryBalanceVault"
import { useEffect, useState } from "react"
import { chainIdConfig } from "@configs/sites"
import useChainSupport from "@stores/chainSupport"
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
  const [balanceValutNaka, setbalanceValutNaka] = useState<IBalanceDisplay>()
  const [balanceValutBusd, setbalanceValutBusd] = useState<IBalanceDisplay>()
  const { isConnected } = useWalletContoller()
  const { chainSupport } = useChainSupport()
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
    let load = false

    if (window.ethereum === undefined) return
    if (!load) {
      if (signer?.provider?._network?.chainId === chainIdConfig.binance) {
        handleBalanceVaults(CONFIGS.CONTRACT_ADDRESS.BEP20)
      }
      if (signer?.provider?._network?.chainId === chainIdConfig.polygon) {
        handleBalanceVaults(CONFIGS.CONTRACT_ADDRESS.ERC20)
      }
    }

    return () => {
      load = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signer, chainId, isLoadingBalanceVaultBSC, isLoadingNakaBalanceVault])

  useEffect(() => {
    let load = false

    if (!load) {
      if (chainSupport) {
        chainSupport.forEach((_chain) => {
          if (_chain.symbol === "BUSD") {
            setbalanceValutBusd(_chain.balanceVault)
          } else if (_chain.symbol === "NAKA") {
            setbalanceValutNaka(_chain.balanceVault)
          }
        })
      }
    }

    return () => {
      load = true
    }
  }, [chainSupport, signer])

  return {
    handleBalanceWallet,
    handleBalanceVaults,
    walletBalance: handleBalanceWallet() as IBalanceDisplay,
    busdVaultBalance: handleBalanceVaults(CONFIGS.CONTRACT_ADDRESS.BEP20),
    nakaVaultBalance: handleBalanceVaults(CONFIGS.CONTRACT_ADDRESS.ERC20),
    balanceValutBusd,
    balanceValutNaka
  }
}

export default useAllBalances
