import { useQuery } from "@tanstack/react-query"
import { getTransWallet } from "../containers/services/transaction.service"
import { IGetTransWallet } from "../interfaces/ITransaction"

// interface IProps {
//   _playerId: string
//   _type: null | "DepositNaka" | "WithdrawNaka"
//   _limit: number
//   _page: number
// }

const useGetTransWallet = ({
  _playerId,
  _type,
  _limit,
  _page
}: IGetTransWallet) => {
  const { data, error, isLoading, isPreviousData, isError, isFetching } =
    useQuery({
      queryKey: ["getTransWallet", { _playerId, _type, _limit }],
      queryFn: () => getTransWallet({ _playerId, _type, _limit, _page }),
      keepPreviousData: true,
      staleTime: Infinity
    })

  return { data, isLoading, isFetching, isPreviousData, isError, error }
}

export default useGetTransWallet
