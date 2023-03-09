import { getP2PDexOrderByAddr } from "@feature/multichain/containers/services/multichain.service"
import {
  IGetP2PDexOrderByAddr,
  IMultiOrderListDataServ
} from "@feature/multichain/interfaces/IMultichain"
import { useQuery } from "@tanstack/react-query"

const useP2PDexMyOrder = ({
  _type,
  _address,
  _page,
  _limit,
  _sort,
  _sort_value
}: IGetP2PDexOrderByAddr) => {
  const {
    data,
    error,
    isLoading,
    isError,
    isPreviousData,
    isFetching,
    refetch
  } = useQuery<IMultiOrderListDataServ>({
    queryKey: [
      "getP2PDexOrderByAddress",
      _type,
      _address,
      _page,
      _limit,
      _sort,
      _sort_value
    ],
    queryFn: () =>
      getP2PDexOrderByAddr({
        _type,
        _address,
        _page,
        _limit,
        _sort,
        _sort_value
      }),
    staleTime: Infinity,
    keepPreviousData: true,
    enabled: !!_address || !!_type
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

export default useP2PDexMyOrder
