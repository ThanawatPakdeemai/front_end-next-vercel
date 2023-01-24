import { useQuery } from "@tanstack/react-query"
import { getGameById } from "../services/game.service"

const useGetGameById = (_gameId: string) => {
  const {
    data: gameDataById,
    error,
    isLoading,
    isError
  } = useQuery({
    queryKey: ["getGameById", { _gameId }],
    queryFn: () => getGameById(_gameId),
    retry: false,
    enabled: _gameId !== "" || _gameId !== undefined
  })

  return {
    gameDataById: gameDataById || undefined,
    error,
    isLoading,
    isError
  }
}

export default useGetGameById
