// import CONFIGS from "@configs/index"
import { useQuery } from "@tanstack/react-query"
import { trickerPriceBNBExternal } from "../services/currency.services"

const useCurrencyCheck = (_symbol: string) => {
  const {
    data: dataBNBPrice,
    isFetching: isFetchingBNBPrice,
    isLoading: isLoadingBNBPrice,
    isError: isErrorBNBPrice
  } = useQuery({
    queryKey: ["trickerPriceBNB"],
    queryFn: () => trickerPriceBNBExternal(_symbol),
    keepPreviousData: true,
    staleTime: Infinity,
    enabled: !!_symbol
  })

  return {
    dataBNBPrice,
    isFetchingBNBPrice,
    isLoadingBNBPrice,
    isErrorBNBPrice
  }
}

export default useCurrencyCheck
