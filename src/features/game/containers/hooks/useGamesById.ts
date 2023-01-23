import { getGameById } from "@feature/game/containers/services/game.service"
import { useQuery } from "@tanstack/react-query"

interface IProps {
  _gameId: string
}

const useGamesById = ({ _gameId }: IProps) => {
  const {
    data: dataGame,
    isLoading,
    isFetching,
    isPreviousData,
    isError,
    error
  } = useQuery({
    queryKey: ["getGameById", _gameId],
    queryFn: () => getGameById(_gameId),
    keepPreviousData: true,
    staleTime: Infinity,
    enabled: _gameId !== "" && _gameId !== undefined
  })

  return { dataGame, isLoading, isFetching, isPreviousData, isError, error }
}

export default useGamesById
