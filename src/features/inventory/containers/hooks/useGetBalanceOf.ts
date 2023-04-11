import { useQuery } from "@tanstack/react-query"
import { IGetBalanceOf } from "@feature/inventory/interfaces/IInventoryService"
import { getBalanceOf } from "../services/inventory.service"

const useGetBalanceOf = ({ _address, _item_id }: IGetBalanceOf) => {
  const {
    data: balanceofItem,
    isLoading,
    isFetching,
    isPreviousData,
    isError,
    error,
    refetch
  } = useQuery({
    queryKey: ["getBalanceOf", _address, _item_id],
    queryFn: () => getBalanceOf({ _address, _item_id }),
    keepPreviousData: true,
    staleTime: Infinity,
    enabled: !!_address && !!_item_id
  })

  return {
    balanceofItem,
    isLoading,
    isFetching,
    isPreviousData,
    isError,
    error,
    refetch
  }
}

export default useGetBalanceOf
