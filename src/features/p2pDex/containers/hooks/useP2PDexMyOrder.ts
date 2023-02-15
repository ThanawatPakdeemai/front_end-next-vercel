import { getP2PDexOrderByAddr } from "@feature/multichain/containers/services/multichain.service"
import {
  IGetP2PDexOrderByAddr,
  IMultiOrderListDataServ
} from "@feature/multichain/interfaces/IMultichain"
import { useQuery } from "@tanstack/react-query"

const useP2PDexMyOrder = ({
  _address,
  _page,
  _limit
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
    queryKey: ["getP2PDexOrderByAddress", _address, _page, _limit],
    queryFn: () => getP2PDexOrderByAddr({ _address, _page, _limit }),
    staleTime: Infinity,
    keepPreviousData: true,
    enabled: _address !== "" || _address !== undefined
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
