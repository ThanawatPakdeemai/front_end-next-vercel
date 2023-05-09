import { useQuery } from "@tanstack/react-query"
import useChainSupportStore from "@stores/chainSupport"
import {
  currencyBSC,
  currencyBSCTestnet,
  currencyPolygon,
  currencyPolygonTestnet
} from "../services/checkRPC.services"

const useCurrencyCheck = (_symbol?: string) => {
  const { currentChainSelected } = useChainSupportStore()
  const {
    data: dataCurrentRpcBSC,
    isFetching: isFetchingCurrencyBSC,
    isLoading: isLoadingCurrencyBSC,
    isError: isErrorCurrencyBSC,
    error: errorCurrencyBSC
  } = useQuery({
    queryKey: ["currencyBSC"],
    queryFn: () => currencyBSC(),
    keepPreviousData: true,
    staleTime: Infinity,
    enabled: currentChainSelected === "0x38"
  })

  const {
    data: dataCurrentRpcBSCTestnet,
    isFetching: isFetchingCurrencyBSCTestnet,
    isLoading: isLoadingCurrencyBSCTestnet,
    isError: isErrorCurrencyBSCTestnet,
    error: errorCurrencyBSCTestnet
  } = useQuery({
    queryKey: ["currencyBSCTestnet"],
    queryFn: () => currencyBSCTestnet(),
    keepPreviousData: true,
    staleTime: Infinity,
    enabled: currentChainSelected === "0x61"
  })

  const {
    data: dataCurrentRpcPolygon,
    isFetching: isFetchingCurrencyPolygon,
    isLoading: isLoadingCurrencyPolygon,
    isError: isErrorCurrencyPolygon,
    error: errorCurrencyPolygon
  } = useQuery({
    queryKey: ["currencyPolygon"],
    queryFn: () => currencyPolygon(),
    keepPreviousData: true,
    staleTime: Infinity,
    enabled: currentChainSelected === "0x89"
  })

  const {
    data: dataCurrentRpcPolygonTestnet,
    isFetching: isFetchingCurrencyPolygonTestnet,
    isLoading: isLoadingCurrencyPolygonTestnet,
    isError: isErrorCurrencyPolygonTestnet,
    error: errorCurrencyPolygonTestnet
  } = useQuery({
    queryKey: ["currencyPolygonTestnet"],
    queryFn: () => currencyPolygonTestnet(),
    keepPreviousData: true,
    staleTime: Infinity,
    enabled: currentChainSelected === "0x13881"
  })

  return {
    dataCurrentRpcBSC,
    isFetchingCurrencyBSC,
    isLoadingCurrencyBSC,
    isErrorCurrencyBSC,
    errorCurrencyBSC,
    dataCurrentRpcBSCTestnet,
    isFetchingCurrencyBSCTestnet,
    isLoadingCurrencyBSCTestnet,
    isErrorCurrencyBSCTestnet,
    errorCurrencyBSCTestnet,
    dataCurrentRpcPolygon,
    isFetchingCurrencyPolygon,
    isLoadingCurrencyPolygon,
    isErrorCurrencyPolygon,
    errorCurrencyPolygon,
    dataCurrentRpcPolygonTestnet,
    isFetchingCurrencyPolygonTestnet,
    isLoadingCurrencyPolygonTestnet,
    isErrorCurrencyPolygonTestnet,
    errorCurrencyPolygonTestnet
  }
}

export default useCurrencyCheck
