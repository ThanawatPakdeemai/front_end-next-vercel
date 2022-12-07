import { IPlayerRanking } from "@feature/ranking/interfaces/IRanking"
import { useQuery } from "@tanstack/react-query"
import { getPlayersRanking } from "../services/ranking.service"

export const useTopPlayer = () => {
  const { data: topPlayerAllGame } = useQuery<IPlayerRanking[]>({
    queryKey: ["topPlayer"],
    queryFn: () => getPlayersRanking("game/ranks-all").then((res) => res)
  })

  return { topPlayerAllGame }
}
