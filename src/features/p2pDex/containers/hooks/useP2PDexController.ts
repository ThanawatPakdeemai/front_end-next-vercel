import { getP2PDexOrderList } from "@feature/multichain/containers/services/multichain.service"
import {
  IGetP2PDexOrderList,
  IMultiOrderListServ
} from "@feature/multichain/interfaces/IMultichain"
import { useQuery } from "@tanstack/react-query"

const useP2PDexController = ({ _type, _limit, _page }: IGetP2PDexOrderList) => {
  const {
    data,
    error,
    isLoading,
    isError,
    isPreviousData,
    isFetching,
    refetch
  } = useQuery<IMultiOrderListServ>({
    queryKey: ["getP2PDexOrderList", _type, _limit, _page],
    queryFn: () => getP2PDexOrderList({ _type, _limit, _page }),
    staleTime: Infinity,
    keepPreviousData: true,
    enabled: _type !== "" || _page < 1 || _limit < 1
  })

  return {
    data,
    error,
    isLoading,
    isError,
    isPreviousData,
    isFetching,
    refetch
  }
}

export default useP2PDexController
