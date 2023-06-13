import useGlobal from "@hooks/useGlobal"
import { useQuery } from "@tanstack/react-query"
import useFilterStore from "@stores/blogFilter"
import { getGameAllFilter } from "../services/game.service"

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
  const _gameMode = "play-to-earn"
  const _gameType = "all"
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
    _gameMode,
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
    queryKey: ["getGameAllFilter", defaultBody],
    queryFn: () =>
      getGameAllFilter({
        ...defaultBody,
        game_type: "all",
        game_mode: "play-to-earn",
        nftgame: true
      }),
    keepPreviousData: true,
    staleTime: Infinity,
    retry: 3
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
