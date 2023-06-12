import { IPayloadGameFilter } from "@feature/game/interfaces/IGameService"
import { IInfo } from "@interfaces/IHelper"
import { useQuery } from "@tanstack/react-query"
import { getFavoriteGameByUser } from "../services/favourite.service"

interface IGameFavoriteBody extends IPayloadGameFilter {
  playerId: string
}
const useFavoriteGame = ({ playerId = "", ...props }: IGameFavoriteBody) => {
  const {
    data: gameFavourite,
    isError: isErrorGameFavourite,
    isLoading: isLoadingGameFavourite,
    error: errorGameFavourite,
    refetch: refetchGameFavourite
  } = useQuery({
    queryKey: ["getFavoriteGameByUser", props],
    queryFn: () => getFavoriteGameByUser(props),
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
