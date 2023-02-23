// import CONFIGS from "@configs/index"
import { useQuery } from "@tanstack/react-query"
import {
  // currencyBSC,
  // currencyBSCTestnet,
  // currencyPolygon,
  // currencyPolygonTestnet,
  trickerPriceBNBExternal
} from "../services/currency.services"

const useCurrencyCheck = () => {
  /* const {
    data: dataCurrencyBSC,
    isFetching: isFetchingCurrencyBSC,
    isLoading: isLoadingCurrencyBSC,
    isError: isErrorCurrencyBSC,
    error: errorCurrencyBSC
  } = useQuery({
    queryKey: ["currencyBSC"],
    queryFn: () => currencyBSC(),
    keepPreviousData: true,
    staleTime: Infinity
  })

  const {
    data: dataCurrencyBSCTestnet,
    isFetching: isFetchingCurrencyBSCTestnet,
    isLoading: isLoadingCurrencyBSCTestnet,
    isError: isErrorCurrencyBSCTestnet,
    error: errorCurrencyBSCTestnet
  } = useQuery({
    queryKey: ["currencyBSCTestnet"],
    queryFn: () => currencyBSCTestnet(),
    keepPreviousData: true,
    staleTime: Infinity
  })

  const {
    data: dataCurrencyPolygon,
    isFetching: isFetchingCurrencyPolygon,
    isLoading: isLoadingCurrencyPolygon,
    isError: isErrorCurrencyPolygon,
    error: errorCurrencyPolygon
  } = useQuery({
    queryKey: ["currencyPolygon"],
    queryFn: () => currencyPolygon(),
    keepPreviousData: true,
    staleTime: Infinity
  })

  const {
    data: dataCurrencyPolygonTestnet,
    isFetching: isFetchingCurrencyPolygonTestnet,
    isLoading: isLoadingCurrencyPolygonTestnet,
    isError: isErrorCurrencyPolygonTestnet,
    error: errorCurrencyPolygonTestnet
  } = useQuery({
    queryKey: ["currencyPolygonTestnet"],
    queryFn: () => currencyPolygonTestnet(),
    keepPreviousData: true,
    staleTime: Infinity
  }) */

  const {
    data: dataBNBPrice,
    isFetching: isFetchingBNBPrice,
    isLoading: isLoadingBNBPrice,
    isError: isErrorBNBPrice
  } = useQuery({
    queryKey: ["trickerPriceBNB"],
    queryFn: () => trickerPriceBNBExternal(),
    keepPreviousData: true,
    staleTime: Infinity
  })

  return {
    // dataCurrencyBSC,
    // isFetchingCurrencyBSC,
    // isLoadingCurrencyBSC,
    // isErrorCurrencyBSC,
    // errorCurrencyBSC,
    // dataCurrencyBSCTestnet,
    // isFetchingCurrencyBSCTestnet,
    // isLoadingCurrencyBSCTestnet,
    // isErrorCurrencyBSCTestnet,
    // errorCurrencyBSCTestnet,
    // dataCurrencyPolygon,
    // isFetchingCurrencyPolygon,
    // isLoadingCurrencyPolygon,
    // isErrorCurrencyPolygon,
    // errorCurrencyPolygon,
    // dataCurrencyPolygonTestnet,
    // isFetchingCurrencyPolygonTestnet,
    // isLoadingCurrencyPolygonTestnet,
    // isErrorCurrencyPolygonTestnet,
    // errorCurrencyPolygonTestnet,
    dataBNBPrice,
    isFetchingBNBPrice,
    isLoadingBNBPrice,
    isErrorBNBPrice
  }
}

export default useCurrencyCheck
