import { IGetTransWallet } from "@feature/transaction/interfaces/ITransaction"
import { useQuery } from "@tanstack/react-query"
import { getTransWallet } from "../services/transaction.service"

const useGetTransWallet = ({
  _playerId,
  _type,
  _limit,
  _page
}: IGetTransWallet) => {
  const { data, error, isLoading, isPreviousData, isError, isFetching } =
    useQuery({
      queryKey: ["getTransWallet", { _playerId, _type, _page }],
      queryFn: () => getTransWallet({ _playerId, _type, _limit, _page }),
      keepPreviousData: true,
      staleTime: Infinity
    })
  return { data, isLoading, isFetching, isPreviousData, isError, error }
}

export default useGetTransWallet
