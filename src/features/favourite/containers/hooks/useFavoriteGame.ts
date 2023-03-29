import { IInfo } from "@interfaces/IHelper"
import { useQuery } from "@tanstack/react-query"
import { getFavoriteGameByUser } from "../services/favourite.service"

interface IGameFavoriteBody {
  playerId: string
  limit?: number
  skip?: number
  sort?: string
  search?: string
  category?: string
  item?: string
  device?: string
  game_type?: string
  tournament?: boolean
  nftgame?: string
  gameId?: string
}
const useFavoriteGame = ({
  limit = 25,
  skip = 1,
  sort = "",
  search = "",
  category = "all",
  item = "all",
  device = "all",
  game_type = "all",
  tournament = false,
  nftgame = "all",
  playerId = ""
}: IGameFavoriteBody) => {
  const {
    data: gameFavourite,
    isError: isErrorGameFavourite,
    isLoading: isLoadingGameFavourite,
    error: errorGameFavourite,
    refetch: refetchGameFavourite
  } = useQuery({
    queryKey: [
      "getFavoriteGameByUser",
      {
        limit,
        skip,
        sort,
        search,
        category,
        item,
        device,
        game_type,
        tournament,
        nftgame
      }
    ],
    queryFn: () =>
      getFavoriteGameByUser(
        limit,
        skip,
        sort,
        search,
        category,
        item,
        device,
        game_type,
        tournament,
        nftgame
      ),
    keepPreviousData: true,
    staleTime: Infinity,
    enabled: !!playerId
  })

  return {
    gameFavourite: gameFavourite?.data || [],
    gameFavouriteInfo: gameFavourite?.info || ({} as IInfo),
    isErrorGameFavourite,
    isLoadingGameFavourite,
    errorGameFavourite,
    refetchGameFavourite
  }
}

export default useFavoriteGame
