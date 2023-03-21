import { useQuery } from "@tanstack/react-query"
import { IResponseGameUpdatedPlaying } from "@src/types/games"
import { updatePlayCounting } from "../services/game.service"

const useCountPlayGame = (_gameId: string) => {
  const {
    data: gameCountPlayGame,
    error,
    isLoading,
    isError
  } = useQuery({
    queryKey: ["countPlayGame", { _gameId }],
    queryFn: () => updatePlayCounting(_gameId),
    retry: false,
    keepPreviousData: true,
    staleTime: Infinity,
    enabled: !!_gameId
  })

  return {
    gameDataCount: gameCountPlayGame as IResponseGameUpdatedPlaying,
    error,
    isLoading,
    isError
  }
}

export default useCountPlayGame
