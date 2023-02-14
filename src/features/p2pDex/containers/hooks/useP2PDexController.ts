import { getP2PDexOrderList } from "@feature/multichain/containers/services/multichain.service"
import {
  IGetP2PDexOrderList,
  IMultiOrderListServ
} from "@feature/multichain/interfaces/IMultichain"
import { useQuery } from "@tanstack/react-query"

const useP2PDexController = ({ _type, _limit, _page }: IGetP2PDexOrderList) => {
  const {
    data: P2PDexOrderList,
    error,
    isLoading,
    isError
  } = useQuery<IMultiOrderListServ>({
    queryKey: ["getP2PDexOrderList"],
    queryFn: () => getP2PDexOrderList({ _type, _limit, _page }),
    staleTime: Infinity
  })

  return {
    P2PDexOrderList,
    error,
    isLoading,
    isError
  }
}

export default useP2PDexController
