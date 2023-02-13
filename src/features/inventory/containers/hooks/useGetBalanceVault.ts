import { useQuery } from "@tanstack/react-query"
import { getNaka } from "../services/inventory.service"

const useGetBalanceVault = (_address: string) => {
  const {
    data: balanceVaultNaka,
    isLoading,
    isFetching,
    isPreviousData,
    isError,
    error
  } = useQuery({
    queryKey: ["useGetBalanceVault", _address],
    queryFn: () => getNaka(_address),
    keepPreviousData: true,
    staleTime: Infinity,
    enabled: _address !== "" && _address !== undefined
  })

  return {
    balanceVaultNaka,
    isLoading,
    isFetching,
    isPreviousData,
    isError,
    error
  }
}

export default useGetBalanceVault