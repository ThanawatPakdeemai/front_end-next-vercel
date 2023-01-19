import { getGameByTypes } from "@feature/game/containers/services/game.service"
import { useQuery } from "@tanstack/react-query"

interface IProps {
  _type:
    | "play-to-earn"
    | "free-to-play"
    | "story-mode"
    | "must-try"
    | "hot-game"
  _limit: number
  _page: number
}

const useGamesByTypes = ({ _type, _limit, _page }: IProps) => {
  const { data, isLoading, isFetching, isPreviousData, isError, error } =
    useQuery({
      queryKey: ["getGameByTypes", _type, _page],
      queryFn: () => getGameByTypes({ _type, _limit, _page }),
      keepPreviousData: true,
      staleTime: Infinity,
      enabled: _type !== "hot-game" && _type !== "must-try"
    })

  return { data, isLoading, isFetching, isPreviousData, isError, error }
}

export default useGamesByTypes
