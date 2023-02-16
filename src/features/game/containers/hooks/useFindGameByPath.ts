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
    enabled: _gamePath !== "" || _gamePath !== undefined
  })

  return {
    gameDataByPath: gameDataByPath || undefined,
    error,
    isLoading,
    isError
  }
}

export default useGetGameByPath
