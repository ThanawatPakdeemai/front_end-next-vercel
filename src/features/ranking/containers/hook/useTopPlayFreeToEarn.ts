import { getPlayersPlayToEarnRanking } from "@feature/ranking/containers/services/ranking.service"
import { IRanking } from "@feature/ranking/interfaces/IRanking"
import { useQuery } from "@tanstack/react-query"

const useTopPlayFreeToEarn = (_gameId: string, _total: number) => {
  const body = {
    _game_id: _gameId,
    _top_total: _total
  } as IRanking
  const {
    data: topPlayerFreeToEarnData,
    isLoading: isLoadingTopPlayerFreeToEarn,
    isFetching: isFetchingTopPlayerFreeToEarn,
    isPreviousData: isPreviousDataTopPlayerFreeToEarn,
    isError: isErrorTopPlayerFreeToEarn,
    error: errorTopPlayerFreeToEarn
  } = useQuery({
    queryKey: ["getPlayersPlayToEarnRanking"],
    queryFn: () => getPlayersPlayToEarnRanking(body),
    keepPreviousData: true,
    staleTime: Infinity,
    retry: 3
  })
  return {
    topPlayerFreeToEarnData: topPlayerFreeToEarnData?.data,
    isLoadingTopPlayerFreeToEarn,
    isFetchingTopPlayerFreeToEarn,
    isPreviousDataTopPlayerFreeToEarn,
    isErrorTopPlayerFreeToEarn,
    errorTopPlayerFreeToEarn
  }
}

export default useTopPlayFreeToEarn
