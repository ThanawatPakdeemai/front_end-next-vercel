import { useQuery } from "@tanstack/react-query"
import { getAllLand } from "../services/land.service"

const useGetAllLand = () => {
  const {
    data: allLand,
    error,
    isLoading,
    isError,
    isSuccess
  } = useQuery({
    queryKey: ["getAllLand"],
    queryFn: getAllLand,
    retry: false,
    staleTime: Infinity
  })
  return {
    allLand: allLand?.data || undefined,
    error,
    isLoading,
    isError,
    isSuccess
  }
}

export default useGetAllLand
