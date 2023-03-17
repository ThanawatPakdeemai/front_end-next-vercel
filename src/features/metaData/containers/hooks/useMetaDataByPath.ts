import { IPath } from "@feature/metaData/interfaces/ISeoData"
import { useQuery } from "@tanstack/react-query"
import { getSeoByPath } from "../services/seoMetaData.service"

const useMetaDataByPath = ({ _path }: IPath) => {
  const {
    data,
    error,
    isLoading,
    isError,
    isPreviousData,
    isFetching,
    refetch
  } = useQuery({
    queryKey: ["useGetDataSeoByPath", { _path }],
    queryFn: () => getSeoByPath(_path),
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

export default useMetaDataByPath
