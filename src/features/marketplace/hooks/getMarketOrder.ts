import { useMutation } from "@tanstack/react-query"
import { getMarketOrder } from "../containers/services/marketplace.service"

const useGetMarketOrder = () => {
  const {
    data: listData,
    mutateAsync: getMarketOrderAsnyc,
    isLoading
  } = useMutation(getMarketOrder, {
    mutationKey: ["getMarketOrder"],
    retry: false
  })

  return {
    listData,
    getMarketOrderAsnyc,
    isLoading
  }
}

export default useGetMarketOrder
