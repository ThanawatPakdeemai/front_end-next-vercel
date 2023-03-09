import { useQuery } from "@tanstack/react-query"
import { getGameByPath } from "../services/game.service"

const useGetGameByPath = (_gamePath: string) => {
  const {
    data: gameDataByPath,
    error,
    isLoading,
    isError
  } = useQuery({
    queryKey: ["getGameByPath", { _gamePath }],
    queryFn: () => getGameByPath(_gamePath),
    retry: false,
    keepPreviousData: true,
    staleTime: Infinity,
    enabled: !!_gamePath
  })

  return {
    gameData: (gameDataByPath && gameDataByPath.data[0]) || undefined,
    error,
    isLoading,
    isError
  }
}

export default useGetGameByPath
