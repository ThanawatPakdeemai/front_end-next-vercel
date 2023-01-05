import { getGameByTypes } from "@feature/game/containers/services/game.service"
import { useQuery } from "@tanstack/react-query"

interface IProps {
  _type: "play-to-earn" | "free-to-play" | "story-mode"
  _limit: number
  _page: number
}

const useGames = ({ _type, _limit, _page }: IProps) => {
  const { data, isLoading, isFetching, isPreviousData, isError, error } =
    useQuery({
      queryKey: ["games", _type, _page],
      queryFn: () => getGameByTypes({ _type, _limit, _page }),
      keepPreviousData: true,
      staleTime: 5000
    })

  return { data, isLoading, isFetching, isPreviousData, isError, error }
}

export default useGames
