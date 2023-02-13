import { useQuery } from "@tanstack/react-query"
import { getBadgeplayerId } from "../services/badge.service"

const useGetBadge = (_playerId: string) => {
  const {
    data: getBadgeData,
    error,
    isLoading,
    isError,
    isFetching
  } = useQuery({
    queryKey: ["getBadgeData", _playerId],
    queryFn: () => getBadgeplayerId(_playerId),
    staleTime: Infinity,
    enabled: _playerId !== undefined && _playerId !== ""
  })
  return {
    getBadgeData,
    error,
    isLoading,
    isError,
    isFetching
  }
}

export default useGetBadge
