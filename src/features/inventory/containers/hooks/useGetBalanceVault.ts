import { useQuery } from "@tanstack/react-query"
import { getNaka } from "../services/inventory.service"

const useGetBalanceVault = (_address: string, isConnected: boolean) => {
  const {
    data: balanceVaultNaka,
    isLoading,
    isFetching,
    isPreviousData,
    isError,
    error,
    refetch: refetchBalanceVaultNaka
  } = useQuery({
    queryKey: ["useGetBalanceVault", _address],
    queryFn: () => getNaka(_address),
    keepPreviousData: true,
    staleTime: Infinity,
    enabled: _address !== "" && _address !== undefined && isConnected
  })

  return {
    balanceVaultNaka,
    isLoading,
    isFetching,
    isPreviousData,
    isError,
    error,
    refetchBalanceVaultNaka
  }
}

export default useGetBalanceVault
