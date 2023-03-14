import { useQuery } from "@tanstack/react-query"
import { getCurrentNaka } from "../services/inventory.service"

const useGetCurrentPrice = () => {
  const {
    data: currentPrice,
    isLoading: isLoadingCurrentPrice,
    isFetching: isFetchingCurrentPrice,
    isPreviousData: isPreviousDataCurrentPrice,
    isError: isErrorCurrentPrice,
    error: errorCurrentPrice
  } = useQuery({
    queryKey: ["getCurrentPrice"],
    queryFn: () => getCurrentNaka(),
    keepPreviousData: true,
    staleTime: Infinity
  })

  return {
    currentPrice,
    isLoadingCurrentPrice,
    isFetchingCurrentPrice,
    isPreviousDataCurrentPrice,
    isErrorCurrentPrice,
    errorCurrentPrice
  }
}

export default useGetCurrentPrice
