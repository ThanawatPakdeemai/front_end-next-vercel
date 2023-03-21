import useGlobal from "@hooks/useGlobal"
import { useQuery } from "@tanstack/react-query"
import useFilterStore from "@stores/blogFilter"
import { getGamesByKey } from "../services/game.service"

const useArcadeEmporiumGames = () => {
  const {
    category: categoryDropdown,
    gameItem: gameItemDropdown,
    device: deviceDropdown,
    search: searchDropdown
  } = useFilterStore()

  const _limit = 20
  const _skip = 1
  const _sort = "_id"
  const _search = searchDropdown
  const _item = gameItemDropdown
  const _device = deviceDropdown
  const _gameType = "play-to-earn-games"
  const _tournament = false
  const _category = categoryDropdown
  const _nftgame = false
  const { defaultBody } = useGlobal(
    _limit,
    _skip,
    _sort,
    _search,
    _item,
    _device,
    _gameType,
    _tournament,
    _category,
    _nftgame
  )

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
