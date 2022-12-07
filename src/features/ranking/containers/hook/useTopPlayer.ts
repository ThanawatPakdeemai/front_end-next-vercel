import { IPlayerRanking } from "@feature/ranking/interfaces/IRanking"
import { useQuery } from "@tanstack/react-query"
import { getPlayersRanking } from "../services/ranking.service"

export const useTopPlayer = () => {
  const { data, status, isLoading, isSuccess } = useQuery({
    queryKey: ["topPlayer"],
    queryFn: () => getPlayersRanking("game/ranks-all").then((res) => res)
  })
  let topPlayerAllGame: IPlayerRanking[] = []
  if (isSuccess && status && !isLoading) {
    topPlayerAllGame = data
  }

  return { topPlayerAllGame }
}
