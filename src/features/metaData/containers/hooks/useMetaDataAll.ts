import { useQuery } from "@tanstack/react-query"
import { getSeoAll } from "../services/seoMetaData.service"

const useMetaDataAll = () => {
  const {
    data,
    error,
    isLoading,
    isError,
    isPreviousData,
    isFetching,
    refetch
  } = useQuery({
    queryKey: ["useMetaDataAll"],
    queryFn: () => getSeoAll(),
    keepPreviousData: true,
    staleTime: Infinity,
    cacheTime: 0
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

export default useMetaDataAll
