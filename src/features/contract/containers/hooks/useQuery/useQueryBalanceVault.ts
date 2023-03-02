import { useQuery } from "@tanstack/react-query"
import { BigNumberish } from "ethers"
import useContractVault from "../useContractVault"
import useContractVaultBinance from "../useContractVaultBinance"

interface INakaBalance {
  status: boolean
  data: BigNumberish
}

const useQueryBalanceVault = (
  _address?: string,
  _tokenAddress?: string,
  isConnectedWallet?: boolean
) => {
  const { getNakaBalanceVault, getNakaBalanceWallet } = useContractVault()
  const { getBalanceVaultBSC, getBalanceWalletBSC } = useContractVaultBinance()

  const {
    data: nakaBalanceVault,
    refetch: refetchNakaBalanceVault,
    isFetching: isFetchingNakaBalanceVault,
    isLoading: isLoadingNakaBalanceVault,
    isError: isErrorNakaBalanceVault
  } = useQuery({
    queryKey: ["getNakaBalanceVault", _address],
    queryFn: () => getNakaBalanceVault(_address || ""),
    enabled: _address !== "" && isConnectedWallet,
    staleTime: Infinity
  })

  const {
    data: nakaBalanceWallet,
    refetch: refetchNakaBalanceWallet,
    isFetching: isFetchingNakaBalanceWallet,
    isLoading: isLoadingNakaBalanceWallet,
    isError: isErrorNakaBalanceWallet
  } = useQuery({
    queryKey: ["getNakaBalanceWallet", _address],
    queryFn: () => getNakaBalanceWallet(_address || ""),
    enabled: _address !== "" && isConnectedWallet,
    staleTime: Infinity
  })

  const {
    data: balanceVaultBSC,
    refetch: refetchBalanceVaultBSC,
    isFetching: isFetchingBalanceVaultBSC,
    isLoading: isLoadingBalanceVaultBSC,
    isError: isErrorBalanceVaultBSC
  } = useQuery({
    queryKey: ["getBalanceVaultBSC", _address, _tokenAddress],
    queryFn: () => getBalanceVaultBSC(_address || "", _tokenAddress || ""),
    enabled:
      _address !== undefined ||
      _address !== "" ||
      _tokenAddress !== "" ||
      _tokenAddress !== undefined ||
      isConnectedWallet,
    staleTime: Infinity
  })

  const {
    data: balanceWalletBSC,
    refetch: refetchBalanceWalletBSC,
    isFetching: isFetchingBalanceWalletBSC,
    isLoading: isLoadingBalanceWalletBSC,
    isError: isErrorBalanceWalletBSC
  } = useQuery({
    queryKey: ["getBalanceWalletBSC", _address],
    queryFn: () => getBalanceWalletBSC(_address || ""),
    enabled:
      _address !== undefined &&
      _tokenAddress !== undefined &&
      isConnectedWallet,
    staleTime: Infinity
  })

  return {
    balanceVaultNaka: nakaBalanceVault as INakaBalance,
    refetchNakaBalanceVault,
    isFetchingNakaBalanceVault,
    isLoadingNakaBalanceVault,
    isErrorNakaBalanceVault,
    balanceWalletNaka: nakaBalanceWallet as INakaBalance,
    refetchNakaBalanceWallet,
    isFetchingNakaBalanceWallet,
    isLoadingNakaBalanceWallet,
    isErrorNakaBalanceWallet,
    balanceVaultBSC,
    refetchBalanceVaultBSC,
    isFetchingBalanceVaultBSC,
    isLoadingBalanceVaultBSC,
    isErrorBalanceVaultBSC,
    balanceWalletBSC,
    refetchBalanceWalletBSC,
    isFetchingBalanceWalletBSC,
    isLoadingBalanceWalletBSC,
    isErrorBalanceWalletBSC
  }
}

export default useQueryBalanceVault
