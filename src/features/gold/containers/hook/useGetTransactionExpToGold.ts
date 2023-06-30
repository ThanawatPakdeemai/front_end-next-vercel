import { useQuery } from "@tanstack/react-query"
import useProfileStore from "@stores/profileStore"
import { getTransactionTransferGold } from "../services/golds.service"

const useGetTransactionExpToGold = ({ _limit, _skip, _sort, _search }) => {
  const profile = useProfileStore((state) => state.profile.data)
  const {
    data,
    isLoading,
    isFetching,
    isPreviousData,
    isError,
    error,
    refetch
  } = useQuery({
    queryKey: ["getTransactionTransferGold"],
    queryFn: () =>
      getTransactionTransferGold({ _limit, _skip, _sort, _search }),
    keepPreviousData: true,
    staleTime: Infinity,
    enabled: profile === undefined
  })
  return {
    data,
    isLoading,
    isFetching,
    isPreviousData,
    isError,
    error,
    refetch
  }
}

export default useGetTransactionExpToGold
