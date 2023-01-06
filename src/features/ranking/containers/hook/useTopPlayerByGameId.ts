import { useQuery } from "@tanstack/react-query"
import { getPlayerRankByGameId } from "../services/ranking.service"

const useTopPlayerByGameId = (_gameId: string) => {
  const {
    data: topPlayerGameId,
    error,
    isLoading,
    isError,
    isStale,
    refetch
  } = useQuery(
    ["getTopPlayersByGameId"],
    () => getPlayerRankByGameId(_gameId),
    {
      /* prevent hook state problem */
      staleTime: Infinity,
      retry: false
    }
  )

  if (isStale) {
    refetch()
  }

  return {
    topPlayerGameId:
      topPlayerGameId && topPlayerGameId.length > 0
        ? topPlayerGameId
        : undefined,
    isLoading,
    isError,
    error
  }
}

export default useTopPlayerByGameId
