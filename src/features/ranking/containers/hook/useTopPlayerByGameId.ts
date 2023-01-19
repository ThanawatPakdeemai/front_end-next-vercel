import { useMutation } from "@tanstack/react-query"
import { getPlayerRankByGameId } from "../services/ranking.service"

const useTopPlayerByGameId = () => {
  const {
    data: topPlayerGameId,
    error,
    isLoading,
    isError,
    mutate: fetchTopPlayersByGameId
  } = useMutation((_gameId: string) => getPlayerRankByGameId(_gameId), {
    retry: false
  })

  return {
    topPlayerGameId:
      topPlayerGameId && topPlayerGameId.length > 0
        ? topPlayerGameId
        : undefined,
    isLoading,
    isError,
    error,
    fetchTopPlayersByGameId
  }
}

export default useTopPlayerByGameId
