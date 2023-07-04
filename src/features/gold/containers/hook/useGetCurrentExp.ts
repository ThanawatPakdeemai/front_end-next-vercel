import useProfileStore from "@stores/profileStore"
import { useQuery } from "@tanstack/react-query"
import { getExpCurrent } from "../services/golds.service"

export const useGetCurrentExp = () => {
  const profile = useProfileStore((state) => state.profile.data)
  const {
    data,
    isLoading,
    isFetching,
    isPreviousData,
    isError,
    error,
    refetch
  } = useQuery({
    queryKey: ["getCurrentExp"],
    queryFn: () => getExpCurrent(),
    keepPreviousData: true,
    staleTime: Infinity,
    enabled: profile === undefined
  })

  return {
    data,
    isLoading,
    isFetching,
    isPreviousData,
    isError,
    error,
    refetch
  }
}
