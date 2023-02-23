import { useQuery } from "@tanstack/react-query"
import { IGetGameItemsByGameId } from "@feature/gameItem/interfaces/IGameItemService"
import { getGameItemsByGameId } from "../services/gameItem.service"

const useGamesByGameId = ({ _playerId, _gameId }: IGetGameItemsByGameId) => {
  const {
    data: gameItemList,
    isLoading,
    isFetching,
    isPreviousData,
    isError,
    error,
    refetch
  } = useQuery({
    queryKey: ["getGameItemsByGameId", _playerId, _gameId],
    queryFn: () => getGameItemsByGameId({ _playerId, _gameId }),
    keepPreviousData: true,
    staleTime: Infinity,
    enabled:
      _playerId !== "" &&
      _playerId !== undefined &&
      _gameId !== "" &&
      _gameId !== undefined
  })

  return {
    gameItemList,
    isLoading,
    isFetching,
    isPreviousData,
    isError,
    error,
    refetch
  }
}

export default useGamesByGameId
