import { IPlayerRanking } from "@feature/ranking/interfaces/IRanking"
import { useQuery } from "@tanstack/react-query"
import { getPlayersRanking } from "../services/ranking.service"

const useTopPlayer = () => {
  const {
    data: topPlayerAllGame,
    error,
    isLoading,
    isError
  } = useQuery<IPlayerRanking[]>({
    queryKey: ["topPlayer"],
    queryFn: () => getPlayersRanking("game/ranks-all").then((res) => res)
  })

  return {
    topPlayerAllGame:
      topPlayerAllGame && topPlayerAllGame.length > 0
        ? topPlayerAllGame
        : undefined,
    error,
    isLoading,
    isError
  }
}

export default useTopPlayer
