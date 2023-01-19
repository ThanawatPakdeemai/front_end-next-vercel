import { useMutation } from "@tanstack/react-query"
import { getStatisticsGameById } from "../services/game.service"

const useGetStatisticsGameById = () => {
  const {
    data: statsGameById,
    error,
    isLoading,
    isError,
    mutate: fetchStatsGameById
  } = useMutation((_gameId: string) => getStatisticsGameById(_gameId), {
    retry: false
  })

  return {
    statsGameById:
      statsGameById && statsGameById.data ? statsGameById : undefined,
    isLoading,
    isError,
    error,
    fetchStatsGameById
  }
}

export default useGetStatisticsGameById
