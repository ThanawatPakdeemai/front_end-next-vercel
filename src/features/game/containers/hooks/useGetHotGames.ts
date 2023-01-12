import { useQuery } from "@tanstack/react-query"
import { getHotGames } from "../services/game.service"

const useGetHotGames = () => {
  const {
    data: hotGameData,
    isLoading,
    isFetching,
    isError,
    error
  } = useQuery({
    queryKey: ["getHotGames"],
    queryFn: getHotGames,
    staleTime: Infinity,
    retry: false
  })

  return {
    hotGameData,
    isLoading,
    isFetching,
    isError,
    error
  }
}

export default useGetHotGames
