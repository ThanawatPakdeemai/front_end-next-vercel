import { useQuery } from "@tanstack/react-query"
import { getAllGames } from "../services/game.service"

const useGetAllGames = () => {
  const {
    data: allGameData,
    isLoading,
    isFetching,
    isError,
    error
  } = useQuery({
    queryKey: ["getAllGames"],
    queryFn: getAllGames,
    staleTime: Infinity,
    retry: false
  })

  return {
    allGameData,
    isLoading,
    isFetching,
    isError,
    error
  }
}

export default useGetAllGames
