import { IGetTransWallet } from "@feature/transaction/interfaces/ITransaction"
import { useQuery } from "@tanstack/react-query"
import { getTransWallet } from "../services/transaction.service"

const useGetTransWallet = ({
  _playerId,
  _type,
  _limit,
  _page,
  _sort
}: IGetTransWallet) => {
  const {
    data,
    error,
    isLoading,
    isPreviousData,
    isError,
    isFetching,
    refetch
  } = useQuery({
    queryKey: ["getTransWallet", { _playerId, _type, _limit, _page, _sort }],
    queryFn: () => getTransWallet({ _playerId, _type, _limit, _page, _sort }),
    keepPreviousData: true,
    staleTime: Infinity,
    enabled: _playerId !== "" || _playerId !== undefined
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

export default useGetTransWallet
