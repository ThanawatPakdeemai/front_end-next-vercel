import { useQuery } from "@tanstack/react-query"
import { getPlayToEarnRewardByPlayerId } from "../services/game.service"

const useGetP2ERewardByPlayerId = (_playerId: string) => {
  const {
    data: earnRewardData,
    isError,
    error,
    isFetching,
    isLoading,
    refetch: refetchRewardData
  } = useQuery({
    queryKey: ["getPlayToEarnRewardByPlayerId", _playerId],
    queryFn: () => getPlayToEarnRewardByPlayerId(_playerId),
    staleTime: Infinity,
    enabled: !!_playerId
  })

  return {
    earnRewardData: earnRewardData || undefined,
    isError,
    error,
    isFetching,
    isLoading,
    refetchRewardData
  }
}

export default useGetP2ERewardByPlayerId
