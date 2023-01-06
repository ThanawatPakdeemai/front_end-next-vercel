import { useQuery } from "@tanstack/react-query"
import { getStatisticsGameById } from "../services/game.service"

const useGetStatisticsGameById = (_gameId: string) => {
  const {
    data: statsGameById,
    error,
    isLoading,
    isError,
    isStale,
    refetch
  } = useQuery(
    ["getStatisticsGameById"],
    () => getStatisticsGameById(_gameId),
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
    statsGameById:
      statsGameById && statsGameById.data ? statsGameById : undefined,
    isLoading,
    isError,
    error
  }
}

export default useGetStatisticsGameById
