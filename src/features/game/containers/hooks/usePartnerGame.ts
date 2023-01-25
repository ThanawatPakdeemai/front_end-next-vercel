import { getAllPartnerGames } from "@feature/game/containers/services/game.service"
import { useQuery } from "@tanstack/react-query"
// eslint-disable-next-line prettier/prettier
import { IGetPartnerGameService } from "@feature/game/interfaces/IPartnerGame"

const usePartnerGame = ({ _limit, _page, _search }: IGetPartnerGameService) => {
  const { data, isLoading, isFetching, isPreviousData, isError, error } =
    useQuery({
      queryKey: ["partner-games", _search, _page, _limit],
      queryFn: () =>
        getAllPartnerGames({
          _limit,
          _page,
          _search
        }),
      keepPreviousData: true,
      staleTime: Infinity
    })
  return { data, isLoading, isFetching, isPreviousData, isError, error }
}

export default usePartnerGame
