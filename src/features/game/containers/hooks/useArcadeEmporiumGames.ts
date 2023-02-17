import useGlobal from "@hooks/useGlobal"
import { useQuery } from "@tanstack/react-query"
import { getGamesByKey } from "../services/game.service"

const useArcadeEmporiumGames = () => {
  const { defaultBody } = useGlobal()
  /**
   * @description Filter games by category id
   */
  const {
    data: getGamesFilterByNftgame,
    error: errorGamesFilterByNftgame,
    isLoading: isLoadingGamesFilterByNftgame,
    isPreviousData: isPreviousGamesFilterByNftgame,
    isError: isErrorGamesFilterByNftgame,
    isFetching: isFetchingGamesFilterByNftgame
  } = useQuery({
    queryKey: ["getGamesByKey", defaultBody],
    queryFn: () =>
      getGamesByKey({
        ...defaultBody,
        game_type: "play-to-earn-games",
        nftgame: true
      }),
    keepPreviousData: true,
    staleTime: Infinity
  })

  return {
    getGamesFilterByNftgame,
    errorGamesFilterByNftgame,
    isLoadingGamesFilterByNftgame,
    isPreviousGamesFilterByNftgame,
    isErrorGamesFilterByNftgame,
    isFetchingGamesFilterByNftgame
  }
}

export default useArcadeEmporiumGames
